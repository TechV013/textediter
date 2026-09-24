import type { ToolProcessResult } from '../lib/tools/types';
import { copyText } from '../lib/utilities/clipboard';
import { downloadTextFile } from '../lib/utilities/download';
import { track } from '../lib/analytics/track';

export interface ToolWorkbenchConfig {
  root: HTMLElement;
  slug: string;
  /** Single-input processor. Provide this OR processDual. */
  process?: (input: string, options: Record<string, unknown>) => ToolProcessResult;
  /** Dual-input processor for comparison tools. */
  processDual?: (inputA: string, inputB: string, options: Record<string, unknown>) => ToolProcessResult;
  dual?: boolean;
}

function readOptions(form: HTMLFormElement): Record<string, unknown> {
  const options: Record<string, unknown> = {};
  form.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[data-option]').forEach((el) => {
    const key = el.dataset.option;
    if (!key) return;
    if (el instanceof HTMLInputElement && el.type === 'checkbox') {
      options[key] = el.checked;
    } else {
      options[key] = el.value;
    }
  });
  return options;
}

function setStatus(statusEl: HTMLElement, message: string) {
  statusEl.textContent = message;
}

function renderStats(container: HTMLElement, stats: ToolProcessResult['stats']) {
  container.replaceChildren();
  if (!stats || stats.length === 0) {
    container.hidden = true;
    return;
  }
  container.hidden = false;
  for (const stat of stats) {
    const item = document.createElement('div');
    item.className = 'rounded-xl border border-border bg-surface px-3 py-2';
    const label = document.createElement('p');
    label.className = 'text-xs text-muted';
    label.textContent = stat.label;
    const value = document.createElement('p');
    value.className = 'text-lg font-semibold tabular-nums';
    value.textContent = String(stat.value);
    item.append(label, value);
    container.appendChild(item);
  }
}

export function initToolWorkbench(config: ToolWorkbenchConfig): void {
  const { root, slug, process, processDual, dual } = config;
  const inputEl = root.querySelector<HTMLTextAreaElement>('[data-role="input"]');
  const inputAEl = root.querySelector<HTMLTextAreaElement>('[data-role="input-a"]');
  const inputBEl = root.querySelector<HTMLTextAreaElement>('[data-role="input-b"]');
  const outputEl = root.querySelector<HTMLTextAreaElement>('[data-role="output"]');
  const formEl = root.querySelector<HTMLFormElement>('[data-role="options-form"]');
  const statsEl = root.querySelector<HTMLElement>('[data-role="stats"]');
  const statusEl = root.querySelector<HTMLElement>('[data-role="status"]');
  const errorEl = root.querySelector<HTMLElement>('[data-role="error"]');
  const processBtn = root.querySelector<HTMLButtonElement>('[data-action="process"]');
  const clearBtn = root.querySelector<HTMLButtonElement>('[data-action="clear"]');
  const copyBtn = root.querySelector<HTMLButtonElement>('[data-action="copy"]');
  const downloadBtn = root.querySelector<HTMLButtonElement>('[data-action="download"]');

  if (!outputEl || !formEl || !statsEl || !statusEl || !errorEl || !processBtn) {
    return;
  }

  if (dual && (!inputAEl || !inputBEl || !processDual)) {
    return;
  }
  if (!dual && !inputEl) {
    return;
  }

  const output = outputEl;
  const form = formEl;
  const stats = statsEl;
  const status = statusEl;
  const error = errorEl;
  const supportsDownload = root.dataset.supportsDownload === 'true';

  function setActionsEnabled(enabled: boolean) {
    if (copyBtn) copyBtn.disabled = !enabled;
    if (downloadBtn) downloadBtn.disabled = !enabled;
  }

  function run() {
    error.hidden = true;
    error.textContent = '';
    try {
      const options = readOptions(form);
      let result: ToolProcessResult;
      if (dual && processDual) {
        result = processDual(inputAEl!.value, inputBEl!.value, options);
      } else if (process) {
        result = process(inputEl!.value, options);
      } else {
        return;
      }
      output.value = result.output;
      renderStats(stats, result.stats);
      setActionsEnabled(result.output.length > 0);
      setStatus(status, result.message ?? 'Processing complete.');
      track({ event: 'tool_run', tool: slug });
    } catch {
      error.hidden = false;
      error.textContent = 'Something went wrong while processing. Please try again.';
      setStatus(status, 'Processing failed.');
      track({ event: 'error', tool: slug, meta: { stage: 'process' } });
    }
  }

  processBtn.addEventListener('click', run);

  clearBtn?.addEventListener('click', () => {
    if (dual) {
      if (inputAEl) inputAEl.value = '';
      if (inputBEl) inputBEl.value = '';
    } else {
      if (inputEl) inputEl.value = '';
    }
    output.value = '';
    renderStats(stats, undefined);
    setActionsEnabled(false);
    error.hidden = true;
    setStatus(status, 'Cleared.');
    if (dual) {
      inputAEl?.focus();
    } else {
      inputEl?.focus();
    }
  });

  copyBtn?.addEventListener('click', async () => {
    const result = await copyText(output.value);
    if (result.ok) {
      const original = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      setStatus(status, 'Result copied to clipboard.');
      track({ event: 'copy_result', tool: slug });
      window.setTimeout(() => {
        copyBtn.textContent = original || 'Copy';
      }, 1600);
    } else {
      error.hidden = false;
      error.textContent = result.error ?? 'Copy failed.';
    }
  });

  if (supportsDownload) {
    downloadBtn?.addEventListener('click', () => {
      downloadTextFile(`${slug}-result.txt`, output.value);
      setStatus(status, 'Download started.');
      track({ event: 'download_result', tool: slug });
    });
  }

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      run();
    }
  });

  track({ event: 'tool_view', tool: slug });
}
