import type { ToolDefinition } from './types';
import {
  TEXT_TO_ONE_LINE_DEFAULT_OPTIONS,
  textToOneLine,
  type TextToOneLineOptions,
} from './text-to-one-line';

function asTextToOneLineOptions(options: Record<string, unknown>): TextToOneLineOptions {
  return {
    separator: String(options.separator ?? TEXT_TO_ONE_LINE_DEFAULT_OPTIONS.separator),
    trimLines: Boolean(options.trimLines ?? TEXT_TO_ONE_LINE_DEFAULT_OPTIONS.trimLines),
    removeBlankLines: Boolean(options.removeBlankLines ?? TEXT_TO_ONE_LINE_DEFAULT_OPTIONS.removeBlankLines),
  };
}

export const textToOneLineTool: ToolDefinition = {
  slug: 'text-to-one-line',
  name: 'Text to One Line',
  category: 'transformation',
  shortDescription: 'Convert multiline text to a single line.',
  description:
    'Join all lines of text into a single line with a custom separator. Perfect for converting lists to comma-separated values, formatting code, or creating single-line strings.',
  seoTitle: 'Convert Multiline Text to One Line | TextFixer',
  metaDescription:
    'Convert multiline text to a single line with custom separators. Join lines with spaces, commas, or any separator. Fast, free online tool.',
  keywords: [
    'text to one line',
    'join lines',
    'multiline to single line',
    'remove line breaks',
    'lines to comma separated',
  ],
  searchIntents: ['convert to one line', 'join lines online', 'remove line breaks'],
  process: (input, options) => textToOneLine(input, asTextToOneLineOptions(options)),
  defaultOptions: { ...TEXT_TO_ONE_LINE_DEFAULT_OPTIONS },
  options: [
    {
      type: 'text',
      key: 'separator',
      label: 'Separator',
      description: 'Text to insert between each line.',
      defaultValue: ' ',
      placeholder: 'e.g., " ", ", ", " | "',
    },
    {
      type: 'checkbox',
      key: 'trimLines',
      label: 'Trim whitespace from each line',
      description: 'Remove leading and trailing spaces from each line before joining.',
      defaultValue: true,
    },
    {
      type: 'checkbox',
      key: 'removeBlankLines',
      label: 'Remove blank lines',
      description: 'Skip empty lines when joining.',
      defaultValue: true,
    },
  ],
  relatedTools: ['text-cleaner', 'find-and-replace', 'add-prefix-suffix'],
  howToSteps: [
    'Paste your multiline text into the input area.',
    'Choose a separator (space, comma, pipe, etc.).',
    'Enable "Trim whitespace" to clean up each line.',
    'Enable "Remove blank lines" to skip empty lines.',
    'Press Text to One Line (or Ctrl/Cmd + Enter).',
    'Copy or download the single-line result.',
  ],
  useCases: [
    'Converting lists to comma-separated values (CSV)',
    'Creating single-line strings for code',
    'Formatting text for search queries',
    'Joining lines for database queries or JSON',
  ],
  examples: [
    {
      title: 'Join with spaces',
      input: 'Hello\nWorld\nTest',
      output: 'Hello World Test',
      optionsNote: 'Separator: " " (space)',
    },
    {
      title: 'Create comma-separated list',
      input: 'Apple\nBanana\nOrange',
      output: 'Apple, Banana, Orange',
      optionsNote: 'Separator: ", "',
    },
    {
      title: 'No separator',
      input: 'Hello\nWorld',
      output: 'HelloWorld',
      optionsNote: 'Separator: "" (empty)',
    },
  ],
  faq: [
    {
      question: 'Can I use any separator?',
      answer:
        'Yes. Enter any text you want between lines: a space, comma, pipe, dash, or even multiple characters like " | " or " -> ".',
    },
    {
      question: 'What does "Trim whitespace" do?',
      answer:
        'It removes leading and trailing spaces from each line before joining. This prevents extra spaces in your output.',
    },
    {
      question: 'How are blank lines handled?',
      answer:
        'By default, blank lines are removed. If you want to keep them, uncheck "Remove blank lines".',
    },
  ],
  actionLabel: 'Text to One Line',
  supportsDownload: true,
};
