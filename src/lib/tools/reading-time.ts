import type { ToolProcessResult } from './types';
import { countWords } from '../utilities/text';
import { calculateReadingTime } from '../utilities/analysis';

export interface ReadingTimeOptions {
  wordsPerMinute: number;
}

export const READING_TIME_DEFAULT_OPTIONS: ReadingTimeOptions = {
  wordsPerMinute: 200,
};

/**
 * Calculate estimated reading time
 */
export function estimateReadingTime(input: string, options: ReadingTimeOptions): ToolProcessResult {
  if (input.length === 0) {
    return {
      output: '',
      message: 'Paste some text to analyze.',
    };
  }

  const words = countWords(input);
  const minutes = calculateReadingTime(words, options.wordsPerMinute);
  const seconds = Math.round((words / options.wordsPerMinute) * 60);

  const stats = [
    { label: 'Words', value: words },
    { label: 'Reading time', value: `${minutes} min` },
    { label: 'Reading time (detailed)', value: `${Math.floor(seconds / 60)} min ${seconds % 60} sec` },
    { label: 'Reading speed', value: `${options.wordsPerMinute} wpm` },
  ];

  return {
    output: input,
    stats,
  };
}
