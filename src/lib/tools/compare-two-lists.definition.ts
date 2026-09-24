import type { ToolDefinition } from './types';
import {
  compareLists,
  COMPARE_TWO_LISTS_DEFAULT_OPTIONS,
  type CompareTwoListsOptions,
} from './compare-two-lists';

function asCompareTwoListsOptions(options: Record<string, unknown>): CompareTwoListsOptions {
  return {
    caseInsensitive: Boolean(
      options.caseInsensitive ?? COMPARE_TWO_LISTS_DEFAULT_OPTIONS.caseInsensitive,
    ),
    trimWhitespace: Boolean(
      options.trimWhitespace ?? COMPARE_TWO_LISTS_DEFAULT_OPTIONS.trimWhitespace,
    ),
  };
}

export const compareTwoListsTool: ToolDefinition = {
  slug: 'compare-two-lists',
  name: 'Compare Two Lists',
  category: 'comparison',
  shortDescription: 'Find what is unique and what overlaps between two lists.',
  description:
    'Paste two line-based lists and instantly see which items appear in only the left list, only the right list, or both. Useful for comparing feature lists, SQL results, inventory items, or any line-delimited data. Everything stays in your browser.',
  seoTitle: 'Compare Two Lists — Find Unique and Shared Items Online | TextFixer',
  metaDescription:
    'Compare two lists and see unique and shared items. Free, private online tool. Works in your browser — no signup needed.',
  keywords: [
    'compare two lists',
    'list comparison',
    'find differences between lists',
    'unique items',
    'set difference',
    'list diff',
  ],
  searchIntents: ['compare two lists', 'list comparison tool', 'find unique items in lists'],
  dualInput: true,
  process: undefined,
  processDual: (inputA: string, inputB: string, options: Record<string, unknown>) =>
    compareLists(inputA, inputB, asCompareTwoListsOptions(options)),
  defaultOptions: { ...COMPARE_TWO_LISTS_DEFAULT_OPTIONS },
  options: [
    {
      type: 'checkbox',
      key: 'caseInsensitive',
      label: 'Case-insensitive comparison',
      description: 'Treat "Apple" and "apple" as the same item.',
      defaultValue: false,
    },
    {
      type: 'checkbox',
      key: 'trimWhitespace',
      label: 'Trim whitespace',
      description: 'Ignore leading/trailing spaces when comparing items.',
      defaultValue: true,
    },
  ],
  relatedTools: ['text-diff', 'sort-text', 'text-cleaner'],
  howToSteps: [
    'Paste the first list into the left field, one item per line.',
    'Paste the second list into the right field, one item per line.',
    'Toggle case-insensitive or whitespace trimming if needed.',
    'Press Compare (or Ctrl/Cmd + Enter) to see the results.',
  ],
  useCases: [
    'Comparing two exported CSV columns',
    'Checking which SQL queries returned different rows',
    'Finding missing items between two inventories',
    'Comparing feature lists or to-do lists',
  ],
  examples: [
    {
      title: 'Find unique and shared items',
      input: 'apple\nbanana\ncherry',
      output: '--- Only in left (1) ---\ncherry\n--- Only in right (1) ---\ndate\n--- In both (2) ---\napple\nbanana',
      optionsNote: 'Right list has: apple, banana, date.',
    },
  ],
  faq: [
    {
      question: 'How are items compared?',
      answer:
        'Each line is treated as one item. Comparison is line-by-line after optional whitespace trimming and case folding. Duplicate lines within one list are shown once.',
    },
    {
      question: 'What if a list has blank lines?',
      answer:
        'Blank and whitespace-only lines are automatically filtered out before comparison.',
    },
  ],
  actionLabel: 'Compare',
  supportsDownload: false,
};
