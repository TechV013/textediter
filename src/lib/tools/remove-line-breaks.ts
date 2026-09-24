import type { ToolProcessResult } from './types';

export function removeLineBreaks(input: string): ToolProcessResult {
  if (!input) {
    return { output: '', message: 'No input provided.' };
  }

  // Join lines with a single space, collapse blank lines
  const output = input
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0)
    .join(' ');

  const inputLines = input.split('\n').length;

  return {
    output,
    stats: [
      { label: 'Input lines', value: inputLines },
      { label: 'Output length', value: output.length },
    ],
    message: 'Line breaks removed. All text joined into one line.',
  };
}
