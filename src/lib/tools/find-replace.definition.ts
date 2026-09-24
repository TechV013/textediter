import type { ToolDefinition } from './types';
import {
  FIND_REPLACE_DEFAULT_OPTIONS,
  findReplace,
  type FindReplaceOptions,
} from './find-replace';

function asFindReplaceOptions(options: Record<string, unknown>): FindReplaceOptions {
  return {
    find: String(options.find ?? FIND_REPLACE_DEFAULT_OPTIONS.find),
    replace: String(options.replace ?? FIND_REPLACE_DEFAULT_OPTIONS.replace),
    caseSensitive: Boolean(options.caseSensitive ?? FIND_REPLACE_DEFAULT_OPTIONS.caseSensitive),
    replaceAll: Boolean(options.replaceAll ?? FIND_REPLACE_DEFAULT_OPTIONS.replaceAll),
  };
}

export const findReplaceTool: ToolDefinition = {
  slug: 'find-and-replace',
  name: 'Find and Replace',
  category: 'transformation',
  shortDescription: 'Find and replace text with case-sensitive and replace-all options.',
  description:
    'Search for text and replace it with different text. Perfect for batch editing, correcting repeated mistakes, or updating terminology across your content. All processing happens in your browser.',
  seoTitle: 'Find and Replace Text Online | TextFixer',
  metaDescription:
    'Find and replace text online with case-sensitive search and replace-all options. Fast, private text find and replace tool. No signup required.',
  keywords: [
    'find and replace',
    'find replace online',
    'text replace',
    'batch replace text',
    'search and replace',
  ],
  searchIntents: ['find and replace online', 'replace text online', 'batch find replace'],
  process: (input, options) => findReplace(input, asFindReplaceOptions(options)),
  defaultOptions: { ...FIND_REPLACE_DEFAULT_OPTIONS },
  options: [
    {
      type: 'text',
      key: 'find',
      label: 'Find',
      description: 'Text to search for.',
      defaultValue: '',
      placeholder: 'Enter text to find...',
    },
    {
      type: 'text',
      key: 'replace',
      label: 'Replace with',
      description: 'Text to replace it with.',
      defaultValue: '',
      placeholder: 'Enter replacement text...',
    },
    {
      type: 'checkbox',
      key: 'caseSensitive',
      label: 'Case sensitive',
      description: 'Match case exactly when searching.',
      defaultValue: false,
    },
    {
      type: 'checkbox',
      key: 'replaceAll',
      label: 'Replace all',
      description: 'Replace all occurrences (if unchecked, replaces only the first match).',
      defaultValue: true,
    },
  ],
  relatedTools: ['case-converter', 'text-cleaner', 'text-diff'],
  howToSteps: [
    'Paste your text into the input area.',
    'Enter the text you want to find.',
    'Enter the replacement text.',
    'Choose your options (case sensitive, replace all).',
    'Press Replace Text (or Ctrl/Cmd + Enter).',
    'Copy or download the result.',
  ],
  useCases: [
    'Correcting repeated spelling mistakes',
    'Updating product names or terminology',
    'Removing or replacing unwanted words',
    'Batch editing configuration files or code',
  ],
  examples: [
    {
      title: 'Replace all occurrences',
      input: 'The cat sat on the mat. The cat was happy.',
      output: 'The dog sat on the mat. The dog was happy.',
      optionsNote: 'Find: "cat", Replace: "dog", Replace all: checked',
    },
  ],
  faq: [
    {
      question: 'Does Find and Replace support regular expressions?',
      answer:
        'No. This tool treats your search text as literal text, not as a regular expression pattern. This keeps it simple and prevents unexpected behavior with special characters.',
    },
    {
      question: 'What happens if I leave "Replace with" empty?',
      answer:
        'Leaving the replacement text empty effectively deletes all occurrences of the search text.',
    },
    {
      question: 'Is my text uploaded to a server?',
      answer:
        'No. Find and replace runs entirely in your browser. Your text is not sent to TextFixer servers.',
    },
  ],
  actionLabel: 'Replace Text',
  supportsDownload: true,
};
