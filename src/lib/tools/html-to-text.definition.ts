import type { ToolDefinition } from './types';
import { htmlToText, HTML_TO_TEXT_DEFAULT_OPTIONS, type HtmlToTextOptions } from './html-to-text';

function asHtmlToTextOptions(options: Record<string, unknown>): HtmlToTextOptions {
  return {
    preserveLineBreaks: Boolean(options.preserveLineBreaks ?? HTML_TO_TEXT_DEFAULT_OPTIONS.preserveLineBreaks),
    trimWhitespace: Boolean(options.trimWhitespace ?? HTML_TO_TEXT_DEFAULT_OPTIONS.trimWhitespace),
  };
}

export const htmlToTextTool: ToolDefinition = {
  slug: 'html-to-text',
  name: 'HTML to Text',
  category: 'web-developer',
  shortDescription: 'Strip HTML tags and extract clean text from HTML.',
  description:
    'Remove HTML tags and extract clean, readable text. Preserves structure with line breaks for block elements. Strips script and style tags. Works entirely in your browser.',
  seoTitle: 'HTML to Text — Extract Text from HTML Online | TextFixer',
  metaDescription:
    'Extract text from HTML online. Strip tags, decode entities, preserve structure. Free, private HTML to text converter. No signup required.',
  keywords: [
    'html to text',
    'strip html tags',
    'html to plain text',
    'remove html',
    'extract text from html',
  ],
  searchIntents: ['html to text online', 'strip html tags', 'extract text from html'],
  process: (input, options) => htmlToText(input, asHtmlToTextOptions(options)),
  defaultOptions: { ...HTML_TO_TEXT_DEFAULT_OPTIONS },
  options: [
    {
      type: 'checkbox',
      key: 'preserveLineBreaks',
      label: 'Preserve line breaks',
      description: 'Add line breaks for paragraph, div, and heading elements.',
      defaultValue: true,
    },
    {
      type: 'checkbox',
      key: 'trimWhitespace',
      label: 'Trim leading/trailing whitespace',
      defaultValue: true,
    },
  ],
  relatedTools: ['json-formatter', 'text-cleaner', 'text-diff'],
  howToSteps: [
    'Paste your HTML into the input area.',
    'Choose whether to preserve line breaks.',
    'Press Convert (or Ctrl/Cmd + Enter).',
    'Copy or download the plain text.',
  ],
  useCases: [
    'Extracting text from a copied HTML snippet or email',
    'Cleaning HTML before pasting into a document',
    'Getting plain text from web scraping results',
    'Removing formatting from HTML-formatted content',
  ],
  examples: [
    {
      title: 'Strip HTML tags',
      input: '<h1>Hello World</h1><p>This is a <strong>paragraph</strong> with <a href="#">a link</a>.</p>',
      output: 'Hello World\n\nThis is a paragraph with a link.',
      optionsNote: 'Block elements get line breaks, tags are stripped, entities decoded.',
    },
  ],
  faq: [
    {
      question: 'Does this handle malformed HTML?',
      answer: 'The tool handles common HTML structures. Severely malformed HTML may produce unexpected results, but the tag-stripping approach is generally forgiving.',
    },
    {
      question: 'What about script and style tags?',
      answer: 'Script and style tags and their content are completely removed. Only visible text content is extracted.',
    },
  ],
  actionLabel: 'Convert to Text',
  supportsDownload: true,
};
