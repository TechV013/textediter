import type { ToolProcessResult } from './types';
import { sortText, type SortMode } from '../utilities/sort';
import { countLines, trimEachLine, removeBlankLines, deduplicateLines } from '../utilities/text';

export interface SortTextOptions {
  sortMode: SortMode;
  ignoreCase: boolean;
  trimWhitespace: boolean;
  removeBlankLines: boolean;
  removeDuplicates: boolean;
}

export const SORT_TEXT_DEFAULT_OPTIONS: SortTextOptions = {
  sortMode: 'alpha-asc',
  ignoreCase: false,
  trimWhitespace: false,
  removeBlankLines: false,
  removeDuplicates: false,
};

/**
 * Sort text lines with various options
 */
export function sortTextLines(input: string, options: SortTextOptions): ToolProcessResult {
  if (input.length === 0) {
    return {
      output: '',
      message: 'Paste some text to sort.',
    };
  }

  let text = input;

  // Apply preprocessing options
  if (options.trimWhitespace) {
    text = trimEachLine(text);
  }

  if (options.removeBlankLines) {
    text = removeBlankLines(text);
  }

  // Sort the text
  text = sortText(text, {
    mode: options.sortMode,
    ignoreCase: options.ignoreCase,
  });

  // Remove duplicates after sorting (preserves the sort order)
  if (options.removeDuplicates) {
    text = deduplicateLines(text, {
      ignoreCase: options.ignoreCase,
      trimWhitespace: options.trimWhitespace,
      preserveOrder: true,
    });
  }

  const stats = [
    { label: 'Lines', value: countLines(text) },
  ];

  return {
    output: text,
    stats,
  };
}
