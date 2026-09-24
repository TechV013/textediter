import type { ToolProcessResult } from './types';
import { countWords } from '../utilities/text';
import { calculateKeywordDensity } from '../utilities/analysis';

export interface KeywordDensityOptions {
  keyword: string;
  caseSensitive: boolean;
}

export const KEYWORD_DENSITY_DEFAULT_OPTIONS: KeywordDensityOptions = {
  keyword: '',
  caseSensitive: false,
};

/**
 * Calculate keyword density percentage.
 * This is a reporting tool only: it states how often a keyword appears.
 * It intentionally gives no "ideal density" advice, because there is no
 * single correct density and such claims encourage keyword stuffing.
 */
export function analyzeKeywordDensity(
  input: string,
  options: KeywordDensityOptions,
): ToolProcessResult {
  if (input.length === 0) {
    return {
      output: '',
      message: 'Paste some text to analyze.',
    };
  }

  if (!options.keyword || options.keyword.trim().length === 0) {
    return {
      output: input,
      message: 'Enter a keyword to analyze.',
    };
  }

  const totalWords = countWords(input);
  const density = calculateKeywordDensity(options.keyword, input, options.caseSensitive);

  const searchKeyword = options.caseSensitive ? options.keyword : options.keyword.toLowerCase();
  const words = input.match(/\b[\p{L}\p{N}]+\b/gu) || [];
  const keywordCount = words.filter((word) =>
    options.caseSensitive ? word === searchKeyword : word.toLowerCase() === searchKeyword,
  ).length;

  const stats = [
    { label: 'Keyword', value: `"${options.keyword}"` },
    { label: 'Occurrences', value: keywordCount },
    { label: 'Total words', value: totalWords },
    { label: 'Density', value: `${density}%` },
  ];

  const message = `Keyword "${options.keyword}" appears ${keywordCount} time${keywordCount === 1 ? '' : 's'} across ${totalWords} word${totalWords === 1 ? '' : 's'} (${density}% density).`;

  return {
    output: input,
    stats,
    message,
  };
}