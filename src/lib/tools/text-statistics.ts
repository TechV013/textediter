import type { ToolProcessResult } from './types';
import { countWords, countCharacters, countLines } from '../utilities/text';
import {
  countSentences,
  countParagraphs,
  calculateAverageWordLength,
  calculateAverageSentenceLength,
  getLongestWord,
  getLongestSentence,
  calculateReadingTime,
} from '../utilities/analysis';

export interface TextStatisticsOptions {
  showAdvanced: boolean;
}

export const TEXT_STATISTICS_DEFAULT_OPTIONS: TextStatisticsOptions = {
  showAdvanced: true,
};

/**
 * Comprehensive text statistics and analytics.
 * Basic metrics are always shown; advanced metrics (longest sentence,
 * reading time) follow the `showAdvanced` option.
 */
export function analyzeTextStatistics(
  input: string,
  options: TextStatisticsOptions,
): ToolProcessResult {
  if (input.length === 0) {
    return {
      output: '',
      message: 'Paste some text to analyze.',
    };
  }

  const words = countWords(input);
  const characters = countCharacters(input);
  const charsNoSpaces = input.replace(/\s/g, '').length;
  const lines = countLines(input);
  const sentences = countSentences(input);
  const paragraphs = countParagraphs(input);

  const avgWordLength = calculateAverageWordLength(input);
  const avgSentenceLength = calculateAverageSentenceLength(input);
  const longestWord = getLongestWord(input);

  const stats = [
    { label: 'Words', value: words },
    { label: 'Characters', value: characters },
    { label: 'Characters (no spaces)', value: charsNoSpaces },
    { label: 'Sentences', value: sentences },
    { label: 'Paragraphs', value: paragraphs },
    { label: 'Lines', value: lines },
    { label: 'Avg. word length', value: `${avgWordLength.toFixed(1)} chars` },
    { label: 'Avg. sentence length', value: `${avgSentenceLength.toFixed(1)} words` },
    { label: 'Longest word', value: `${longestWord.word} (${longestWord.length})` },
  ];

  if (options.showAdvanced) {
    const longestSentence = getLongestSentence(input);
    const readingTime = calculateReadingTime(words);
    stats.push({ label: 'Longest sentence', value: `${longestSentence.sentence} (${longestSentence.length} chars)` });
    stats.push({ label: 'Estimated reading time', value: `≈ ${readingTime} min` });
  }

  return {
    output: input,
    stats,
  };
}