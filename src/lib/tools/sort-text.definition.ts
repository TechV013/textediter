import type { ToolDefinition } from './types';
import {
  SORT_TEXT_DEFAULT_OPTIONS,
  sortTextLines,
  type SortTextOptions,
} from './sort-text';

function asSortTextOptions(options: Record<string, unknown>): SortTextOptions {
  return {
    sortMode: (options.sortMode as SortTextOptions['sortMode']) ?? SORT_TEXT_DEFAULT_OPTIONS.sortMode,
    ignoreCase: Boolean(options.ignoreCase ?? SORT_TEXT_DEFAULT_OPTIONS.ignoreCase),
    trimWhitespace: Boolean(options.trimWhitespace ?? SORT_TEXT_DEFAULT_OPTIONS.trimWhitespace),
    removeBlankLines: Boolean(options.removeBlankLines ?? SORT_TEXT_DEFAULT_OPTIONS.removeBlankLines),
    removeDuplicates: Boolean(options.removeDuplicates ?? SORT_TEXT_DEFAULT_OPTIONS.removeDuplicates),
  };
}

export const sortTextTool: ToolDefinition = {
  slug: 'sort-text',
  name: 'Sort Text',
  category: 'transformation',
  shortDescription: 'Sort lines alphabetically, numerically, or by length.',
  description:
    'Sort text lines in various ways: alphabetically (A-Z or Z-A), numerically (ascending or descending), or by line length (shortest to longest or vice versa). Perfect for organizing lists, data files, or any line-based content.',
  seoTitle: 'Sort Text Lines Online — Alphabetically, Numerically, by Length | TextFixer',
  metaDescription:
    'Sort text lines alphabetically, numerically, or by length. Fast, private text sorting tool with multiple sort modes. No signup required.',
  keywords: [
    'sort text',
    'sort lines alphabetically',
    'sort text online',
    'alphabetize text',
    'sort list',
    'organize text',
  ],
  searchIntents: ['sort text online', 'alphabetize lines', 'sort list alphabetically'],
  process: (input, options) => sortTextLines(input, asSortTextOptions(options)),
  defaultOptions: { ...SORT_TEXT_DEFAULT_OPTIONS },
  options: [
    {
      type: 'select',
      key: 'sortMode',
      label: 'Sort mode',
      description: 'Choose how to sort the lines.',
      defaultValue: 'alpha-asc',
      choices: [
        { value: 'alpha-asc', label: 'Alphabetically (A → Z)' },
        { value: 'alpha-desc', label: 'Alphabetically (Z → A)' },
        { value: 'numeric-asc', label: 'Numerically (0 → 9)' },
        { value: 'numeric-desc', label: 'Numerically (9 → 0)' },
        { value: 'length-asc', label: 'By length (shortest first)' },
        { value: 'length-desc', label: 'By length (longest first)' },
      ],
    },
    {
      type: 'checkbox',
      key: 'ignoreCase',
      label: 'Ignore case',
      description: 'Sort without considering uppercase/lowercase differences.',
      defaultValue: false,
    },
    {
      type: 'checkbox',
      key: 'trimWhitespace',
      label: 'Trim whitespace',
      description: 'Remove leading and trailing spaces from each line before sorting.',
      defaultValue: false,
    },
    {
      type: 'checkbox',
      key: 'removeBlankLines',
      label: 'Remove blank lines',
      description: 'Exclude empty lines from the result.',
      defaultValue: false,
    },
    {
      type: 'checkbox',
      key: 'removeDuplicates',
      label: 'Remove duplicates',
      description: 'Keep only unique lines after sorting.',
      defaultValue: false,
    },
  ],
  relatedTools: ['text-cleaner', 'compare-lists', 'remove-duplicate-lines'],
  howToSteps: [
    'Paste your text (one item per line) into the input area.',
    'Choose your sort mode (alphabetically, numerically, or by length).',
    'Select any additional options (ignore case, remove duplicates, etc.).',
    'Press Sort Text (or Ctrl/Cmd + Enter).',
    'Copy or download the sorted result.',
  ],
  useCases: [
    'Organizing lists alphabetically',
    'Sorting data files or CSV columns',
    'Arranging names or items in order',
    'Prioritizing by length (e.g., shortest tasks first)',
  ],
  examples: [
    {
      title: 'Sort alphabetically',
      input: 'Zebra\nApple\nBanana\nOrange',
      output: 'Apple\nBanana\nOrange\nZebra',
      optionsNote: 'Sort mode: Alphabetically (A → Z)',
    },
    {
      title: 'Sort numerically',
      input: '100\n5\n42\n7',
      output: '5\n7\n42\n100',
      optionsNote: 'Sort mode: Numerically (0 → 9)',
    },
  ],
  faq: [
    {
      question: 'How does alphabetical sorting work with mixed case?',
      answer:
        'By default, uppercase letters are sorted before lowercase letters. Enable "Ignore case" to sort alphabetically without considering case differences.',
    },
    {
      question: 'How does numeric sorting handle non-numeric lines?',
      answer:
        'Lines that cannot be parsed as numbers are treated as zero (0) during numeric sorting.',
    },
    {
      question: 'Does sorting preserve the original text?',
      answer:
        'The original input remains in the input box. Sorting creates a new sorted version in the output area.',
    },
  ],
  actionLabel: 'Sort Text',
  supportsDownload: true,
};
