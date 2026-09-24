import type { ToolProcessResult } from './types';
import {
  toUpperCase,
  toLowerCase,
  toTitleCase,
  toSentenceCase,
  toAlternatingCase,
  toInverseCase,
} from '../utilities/case';
import { countCharacters, countLines } from '../utilities/text';

export type CaseType =
  | 'upper'
  | 'lower'
  | 'title'
  | 'sentence'
  | 'alternating'
  | 'inverse';

export interface CaseConverterOptions {
  caseType: CaseType;
}

export const CASE_CONVERTER_DEFAULT_OPTIONS: CaseConverterOptions = {
  caseType: 'upper',
};

/**
 * Convert text case based on selected type
 */
export function convertCase(input: string, options: CaseConverterOptions): ToolProcessResult {
  if (input.length === 0) {
    return {
      output: '',
      message: 'Paste some text to convert.',
    };
  }

  let output: string;

  switch (options.caseType) {
    case 'upper':
      output = toUpperCase(input);
      break;
    case 'lower':
      output = toLowerCase(input);
      break;
    case 'title':
      output = toTitleCase(input);
      break;
    case 'sentence':
      output = toSentenceCase(input);
      break;
    case 'alternating':
      output = toAlternatingCase(input);
      break;
    case 'inverse':
      output = toInverseCase(input);
      break;
    default:
      output = input;
  }

  const stats = [
    { label: 'Characters', value: countCharacters(output) },
    { label: 'Lines', value: countLines(output) },
  ];

  return {
    output,
    stats,
  };
}
