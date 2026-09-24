import type { ToolDefinition } from './types';
import {
  ADD_PREFIX_SUFFIX_DEFAULT_OPTIONS,
  addPrefixSuffix,
  type AddPrefixSuffixOptions,
} from './add-prefix-suffix';

function asAddPrefixSuffixOptions(options: Record<string, unknown>): AddPrefixSuffixOptions {
  return {
    prefix: String(options.prefix ?? ADD_PREFIX_SUFFIX_DEFAULT_OPTIONS.prefix),
    suffix: String(options.suffix ?? ADD_PREFIX_SUFFIX_DEFAULT_OPTIONS.suffix),
    applyToNonEmptyOnly: Boolean(options.applyToNonEmptyOnly ?? ADD_PREFIX_SUFFIX_DEFAULT_OPTIONS.applyToNonEmptyOnly),
  };
}

export const addPrefixSuffixTool: ToolDefinition = {
  slug: 'add-prefix-suffix',
  name: 'Add Prefix / Suffix',
  category: 'transformation',
  shortDescription: 'Add text before or after each line.',
  description:
    'Add a prefix (text before) or suffix (text after) to every line in your text. Perfect for creating lists, formatting code, or adding consistent labels to multiple lines.',
  seoTitle: 'Add Prefix and Suffix to Text Lines Online | TextFixer',
  metaDescription:
    'Add text before or after each line. Add prefixes, suffixes, or both to format lists, code, or text. Fast, private tool. No signup required.',
  keywords: [
    'add prefix',
    'add suffix',
    'add text to lines',
    'prefix suffix tool',
    'format text lines',
  ],
  searchIntents: ['add prefix to lines', 'add text before each line', 'add suffix online'],
  process: (input, options) => addPrefixSuffix(input, asAddPrefixSuffixOptions(options)),
  defaultOptions: { ...ADD_PREFIX_SUFFIX_DEFAULT_OPTIONS },
  options: [
    {
      type: 'text',
      key: 'prefix',
      label: 'Prefix',
      description: 'Text to add before each line.',
      defaultValue: '',
      placeholder: 'e.g., "- " or "• "',
    },
    {
      type: 'text',
      key: 'suffix',
      label: 'Suffix',
      description: 'Text to add after each line.',
      defaultValue: '',
      placeholder: 'e.g., "," or ";"',
    },
    {
      type: 'checkbox',
      key: 'applyToNonEmptyOnly',
      label: 'Apply to non-empty lines only',
      description: 'Skip blank lines when adding prefix/suffix.',
      defaultValue: true,
    },
  ],
  relatedTools: ['add-line-numbers', 'text-cleaner', 'find-and-replace'],
  howToSteps: [
    'Paste your text into the input area.',
    'Enter a prefix (text to add before each line).',
    'Enter a suffix (text to add after each line).',
    'Choose whether to apply to blank lines.',
    'Press Add Prefix/Suffix (or Ctrl/Cmd + Enter).',
    'Copy or download the result.',
  ],
  useCases: [
    'Creating bullet lists (add "- " or "• " prefix)',
    'Formatting code (add quotes or brackets)',
    'Adding line endings (add "," or ";" suffix)',
    'Creating markdown lists or checklists',
  ],
  examples: [
    {
      title: 'Create a bullet list',
      input: 'Apple\nBanana\nOrange',
      output: '- Apple\n- Banana\n- Orange',
      optionsNote: 'Prefix: "- "',
    },
    {
      title: 'Add quotes',
      input: 'hello\nworld',
      output: '"hello"\n"world"',
      optionsNote: 'Prefix: \'"\', Suffix: \'"\' ',
    },
  ],
  faq: [
    {
      question: 'Can I add both prefix and suffix at the same time?',
      answer:
        'Yes. Simply enter both a prefix and a suffix. Each line will have the prefix added at the beginning and the suffix added at the end.',
    },
    {
      question: 'What happens to blank lines?',
      answer:
        'By default, blank lines are skipped. If you want to add prefix/suffix to blank lines too, uncheck "Apply to non-empty lines only".',
    },
  ],
  actionLabel: 'Add Prefix/Suffix',
  supportsDownload: true,
};
