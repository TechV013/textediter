import type { ToolProcessResult } from './types';
import { countWords, countCharacters, countLines } from '../utilities/text';

export interface WordCounterOptions {
  countSpaces: boolean;
}

export const WORD_COUNTER_DEFAULT_OPTIONS: WordCounterOptions = {
  countSpaces: true,
};

/**
 * Count words, characters, and lines with detailed statistics
 */
// `_options` is reserved for future UI toggles; the core counts do not depend on it.
export function countWordStats(input: string, _options: WordCounterOptions): ToolProcessResult {
  if (input.length === 0) {
    return {
      output: '',
      message: 'Paste some text to analyze.',
    };
  }

  const words = countWords(input);
  const charsWithSpaces = countCharacters(input);
  const charsWithoutSpaces = input.replace(/\s/g, '').length;
  const lines = countLines(input);

  // Count paragraphs (blocks separated by blank lines)
  const paragraphs = input.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;

  const stats = [
    { label: 'Words', value: words },
    { label: 'Characters (with spaces)', value: charsWithSpaces },
    { label: 'Characters (no spaces)', value: charsWithoutSpaces },
    { label: 'Lines', value: lines },
    { label: 'Paragraphs', value: paragraphs },
  ];

  return {
    output: input,
    stats,
  };
}
