import type { ToolDefinition } from './types';
import { diffTexts, TEXT_DIFF_DEFAULT_OPTIONS, type TextDiffOptions } from './text-diff';

function asTextDiffOptions(options: Record<string, unknown>): TextDiffOptions {
  return {
    ignoreWhitespace: Boolean(options.ignoreWhitespace ?? TEXT_DIFF_DEFAULT_OPTIONS.ignoreWhitespace),
    ignoreCase: Boolean(options.ignoreCase ?? TEXT_DIFF_DEFAULT_OPTIONS.ignoreCase),
  };
}

export const textDiffTool: ToolDefinition = {
  slug: 'text-diff',
  name: 'Text Diff',
  category: 'comparison',
  shortDescription: 'Compare two texts side-by-side and see exactly what changed.',
  description:
    'Paste two versions of text and instantly see what was added, removed, or kept. Uses a unified diff format with `+` / `-` / space prefixes. Useful for comparing drafts, code snippets, or any text that has been edited. Everything stays in your browser.',
  seoTitle: 'Text Diff — Compare Two Texts Online | TextFixer',
  metaDescription:
    'Compare two texts and see the exact differences. Free, private, and works in your browser. Supports whitespace and case ignoring.',
  keywords: [
    'text diff',
    'compare texts',
    'diff tool',
    'text comparison',
    'find differences',
    'unified diff',
  ],
  searchIntents: ['text diff online', 'compare two texts', 'find differences in text'],
  dualInput: true,
  process: undefined,
  processDual: (inputA: string, inputB: string, options: Record<string, unknown>) =>
    diffTexts(inputA, inputB, asTextDiffOptions(options)),
  defaultOptions: { ...TEXT_DIFF_DEFAULT_OPTIONS },
  options: [
    {
      type: 'checkbox',
      key: 'ignoreWhitespace',
      label: 'Ignore whitespace changes',
      description: 'Treat multiple spaces/tabs as a single space when comparing.',
      defaultValue: false,
    },
    {
      type: 'checkbox',
      key: 'ignoreCase',
      label: 'Ignore case differences',
      description: 'Treat upper/lowercase as the same when comparing.',
      defaultValue: false,
    },
  ],
  relatedTools: ['compare-two-lists', 'find-replace', 'word-counter'],
  howToSteps: [
    'Paste the original text into the left field.',
    'Paste the modified text into the right field.',
    'Toggle whitespace or case ignoring if needed.',
    'Press Compare (or Ctrl/Cmd + Enter) to see the diff.',
  ],
  useCases: [
    'Comparing two versions of a document',
    'Spotting changes between edited paragraphs',
    'Checking what changed in a code snippet',
    'Reviewing before/after text edits',
  ],
  examples: [
    {
      title: 'Detect added and removed lines',
      input: 'Hello world\nThis is line two.\nGoodbye.',
      output: '  Hello world\n- This is line two.\n+ This is the new line two.\n  Goodbye.',
      optionsNote: 'Left has "This is line two.", right has "This is the new line two."',
    },
  ],
  faq: [
    {
      question: 'How are differences displayed?',
      answer:
        'Lines starting with `+` were added in the right text. Lines starting with `-` were removed. Lines starting with a space are unchanged.',
    },
    {
      question: 'Does this use the standard unified diff format?',
      answer:
        'It uses the same `+` / `-` / space prefix convention, but without line numbers or hunk headers. It is a simplified visual diff for quick text comparison.',
    },
  ],
  actionLabel: 'Compare',
  supportsDownload: false,
};
