import type { ToolProcessResult } from './types';
import { countCharacters } from '../utilities/text';

export interface CharacterCounterOptions {
  countSpaces: boolean;
  countNewlines: boolean;
}

export const CHARACTER_COUNTER_DEFAULT_OPTIONS: CharacterCounterOptions = {
  countSpaces: true,
  countNewlines: true,
};

/**
 * Count characters with detailed breakdown
 */
// `_options` is reserved for future UI toggles; the core counts do not depend on it.
export function countCharacterStats(input: string, _options: CharacterCounterOptions): ToolProcessResult {
  if (input.length === 0) {
    return {
      output: '',
      message: 'Paste some text to analyze.',
    };
  }

  const total = countCharacters(input);
  const withoutSpaces = input.replace(/\s/g, '').length;
  const spacesOnly = input.replace(/[^\s]/g, '').length;
  const letters = (input.match(/\p{L}/gu) || []).length;
  const digits = (input.match(/\d/g) || []).length;
  const punctuation = (input.match(/[.,;:!?'"(){}[\]\-]/g) || []).length;
  const newlines = (input.match(/\n/g) || []).length;

  const stats = [
    { label: 'Total characters', value: total },
    { label: 'Without spaces', value: withoutSpaces },
    { label: 'Spaces', value: spacesOnly },
    { label: 'Letters', value: letters },
    { label: 'Digits', value: digits },
    { label: 'Punctuation', value: punctuation },
    { label: 'Line breaks', value: newlines },
  ];

  return {
    output: input,
    stats,
  };
}
