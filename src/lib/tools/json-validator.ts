import type { ToolProcessResult } from './types';

export function validateJson(input: string): ToolProcessResult {
  if (!input.trim()) {
    return { output: '', message: 'No input provided.' };
  }

  try {
    const parsed = JSON.parse(input);
    const type = Array.isArray(parsed) ? 'Array' : typeof parsed === 'object' ? 'Object' : typeof parsed;

    let keys = 0;
    let maxDepth = 0;

    function countDepth(obj: unknown, currentDepth: number): void {
      if (currentDepth > maxDepth) maxDepth = currentDepth;
      if (Array.isArray(obj)) {
        obj.forEach(item => countDepth(item, currentDepth + 1));
      } else if (obj !== null && typeof obj === 'object') {
        const keysArr = Object.keys(obj as Record<string, unknown>);
        keys += keysArr.length;
        keysArr.forEach(k => countDepth((obj as Record<string, unknown>)[k], currentDepth + 1));
      }
    }

    countDepth(parsed, 0);

    return {
      output: input,
      stats: [
        { label: 'Status', value: 'Valid' },
        { label: 'Type', value: type },
        { label: 'Top-level keys', value: keys },
        { label: 'Max depth', value: maxDepth },
        { label: 'Size', value: input.length + ' chars' },
      ],
      message: 'This is valid JSON.',
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    const posMatch = msg.match(/position\s+(\d+)/i);
    const pos = posMatch ? posMatch[1] : null;

    return {
      output: input,
      stats: [
        { label: 'Status', value: 'Invalid' },
        { label: 'Error', value: msg.split('\n')[0] },
      ],
      message: pos
        ? 'Invalid JSON near position ' + pos + '. Check the character at that location.'
        : 'Invalid JSON. Check the syntax and try again.',
    };
  }
}
