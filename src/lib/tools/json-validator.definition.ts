import type { ToolDefinition } from './types';
import { validateJson } from './json-validator';

export const jsonValidatorTool: ToolDefinition = {
  slug: 'json-validator',
  name: 'JSON Validator',
  category: 'web-developer',
  shortDescription: 'Validate JSON syntax and get detailed error information.',
  description:
    'Check if your JSON is valid. Get error details including position, object type, key count, nesting depth, and size. Works entirely in your browser.',
  seoTitle: 'JSON Validator — Validate JSON Online | TextFixer',
  metaDescription:
    'Validate JSON syntax online. Get detailed error information, object type, depth, and key count. Free, private tool — no signup required.',
  keywords: [
    'json validator',
    'validate json',
    'json syntax checker',
    'json lint',
    'json error checker',
  ],
  searchIntents: ['validate json online', 'json syntax checker', 'check json validity'],
  process: (input) => validateJson(input),
  defaultOptions: {},
  options: [],
  relatedTools: ['json-formatter', 'text-diff', 'html-to-text'],
  howToSteps: [
    'Paste your JSON into the input area.',
    'Press Validate JSON (or Ctrl/Cmd + Enter).',
    'Check the status and error details.',
  ],
  useCases: [
    'Checking if a JSON file or API response is valid',
    'Finding syntax errors in hand-written JSON',
    'Validating JSON before importing into a database or tool',
    'Inspecting JSON structure (depth, key count, type)',
  ],
  examples: [
    {
      title: 'Validate valid JSON',
      input: '{"name":"TextFixer","version":"1.0","tags":["text","tools"]}',
      output: '{\n  "name": "TextFixer",\n  "version": "1.0",\n  "tags": ["text", "tools"]\n}',
      optionsNote: 'Valid JSON — object with 3 keys, max depth 2.',
    },
    {
      title: 'Invalid JSON with error',
      input: '{"name": "TextFixer", "version": 1.0,}',
      output: '{"name": "TextFixer", "version": 1.0,}',
      optionsNote: 'Invalid JSON — trailing comma before closing brace.',
    },
  ],
  faq: [
    {
      question: 'What makes JSON invalid?',
      answer: 'Common issues include: trailing commas, missing quotes around keys, unmatched brackets or braces, and incorrect data types.',
    },
    {
      question: 'Does this validate JSON structure (e.g., required fields)?',
      answer: 'No. This tool checks JSON syntax only. It does not validate against a schema or check for required fields.',
    },
  ],
  actionLabel: 'Validate JSON',
  supportsDownload: false,
};
