import type { ToolDefinition } from './types';
import {
  READING_TIME_DEFAULT_OPTIONS,
  estimateReadingTime,
  type ReadingTimeOptions,
} from './reading-time';

function asReadingTimeOptions(options: Record<string, unknown>): ReadingTimeOptions {
  return {
    wordsPerMinute: Number(options.wordsPerMinute ?? READING_TIME_DEFAULT_OPTIONS.wordsPerMinute),
  };
}

export const readingTimeTool: ToolDefinition = {
  slug: 'reading-time',
  name: 'Reading Time Calculator',
  category: 'analysis',
  shortDescription: 'Estimate how long it takes to read your text.',
  description:
    'Calculate estimated reading time based on average reading speed. Customize reading speed (words per minute) to match your audience. Perfect for blog posts, articles, and documents.',
  seoTitle: 'Reading Time Calculator — Estimate Reading Time | TextFixer',
  metaDescription:
    'Calculate reading time for your text. Estimate how long it takes to read based on word count and reading speed. Free online reading time calculator.',
  keywords: [
    'reading time calculator',
    'estimate reading time',
    'reading time estimator',
    'how long to read',
    'reading speed calculator',
  ],
  searchIntents: ['calculate reading time', 'how long to read', 'reading time estimator'],
  process: (input, options) => estimateReadingTime(input, asReadingTimeOptions(options)),
  defaultOptions: { ...READING_TIME_DEFAULT_OPTIONS },
  options: [
    {
      type: 'text',
      key: 'wordsPerMinute',
      label: 'Reading speed (words per minute)',
      description: 'Average reading speed. Default: 200 wpm (adults). Slow: 150, Fast: 250.',
      defaultValue: '200',
      placeholder: '200',
    },
  ],
  relatedTools: ['word-counter', 'text-statistics', 'readability-checker'],
  howToSteps: [
    'Paste your text into the input area.',
    'Adjust reading speed if needed (default: 200 wpm).',
    'View estimated reading time instantly.',
  ],
  useCases: [
    'Adding reading time to blog posts',
    'Estimating presentation length',
    'Planning content consumption time',
    'Setting reading goals',
  ],
  examples: [
    {
      title: 'Calculate reading time',
      input: '400 words of text...',
      output: 'Reading time: 2 minutes (at 200 wpm)',
      optionsNote: 'Default 200 wpm reading speed',
    },
  ],
  faq: [
    {
      question: 'What is a typical reading speed?',
      answer:
        'Average adult reading speed is around 200-250 words per minute for non-technical content. Slower for technical or complex text (150 wpm), faster for skimming (300+ wpm).',
    },
    {
      question: 'Should I adjust the reading speed?',
      answer:
        'Yes, if your audience or content type differs. Use lower speeds (150 wpm) for complex topics, higher speeds (250 wpm) for casual content.',
    },
  ],
  actionLabel: 'Calculate Reading Time',
  supportsDownload: false,
};
