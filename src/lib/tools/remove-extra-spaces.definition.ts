import type { ToolDefinition } from './types';
import { removeExtraSpaces } from './remove-extra-spaces';

export const removeExtraSpacesTool: ToolDefinition = {
  slug: 'remove-extra-spaces',
  name: 'Remove Extra Spaces',
  category: 'cleaning',
  shortDescription: 'Collapse multiple spaces and tabs into single spaces.',
  description:
    'Remove extra spaces, tabs, and whitespace from your text. Collapses multiple spaces into single spaces on each line while preserving your line breaks. Works entirely in your browser.',
  seoTitle: 'Remove Extra Spaces Online | TextFixer',
  metaDescription:
    'Remove extra spaces and tabs from text instantly. Collapse multiple spaces into one. Fast, free, and private — no signup required.',
  keywords: [
    'remove extra spaces',
    'remove spaces',
    'collapse spaces',
    'trim whitespace',
    'text spacing',
  ],
  searchIntents: ['remove extra spaces', 'collapse spaces online', 'trim text spaces'],
  process: (input) => removeExtraSpaces(input),
  defaultOptions: {},
  options: [],
  relatedTools: ['text-cleaner', 'remove-line-breaks', 'text-to-one-line'],
  howToSteps: [
    'Paste your text into the input area.',
    'Press Remove Spaces (or Ctrl/Cmd + Enter).',
    'Copy or download the cleaned text.',
  ],
  useCases: [
    'Cleaning text pasted from PDFs with irregular spacing',
    'Normalizing spacing before publishing content',
    'Preparing text for data imports where extra spaces cause errors',
    'Fixing copied text with inconsistent whitespace',
  ],
  examples: [
    {
      title: 'Collapse extra spaces',
      input: 'Hello    world!\nThis   has   too   many   spaces.',
      output: 'Hello world!\nThis has too many spaces.',
      optionsNote: 'Extra spaces on each line collapsed to single spaces.',
    },
  ],
  faq: [
    {
      question: 'Does this remove all spaces?',
      answer: 'No. It collapses multiple consecutive spaces into a single space. Single spaces between words are preserved.',
    },
    {
      question: 'Does it preserve line breaks?',
      answer: 'Yes. Line breaks are kept. Only spaces within each line are affected.',
    },
  ],
  actionLabel: 'Remove Spaces',
  supportsDownload: true,
};
