import type { ToolProcessResult } from './types';

export function removeExtraSpaces(input: string): ToolProcessResult {
  if (!input) {
    return { output: '', message: 'No input provided.' };
  }

  // Collapse multiple spaces (tabs, multiple spaces) into single spaces
  // Preserve newlines
  const output = input
    .split('\n')
    .map(line => line.replace(/\t/g, ' ').replace(/ +/g, ' ').trimEnd())
    .join('\n')
    .replace(/^\n+|\n+$/g, '');

  const lines = output.split('\n').filter(l => l.length > 0);

  return {
    output,
    stats: [
      { label: 'Lines processed', value: lines.length },
      { label: 'Characters saved', value: input.length - output.length },
    ],
    message: 'Extra spaces collapsed on each line.',
  };
}
