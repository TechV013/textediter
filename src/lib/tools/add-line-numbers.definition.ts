import type { ToolDefinition } from './types';
import {
  ADD_LINE_NUMBERS_DEFAULT_OPTIONS,
  addLineNumbers,
  type AddLineNumbersOptions,
} from './add-line-numbers';

function asAddLineNumbersOptions(options: Record<string, unknown>): AddLineNumbersOptions {
  return {
    startNumber: Number(options.startNumber ?? ADD_LINE_NUMBERS_DEFAULT_OPTIONS.startNumber),
    padding: Boolean(options.padding ?? ADD_LINE_NUMBERS_DEFAULT_OPTIONS.padding),
    separator: String(options.separator ?? ADD_LINE_NUMBERS_DEFAULT_OPTIONS.separator),
    skipBlankLines: Boolean(options.skipBlankLines ?? ADD_LINE_NUMBERS_DEFAULT_OPTIONS.skipBlankLines),
  };
}

export const addLineNumbersTool: ToolDefinition = {
  slug: 'add-line-numbers',
  name: 'Add Line Numbers',
  category: 'transformation',
  shortDescription: 'Number each line sequentially.',
  description:
    'Automatically number each line in your text. Customize the starting number, padding, separator, and whether to skip blank lines. Perfect for code snippets, instructions, or numbered lists.',
  seoTitle: 'Add Line Numbers to Text Online | TextFixer',
  metaDescription:
    'Number each line in your text automatically. Customize starting number, padding, and format. Perfect for code, lists, and documents. Fast, free tool.',
  keywords: [
    'add line numbers',
    'number lines',
    'line numbering tool',
    'auto number lines',
    'number text lines',
  ],
  searchIntents: ['number lines', 'add line numbers online', 'line numbering'],
  process: (input, options) => addLineNumbers(input, asAddLineNumbersOptions(options)),
  defaultOptions: { ...ADD_LINE_NUMBERS_DEFAULT_OPTIONS },
  options: [
    {
      type: 'text',
      key: 'startNumber',
      label: 'Start Number',
      description: 'The number to start counting from.',
      defaultValue: '1',
      placeholder: '1',
    },
    {
      type: 'text',
      key: 'separator',
      label: 'Separator',
      description: 'Text between the number and the line content.',
      defaultValue: '. ',
      placeholder: '. ',
    },
    {
      type: 'checkbox',
      key: 'padding',
      label: 'Pad numbers with spaces',
      description: 'Align numbers by adding leading spaces (e.g., " 1", " 10", "100").',
      defaultValue: true,
    },
    {
      type: 'checkbox',
      key: 'skipBlankLines',
      label: 'Skip blank lines',
      description: 'Do not number blank lines.',
      defaultValue: false,
    },
  ],
  relatedTools: ['add-prefix-suffix', 'text-cleaner', 'sort-text'],
  howToSteps: [
    'Paste your text into the input area.',
    'Set the starting number (default is 1).',
    'Choose a separator (default is ". ").',
    'Enable padding to align numbers.',
    'Choose whether to skip blank lines.',
    'Press Add Line Numbers (or Ctrl/Cmd + Enter).',
    'Copy or download the numbered text.',
  ],
  useCases: [
    'Numbering code snippets for documentation',
    'Creating numbered lists or instructions',
    'Adding line numbers for reference',
    'Formatting text for presentations',
  ],
  examples: [
    {
      title: 'Basic line numbering',
      input: 'First line\nSecond line\nThird line',
      output: '1. First line\n2. Second line\n3. Third line',
      optionsNote: 'Default options',
    },
    {
      title: 'Start from 10 with custom separator',
      input: 'Hello\nWorld',
      output: '10: Hello\n11: World',
      optionsNote: 'Start: 10, Separator: ": "',
    },
  ],
  faq: [
    {
      question: 'Can I start numbering from a number other than 1?',
      answer:
        'Yes. Set the "Start Number" option to any number you want. The tool will count up from there.',
    },
    {
      question: 'What does padding do?',
      answer:
        'Padding adds leading spaces to align numbers. For example, " 1", " 10", "100" instead of "1", "10", "100". This keeps lines visually aligned.',
    },
    {
      question: 'Can I change the separator between the number and text?',
      answer:
        'Yes. The default separator is ". " but you can change it to anything like ": ", ") ", or just a space.',
    },
  ],
  actionLabel: 'Add Line Numbers',
  supportsDownload: true,
};
