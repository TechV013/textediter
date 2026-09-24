import type { ToolProcessResult } from './types';
import { countLines } from '../utilities/text';

export interface FindReplaceOptions {
  find: string;
  replace: string;
  caseSensitive: boolean;
  replaceAll: boolean;
}

export const FIND_REPLACE_DEFAULT_OPTIONS: FindReplaceOptions = {
  find: '',
  replace: '',
  caseSensitive: false,
  replaceAll: true,
};

/**
 * Escape special regex characters in a string to use it as a literal search
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Find and replace text with options for case sensitivity and replace all
 */
export function findReplace(input: string, options: FindReplaceOptions): ToolProcessResult {
  if (input.length === 0) {
    return {
      output: '',
      message: 'Paste some text to process.',
    };
  }

  if (!options.find) {
    return {
      output: input,
      message: 'Enter text to find.',
      stats: [
        { label: 'Matches found', value: 0 },
        { label: 'Replacements made', value: 0 },
      ],
    };
  }

  // Escape the find string to treat it as literal text, not regex
  const escapedFind = escapeRegex(options.find);

  // Build regex with appropriate flags
  const flags = options.caseSensitive ? 'g' : 'gi';
  const regex = new RegExp(escapedFind, options.replaceAll ? flags : flags.replace('g', ''));

  // Count matches before replacement
  const matches = input.match(new RegExp(escapedFind, flags));
  const matchCount = matches ? matches.length : 0;

  // Perform replacement
  let output: string;
  let replacementCount: number;

  if (options.replaceAll) {
    output = input.replace(regex, options.replace);
    replacementCount = matchCount;
  } else {
    // Replace only first occurrence
    output = input.replace(regex, options.replace);
    replacementCount = matchCount > 0 ? 1 : 0;
  }

  const stats = [
    { label: 'Matches found', value: matchCount },
    { label: 'Replacements made', value: replacementCount },
    { label: 'Lines', value: countLines(output) },
  ];

  return {
    output,
    stats,
  };
}
