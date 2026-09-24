import type { ToolDefinition } from './types';
import { detectInvisibleChars } from './invisible-character-detector';

export const invisibleCharacterDetectorTool: ToolDefinition = {
  slug: 'invisible-character-detector',
  name: 'Invisible Character Detector',
  category: 'special',
  shortDescription: 'Find invisible and hidden Unicode characters in text.',
  description:
    'Detect invisible Unicode characters in your text — zero-width spaces, non-breaking spaces, BOM markers, and more. These hidden characters can cause unexpected bugs in search, comparison, and data processing. Works entirely in your browser.',
  seoTitle: 'Invisible Character Detector — Find Hidden Characters | TextFixer',
  metaDescription:
    'Find invisible Unicode characters in any text. Detect zero-width spaces, non-breaking spaces, and hidden characters. Free, private, browser-based tool.',
  keywords: [
    'invisible character detector',
    'find invisible characters',
    'zero width space',
    'hidden characters',
    'unicode detector',
  ],
  searchIntents: ['find invisible characters', 'detect hidden unicode', 'zero width space finder'],
  process: (input) => detectInvisibleChars(input),
  defaultOptions: {},
  options: [],
  relatedTools: ['text-cleaner', 'remove-extra-spaces', 'character-counter'],
  howToSteps: [
    'Paste or type your text into the input area.',
    'Press Detect (or Ctrl/Cmd + Enter).',
    'Review the list of invisible characters found.',
  ],
  useCases: [
    'Debugging text that looks correct but fails comparison or search',
    'Finding zero-width spaces pasted from websites or documents',
    'Identifying non-breaking spaces causing formatting issues',
    'Inspecting text received from external sources for hidden characters',
    'Cleaning text before data import or validation',
  ],
  examples: [
    {
      title: 'Detect hidden zero-width spaces',
      input: 'Hello\u200Bworld! This text has a zero\u200Bwidth space.',
      output: 'Invisible Characters Found: 2\n\nU+200B (Zero-width space): 2 found\n  Invisible character that allows line breaks at that point.',
      optionsNote: 'Two zero-width spaces detected.',
    },
  ],
  faq: [
    {
      question: 'Can I remove the invisible characters after detecting them?',
      answer: 'This tool detects and reports invisible characters. To remove them, copy the detected character codes and use the Find & Replace tool to remove them.',
    },
    {
      question: 'What are invisible characters used for?',
      answer: 'Invisible characters have legitimate uses: zero-width spaces control line-breaking, non-breaking spaces prevent wrapping, and the BOM marks byte order in files. But they often appear accidentally when copying text from websites or documents.',
    },
    {
      question: 'Does this detect ALL Unicode characters?',
      answer: 'It detects the most commonly encountered invisible Unicode characters. There are many Unicode code points, but the ones listed here are the ones most frequently found causing problems in practice.',
    },
  ],
  actionLabel: 'Detect Invisible Characters',
  supportsDownload: false,
};
