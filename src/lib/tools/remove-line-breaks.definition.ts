import type { ToolDefinition } from './types';
import { removeLineBreaks } from './remove-line-breaks';

export const removeLineBreaksTool: ToolDefinition = {
  slug: 'remove-line-breaks',
  name: 'Remove Line Breaks',
  category: 'cleaning',
  shortDescription: 'Join all lines into a single line of text.',
  description:
    'Remove line breaks from your text and join everything into a single line. Blank lines are removed and lines are joined with spaces. Ideal for cleaning multi-line text into a single paragraph.',
  seoTitle: 'Remove Line Breaks Online | TextFixer',
  metaDescription:
    'Remove line breaks and join text into one line. Free, private tool that runs in your browser. No signup required.',
  keywords: [
    'remove line breaks',
    'join lines',
    'one line text',
    'remove newlines',
    'single line',
  ],
  searchIntents: ['remove line breaks', 'join lines into one', 'convert to single line'],
  process: (input) => removeLineBreaks(input),
  defaultOptions: {},
  options: [],
  relatedTools: ['text-cleaner', 'remove-extra-spaces', 'text-to-one-line'],
  howToSteps: [
    'Paste your multi-line text into the input area.',
    'Press Remove Line Breaks (or Ctrl/Cmd + Enter).',
    'Copy the single-line result.',
  ],
  useCases: [
    'Converting multi-line text into a single paragraph',
    'Preparing text for fields that only accept single lines',
    'Cleaning addresses or data from multi-line format',
    'Joining broken lines from PDF copy-paste',
  ],
  examples: [
    {
      title: 'Join lines into one',
      input: 'Line one.\nLine two.\nLine three.',
      output: 'Line one. Line two. Line three.',
      optionsNote: 'Line breaks removed, lines joined with spaces.',
    },
  ],
  faq: [
    {
      question: 'What happens to blank lines?',
      answer: 'Blank lines are removed. Only non-empty lines are joined.',
    },
    {
      question: 'How are lines joined?',
      answer: 'Each line is trimmed and then joined with a single space.',
    },
  ],
  actionLabel: 'Remove Line Breaks',
  supportsDownload: true,
};
