import type { ToolProcessResult } from './types';
import { splitLines, joinLines, countLines } from '../utilities/text';

export interface AddLineNumbersOptions {
  startNumber: number;
  padding: boolean;
  separator: string;
  skipBlankLines: boolean;
}

export const ADD_LINE_NUMBERS_DEFAULT_OPTIONS: AddLineNumbersOptions = {
  startNumber: 1,
  padding: true,
  separator: '. ',
  skipBlankLines: false,
};

/**
 * Add line numbers to each line
 */
export function addLineNumbers(input: string, options: AddLineNumbersOptions): ToolProcessResult {
  if (input.length === 0) {
    return {
      output: '',
      message: 'Paste some text to number.',
    };
  }

  const lines = splitLines(input);
  let lineNumber = options.startNumber;

  // Calculate padding width based on total lines
  const totalLines = options.skipBlankLines
    ? lines.filter((line) => line.trim().length > 0).length
    : lines.length;
  const maxNumber = options.startNumber + totalLines - 1;
  const paddingWidth = options.padding ? String(maxNumber).length : 0;

  const processed = lines.map((line) => {
    // Skip blank lines if option is set
    if (options.skipBlankLines && line.trim().length === 0) {
      return line;
    }

    const numberStr = options.padding
      ? String(lineNumber).padStart(paddingWidth, ' ')
      : String(lineNumber);

    lineNumber++;
    return numberStr + options.separator + line;
  });

  const output = joinLines(processed);

  const stats = [
    { label: 'Lines numbered', value: lineNumber - options.startNumber },
    { label: 'Total lines', value: countLines(output) },
  ];

  return {
    output,
    stats,
  };
}
