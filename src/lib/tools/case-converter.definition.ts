import type { ToolDefinition } from './types';
import {
  CASE_CONVERTER_DEFAULT_OPTIONS,
  convertCase,
  type CaseConverterOptions,
} from './case-converter';

function asCaseConverterOptions(options: Record<string, unknown>): CaseConverterOptions {
  return {
    caseType: (options.caseType as CaseConverterOptions['caseType']) ?? CASE_CONVERTER_DEFAULT_OPTIONS.caseType,
  };
}

export const caseConverterTool: ToolDefinition = {
  slug: 'case-converter',
  name: 'Case Converter',
  category: 'transformation',
  shortDescription: 'Convert text to UPPERCASE, lowercase, Title Case, and more.',
  description:
    'Transform text between different letter cases instantly. Convert to uppercase, lowercase, title case, sentence case, alternating case, or inverse case. Perfect for formatting text, creating headings, or standardizing content.',
  seoTitle: 'Case Converter — Convert Text Case Online | TextFixer',
  metaDescription:
    'Convert text to uppercase, lowercase, title case, sentence case, and more. Fast, free case converter tool that runs in your browser. No signup required.',
  keywords: [
    'case converter',
    'text case converter',
    'uppercase converter',
    'lowercase converter',
    'title case converter',
    'sentence case converter',
    'change text case',
  ],
  searchIntents: [
    'case converter online',
    'convert to uppercase',
    'convert to lowercase',
    'title case converter',
  ],
  process: (input, options) => convertCase(input, asCaseConverterOptions(options)),
  defaultOptions: { ...CASE_CONVERTER_DEFAULT_OPTIONS },
  options: [
    {
      type: 'select',
      key: 'caseType',
      label: 'Case type',
      description: 'Select the case transformation to apply.',
      defaultValue: 'upper',
      choices: [
        { value: 'upper', label: 'UPPERCASE' },
        { value: 'lower', label: 'lowercase' },
        { value: 'title', label: 'Title Case' },
        { value: 'sentence', label: 'Sentence case' },
        { value: 'alternating', label: 'aLtErNaTiNg CaSe' },
        { value: 'inverse', label: 'iNVERSE cASE' },
      ],
    },
  ],
  relatedTools: ['text-cleaner', 'find-and-replace', 'text-statistics'],
  howToSteps: [
    'Paste or type your text into the input area.',
    'Select the case type you want to convert to.',
    'Press Convert Case (or Ctrl/Cmd + Enter).',
    'Copy or download the converted result.',
  ],
  useCases: [
    'Converting headings to title case for consistency',
    'Standardizing text formatting in documents',
    'Creating uppercase text for emphasis',
    'Fixing text that was typed with caps lock on',
  ],
  examples: [
    {
      title: 'Convert to Title Case',
      input: 'the quick brown fox jumps over the lazy dog',
      output: 'The Quick Brown Fox Jumps Over The Lazy Dog',
      optionsNote: 'Case type: Title Case',
    },
    {
      title: 'Convert to Sentence case',
      input: 'hello world. this is nice. welcome here.',
      output: 'Hello world. This is nice. Welcome here.',
      optionsNote: 'Case type: Sentence case',
    },
  ],
  faq: [
    {
      question: 'What is Title Case?',
      answer:
        'Title Case capitalizes the first letter of each word. It\'s commonly used for headings, titles, and proper formatting of names.',
    },
    {
      question: 'What is Sentence case?',
      answer:
        'Sentence case capitalizes only the first letter of each sentence, similar to standard prose. The rest of the text remains lowercase.',
    },
    {
      question: 'Does case conversion work with Unicode characters?',
      answer:
        'Yes. The case converter uses locale-aware case transformations that work correctly with accented characters, umlauts, and other Unicode letters.',
    },
    {
      question: 'What is aLtErNaTiNg CaSe?',
      answer:
        'Alternating case switches between lowercase and uppercase for each letter. It\'s sometimes used for stylistic or humorous effect.',
    },
  ],
  actionLabel: 'Convert Case',
  supportsDownload: true,
};
