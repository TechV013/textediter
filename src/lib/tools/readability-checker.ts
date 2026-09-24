import type { ToolProcessResult } from './types';
import { countWords } from '../utilities/text';
import {
  calculateFleschReadingEase,
  getReadingLevel,
  countSentences,
} from '../utilities/analysis';

export interface ReadabilityCheckerOptions {
  showDetails: boolean;
}

export const READABILITY_CHECKER_DEFAULT_OPTIONS: ReadabilityCheckerOptions = {
  showDetails: true,
};

/**
 * Check text readability using Flesch Reading Ease score
 */
/**
 * Flesch Reading Ease is unstable below roughly 10 words, so the tool refuses
 * to present a score as reliable for very short inputs.
 */
const MIN_WORDS_FOR_RELIABLE_SCORE = 10;

export function checkReadability(input: string, _options: ReadabilityCheckerOptions): ToolProcessResult {
  if (input.length === 0) {
    return {
      output: '',
      message: 'Paste some text to analyze.',
    };
  }

  const words = countWords(input);
  const sentences = countSentences(input);

  if (words < MIN_WORDS_FOR_RELIABLE_SCORE || sentences === 0) {
    return {
      output: input,
      message:
        'Not enough text to calculate a reliable score. Add more text and at least one complete sentence.',
    };
  }

  const score = calculateFleschReadingEase(input);
  const level = getReadingLevel(score);

  const stats = [
    { label: 'Flesch Reading Ease', value: score },
    { label: 'Reading level', value: level },
    { label: 'Words', value: words },
    { label: 'Sentences', value: sentences },
    { label: 'Avg. sentence length', value: `${(words / sentences).toFixed(1)} words` },
  ];

  return {
    output: input,
    stats,
  };
}
