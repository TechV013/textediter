import type { ToolProcessResult } from './types';
import { splitLines, joinLines, countLines } from '../utilities/text';

export interface AddPrefixSuffixOptions {
  prefix: string;
  suffix: string;
  applyToNonEmptyOnly: boolean;
}

export const ADD_PREFIX_SUFFIX_DEFAULT_OPTIONS: AddPrefixSuffixOptions = {
  prefix: '',
  suffix: '',
  applyToNonEmptyOnly: true,
};

/**
 * Add prefix and/or suffix to each line
 */
export function addPrefixSuffix(input: string, options: AddPrefixSuffixOptions): ToolProcessResult {
  if (input.length === 0) {
    return {
      output: '',
      message: 'Paste some text to process.',
    };
  }

  if (!options.prefix && !options.suffix) {
    return {
      output: input,
      message: 'Enter a prefix or suffix to add.',
    };
  }

  const lines = splitLines(input);
  const processed = lines.map((line) => {
    // Skip empty lines if option is set
    if (options.applyToNonEmptyOnly && line.trim().length === 0) {
      return line;
    }
    return options.prefix + line + options.suffix;
  });

  const output = joinLines(processed);

  const stats = [
    { label: 'Lines processed', value: countLines(output) },
  ];

  return {
    output,
    stats,
  };
}
