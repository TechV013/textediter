import type { ToolDefinition } from './types';
import {
  READABILITY_CHECKER_DEFAULT_OPTIONS,
  checkReadability,
  type ReadabilityCheckerOptions,
} from './readability-checker';

function asReadabilityCheckerOptions(options: Record<string, unknown>): ReadabilityCheckerOptions {
  return {
    showDetails: Boolean(options.showDetails ?? READABILITY_CHECKER_DEFAULT_OPTIONS.showDetails),
  };
}

export const readabilityCheckerTool: ToolDefinition = {
  slug: 'readability-checker',
  name: 'Readability Checker',
  category: 'analysis',
  shortDescription: 'Check text readability with Flesch Reading Ease score.',
  description:
    'Analyze text readability using the Flesch Reading Ease formula. Get a readability score (0-100) and corresponding grade level. Higher scores mean easier reading. Perfect for writers, educators, and content creators.',
  seoTitle: 'Readability Checker — Flesch Reading Ease Score | TextFixer',
  metaDescription:
    'Check text readability with Flesch Reading Ease score. Analyze reading difficulty and grade level. Free online readability checker tool.',
  keywords: [
    'readability checker',
    'flesch reading ease',
    'reading level checker',
    'text readability',
    'readability score',
  ],
  searchIntents: ['check readability', 'flesch reading ease calculator', 'reading level test'],
  process: (input, options) => checkReadability(input, asReadabilityCheckerOptions(options)),
  defaultOptions: { ...READABILITY_CHECKER_DEFAULT_OPTIONS },
  options: [
    {
      type: 'checkbox',
      key: 'showDetails',
      label: 'Show detailed metrics',
      description: 'Display word count, sentence count, and averages.',
      defaultValue: true,
    },
  ],
  relatedTools: ['text-statistics', 'reading-time', 'word-counter'],
  howToSteps: [
    'Paste your text into the input area.',
    'View the Flesch Reading Ease score (0-100).',
    'Check the corresponding reading level.',
    'Use the feedback to simplify or adjust your text.',
  ],
  useCases: [
    'Writing content for specific audiences',
    'Improving content accessibility',
    'Meeting readability requirements',
    'Analyzing text complexity',
  ],
  examples: [
    {
      title: 'Check readability',
      input: 'The cat sat on the mat. This is simple text.',
      output: 'Score: 85, Level: Easy (6th grade)',
      optionsNote: 'Higher scores = easier reading',
    },
  ],
  faq: [
    {
      question: 'What is the Flesch Reading Ease score?',
      answer:
        'A readability score from 0-100. Higher scores (90-100) mean very easy text (5th grade). Lower scores (0-30) mean very difficult text (college graduate level). Most content should aim for 60-70 (8th-9th grade).',
    },
    {
      question: 'How can I improve my score?',
      answer:
        'Use shorter sentences, simpler words, and fewer syllables. Break up long sentences. Avoid jargon and complex vocabulary when possible.',
    },
    {
      question: 'What is a good score?',
      answer:
        'For general audiences, aim for 60-70 (standard/easy). For technical content, 50-60 is acceptable. For children or ESL readers, aim for 80+.',
    },
  ],
  actionLabel: 'Check Readability',
  supportsDownload: false,
};
