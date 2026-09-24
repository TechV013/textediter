import type { ToolProcessResult } from './types';

export interface JsonFormatterOptions {
  indent: number;
  sortKeys: boolean;
}

export const JSON_FORMATTER_DEFAULT_OPTIONS: JsonFormatterOptions = {
  indent: 2,
  sortKeys: false,
};

function sortObjectKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  }
  if (obj !== null && typeof obj === 'object') {
    const sorted: Record<string, unknown> = {};
    for (const key of Object.keys(obj as Record<string, unknown>).sort()) {
      sorted[key] = sortObjectKeys((obj as Record<string, unknown>)[key]);
    }
    return sorted;
  }
  return obj;
}

export function formatJson(input: string, options: JsonFormatterOptions): ToolProcessResult {
  if (!input.trim()) {
    return { output: '', message: 'No input provided.' };
  }

  try {
    const parsed = JSON.parse(input);
    let formatted: string;

    if (options.sortKeys && typeof parsed === 'object' && parsed !== null) {
      const sorted = sortObjectKeys(parsed);
      formatted = JSON.stringify(sorted, null, options.indent);
    } else {
      formatted = JSON.stringify(parsed, null, options.indent);
    }

    return {
      output: formatted,
      stats: [
        { label: 'Status', value: 'Valid JSON' },
        { label: 'Output size', value: formatted.length + ' chars' },
      ],
      message: 'JSON formatted successfully.',
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Invalid JSON';
    return {
      output: input,
      message: 'Error: ' + msg,
    };
  }
}
