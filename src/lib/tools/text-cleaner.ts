import type { ToolProcessResult, ToolStat } from './types';
import {
  collapseHorizontalWhitespace,
  countCharacters,
  countLines,
  deduplicateLines,
  deduplicateWords,
  normalizeNewlines,
  removeBlankLines,
  removeLineBreaks,
  stripPunctuation,
  stripSpecialCharacters,
  trimEachLine,
} from '../utilities/text';

export interface TextCleanerOptions {
  removeExtraSpaces: boolean;
  removeBlankLines: boolean;
  removeDuplicateLines: boolean;
  removeDuplicateWords: boolean;
  trimWhitespace: boolean;
  removeLineBreaks: boolean;
  removePunctuation: boolean;
  removeSpecialCharacters: boolean;
  ignoreCaseDuplicates: boolean;
}

export const TEXT_CLEANER_DEFAULT_OPTIONS: TextCleanerOptions = {
  removeExtraSpaces: true,
  removeBlankLines: true,
  removeDuplicateLines: false,
  removeDuplicateWords: false,
  trimWhitespace: true,
  removeLineBreaks: false,
  removePunctuation: false,
  removeSpecialCharacters: false,
  ignoreCaseDuplicates: false,
};

function buildStats(original: string, cleaned: string): ToolStat[] {
  const originalChars = countCharacters(original);
  const cleanedChars = countCharacters(cleaned);
  return [
    { label: 'Original characters', value: originalChars },
    { label: 'Cleaned characters', value: cleanedChars },
    { label: 'Characters removed', value: Math.max(0, originalChars - cleanedChars) },
    { label: 'Original lines', value: countLines(original) },
    { label: 'Final lines', value: countLines(cleaned) },
  ];
}

/**
 * Flagship cleaner. Operations run in a fixed, documented order so results are predictable.
 *
 * Order:
 * 1. Normalize CRLF/CR → LF
 * 2. Trim each line (+ trailing file whitespace) when enabled
 * 3. Remove punctuation
 * 4. Remove special characters
 * 5. Collapse extra horizontal spaces/tabs
 * 6. Remove blank lines
 * 7. Remove duplicate lines (optional ignore-case; preserves order; trims keys when trim is on)
 * 8. Remove duplicate words
 * 9. Collapse to one line (remove line breaks)
 */
export function cleanText(input: string, options: TextCleanerOptions): ToolProcessResult {
  if (input.length === 0) {
    return {
      output: '',
      stats: buildStats('', ''),
      message: 'Paste some text to clean.',
    };
  }

  let text = normalizeNewlines(input);

  if (options.trimWhitespace) {
    text = trimEachLine(text).replace(/^\n+|\n+$/g, '');
  }

  if (options.removePunctuation) {
    text = stripPunctuation(text);
  }

  if (options.removeSpecialCharacters) {
    text = stripSpecialCharacters(text);
  }

  if (options.removeExtraSpaces) {
    text = collapseHorizontalWhitespace(text);
    text = text
      .split('\n')
      .map((line) => line.trim())
      .join('\n');
  }

  if (options.removeBlankLines) {
    text = removeBlankLines(text);
  }

  if (options.removeDuplicateLines) {
    text = deduplicateLines(text, {
      ignoreCase: options.ignoreCaseDuplicates,
      trimWhitespace: options.trimWhitespace,
      preserveOrder: true,
    });
  }

  if (options.removeDuplicateWords) {
    text = deduplicateWords(text, {
      ignoreCase: options.ignoreCaseDuplicates,
      preserveOrder: true,
    });
  }

  if (options.removeLineBreaks) {
    text = removeLineBreaks(text, ' ');
    if (options.removeExtraSpaces) {
      text = collapseHorizontalWhitespace(text).trim();
    }
  }

  return {
    output: text,
    stats: buildStats(input, text),
  };
}
