import type { ToolProcessResult } from './types';
import { splitLines, countCharacters } from '../utilities/text';

export interface TextToOneLineOptions {
  separator: string;
  trimLines: boolean;
  removeBlankLines: boolean;
}

export const TEXT_TO_ONE_LINE_DEFAULT_OPTIONS: TextToOneLineOptions = {
  separator: ' ',
  trimLines: true,
  removeBlankLines: true,
};

/**
 * Convert multiline text to a single line with custom separator
 */
export function textToOneLine(input: string, options: TextToOneLineOptions): ToolProcessResult {
  if (input.length === 0) {
    return {
      output: '',
      message: 'Paste some text to convert.',
    };
  }

  let lines = splitLines(input);

  // Trim each line if option is set
  if (options.trimLines) {
    lines = lines.map((line) => line.trim());
  }

  // Remove blank lines if option is set
  if (options.removeBlankLines) {
    lines = lines.filter((line) => line.length > 0);
  }

  const output = lines.join(options.separator);

  const stats = [
    { label: 'Lines joined', value: lines.length },
    { label: 'Characters', value: countCharacters(output) },
  ];

  return {
    output,
    stats,
  };
}
