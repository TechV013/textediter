import type { ToolDefinition } from './types';
import { formatJson, JSON_FORMATTER_DEFAULT_OPTIONS, type JsonFormatterOptions } from './json-formatter';

function asJsonFormatterOptions(options: Record<string, unknown>): JsonFormatterOptions {
  return {
    indent: Number(options.indent ?? JSON_FORMATTER_DEFAULT_OPTIONS.indent),
    sortKeys: Boolean(options.sortKeys ?? JSON_FORMATTER_DEFAULT_OPTIONS.sortKeys),
  };
}

export const jsonFormatterTool: ToolDefinition = {
  slug: 'json-formatter',
  name: 'JSON Formatter',
  category: 'web-developer',
  shortDescription: 'Format and beautify JSON with proper indentation.',
  description:
    'Format and beautify JSON with proper indentation. Validate JSON syntax and see errors highlighted. Optionally sort object keys alphabetically. Works entirely in your browser.',
  seoTitle: 'JSON Formatter — Format JSON Online | TextFixer',
  metaDescription:
    'Format and beautify JSON online with proper indentation. Free, private JSON formatter. Validate syntax and sort keys. No signup required.',
  keywords: [
    'json formatter',
    'format json',
    'json beautifier',
    'json pretty print',
    'json validator',
  ],
  searchIntents: ['format json online', 'json beautifier', 'json pretty print'],
  process: (input, options) => formatJson(input, asJsonFormatterOptions(options)),
  defaultOptions: { ...JSON_FORMATTER_DEFAULT_OPTIONS },
  options: [
    {
      type: 'select',
      key: 'indent',
      label: 'Indentation',
      description: 'Number of spaces per indentation level.',
      defaultValue: '2',
      choices: [
        { value: '2', label: '2 spaces' },
        { value: '4', label: '4 spaces' },
        { value: '1', label: '1 tab (1 space)' },
      ],
    },
    {
      type: 'checkbox',
      key: 'sortKeys',
      label: 'Sort keys alphabetically',
      description: 'Reorder object keys A-Z.',
      defaultValue: false,
    },
  ],
  relatedTools: ['json-validator', 'text-diff', 'html-to-text'],
  howToSteps: [
    'Paste your JSON into the input area.',
    'Choose indentation size and whether to sort keys.',
    'Press Format JSON (or Ctrl/Cmd + Enter).',
    'Copy or download the formatted output.',
  ],
  useCases: [
    'Making minified or compressed JSON readable',
    'Debugging API responses with deeply nested JSON',
    'Preparing JSON for code reviews or documentation',
    'Normalizing JSON before comparison',
  ],
  examples: [
    {
      title: 'Format minified JSON',
      input: '{"name":"TextFixer","version":"1.0","features":["clean","format"]}',
      output: '{\n  "name": "TextFixer",\n  "version": "1.0",\n  "features": [\n    "clean",\n    "format"\n  ]\n}',
      optionsNote: '2-space indentation, default sort.',
    },
  ],
  faq: [
    {
      question: 'What happens if the JSON is invalid?',
      answer: 'The tool returns the original input along with a clear error message describing the syntax issue, including the approximate position of the error.',
    },
    {
      question: 'Does this fix broken JSON?',
      answer: 'No. The tool formats valid JSON. If the JSON has syntax errors, it will report the error so you can fix it manually.',
    },
  ],
  actionLabel: 'Format JSON',
  supportsDownload: true,
};
