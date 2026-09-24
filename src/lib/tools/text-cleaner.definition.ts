import type { ToolDefinition } from './types';
import {
  TEXT_CLEANER_DEFAULT_OPTIONS,
  cleanText,
  type TextCleanerOptions,
} from './text-cleaner';

function asTextCleanerOptions(options: Record<string, unknown>): TextCleanerOptions {
  return {
    ...TEXT_CLEANER_DEFAULT_OPTIONS,
    ...Object.fromEntries(
      Object.keys(TEXT_CLEANER_DEFAULT_OPTIONS).map((key) => [
        key,
        Boolean(options[key] ?? TEXT_CLEANER_DEFAULT_OPTIONS[key as keyof TextCleanerOptions]),
      ]),
    ),
  } as TextCleanerOptions;
}

export const textCleanerTool: ToolDefinition = {
  slug: 'text-cleaner',
  name: 'Text Cleaner',
  category: 'cleaning',
  shortDescription: 'Clean messy text with one click — spaces, blanks, duplicates, and more.',
  description:
    'Text Cleaner is TextFixer’s flagship utility for turning messy pasted text into something usable. Choose the cleaning steps you need; everything runs locally in your browser.',
  seoTitle: 'Text Cleaner — Clean Messy Text Online (Private, No Login)',
  metaDescription:
    'Clean extra spaces, blank lines, duplicates, punctuation, and more in your browser. Fast, private Text Cleaner — no signup, no upload.',
  keywords: [
    'text cleaner',
    'clean text online',
    'remove extra spaces',
    'remove blank lines',
    'remove duplicate lines',
    'clean messy text',
  ],
  searchIntents: ['text cleaner online', 'clean text online', 'remove spaces and blank lines'],
  process: (input, options) => cleanText(input, asTextCleanerOptions(options)),
  defaultOptions: { ...TEXT_CLEANER_DEFAULT_OPTIONS },
  options: [
    {
      type: 'checkbox',
      key: 'removeExtraSpaces',
      label: 'Remove extra spaces',
      description: 'Collapse repeated spaces and tabs on each line.',
      defaultValue: true,
    },
    {
      type: 'checkbox',
      key: 'removeBlankLines',
      label: 'Remove blank lines',
      defaultValue: true,
    },
    {
      type: 'checkbox',
      key: 'removeDuplicateLines',
      label: 'Remove duplicate lines',
      description: 'Keeps the first occurrence; preserves order.',
      defaultValue: false,
    },
    {
      type: 'checkbox',
      key: 'removeDuplicateWords',
      label: 'Remove duplicate words',
      description: 'Keeps the first occurrence of each word.',
      defaultValue: false,
    },
    {
      type: 'checkbox',
      key: 'trimWhitespace',
      label: 'Trim whitespace',
      description: 'Trim leading and trailing spaces on each line.',
      defaultValue: true,
    },
    {
      type: 'checkbox',
      key: 'removeLineBreaks',
      label: 'Remove line breaks',
      description: 'Join non-empty lines into a single line.',
      defaultValue: false,
    },
    {
      type: 'checkbox',
      key: 'removePunctuation',
      label: 'Remove punctuation',
      defaultValue: false,
    },
    {
      type: 'checkbox',
      key: 'removeSpecialCharacters',
      label: 'Remove special characters',
      description: 'Keep letters, numbers, and whitespace.',
      defaultValue: false,
    },
    {
      type: 'checkbox',
      key: 'ignoreCaseDuplicates',
      label: 'Ignore case for duplicates',
      description: 'Treat “Hello” and “hello” as the same when removing duplicates.',
      defaultValue: false,
    },
  ],
  relatedTools: [
    'remove-extra-spaces',
    'remove-line-breaks',
    'text-to-one-line',
    'case-converter',
  ],
  howToSteps: [
    'Paste or type your text into the input area.',
    'Select the cleaning options you need.',
    'Press Clean text (or Ctrl/Cmd + Enter).',
    'Copy or download the cleaned result.',
  ],
  useCases: [
    'Cleaning text copied from PDFs or emails',
    'Preparing lists before spreadsheets or scripts',
    'Removing accidental duplicate lines from notes',
    'Normalizing whitespace before publishing',
  ],
  examples: [
    {
      title: 'Messy paragraph',
      input: 'Hello,   world!\n\nHello,   world!\n\n  Extra   spaces  ',
      output: 'Hello, world!\nHello, world!\nExtra spaces',
      optionsNote: 'Default options: trim, collapse spaces, remove blank lines.',
    },
  ],
  faq: [
    {
      question: 'Does Text Cleaner upload my text?',
      answer:
        'No. For this tool, cleaning runs entirely in your browser. Your text is not sent to a TextFixer server for processing.',
    },
    {
      question: 'What order are cleaning options applied?',
      answer:
        'Operations run in a fixed order: normalize line endings, trim, remove punctuation/special characters, collapse spaces, remove blank lines, remove duplicate lines, remove duplicate words, then optionally join into one line. That keeps results predictable.',
    },
    {
      question: 'Will duplicate removal change my sorting?',
      answer:
        'No. Duplicate line and word removal preserve the original order and keep the first occurrence.',
    },
    {
      question: 'Can I undo a cleaning step?',
      answer:
        'The original input stays in the input box until you clear it. Adjust options and run again, or use Undo in your browser if you edited the input.',
    },
  ],
  actionLabel: 'Clean text',
  supportsDownload: true,
};
