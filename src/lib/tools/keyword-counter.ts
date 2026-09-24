import type { ToolProcessResult } from './types';
import { getWordFrequency } from '../utilities/analysis';

export interface KeywordCounterOptions {
  minLength: number;
  topN: number;
}

export const KEYWORD_COUNTER_DEFAULT_OPTIONS: KeywordCounterOptions = {
  minLength: 3,
  topN: 20,
};

/**
 * Count word frequency and show most common words
 */
export function countKeywordFrequency(input: string, options: KeywordCounterOptions): ToolProcessResult {
  if (input.length === 0) {
    return {
      output: '',
      message: 'Paste some text to analyze.',
    };
  }

  const frequency = getWordFrequency(input, options.minLength);
  const topWords = frequency.slice(0, options.topN);

  if (topWords.length === 0) {
    return {
      output: input,
      message: `No words found with at least ${options.minLength} characters.`,
    };
  }

  // Format output as a list
  const output = topWords.map((item, index) => `${index + 1}. ${item.word} — ${item.count}`).join('\n');

  const stats = [
    { label: 'Unique words', value: frequency.length },
    { label: 'Most common word', value: `${topWords[0].word} (${topWords[0].count})` },
    { label: 'Min. word length', value: options.minLength },
  ];

  return {
    output,
    stats,
  };
}
