import type { ToolProcessResult } from './types';

const INVISIBLE_CHARS: Array<{ name: string; code: string; regex: RegExp; description: string }> = [
  { name: 'Zero-width space', code: 'U+200B', regex: /\u200B/g, description: 'Invisible character that allows line breaks at that point.' },
  { name: 'Zero-width non-joiner', code: 'U+200C', regex: /\u200C/g, description: 'Prevents characters from joining in bidirectional text.' },
  { name: 'Zero-width joiner', code: 'U+200D', regex: /\u200D/g, description: 'Causes characters to join in bidirectional text.' },
  { name: 'Zero-width no-break space', code: 'U+FEFF', regex: /\uFEFF/g, description: 'Byte Order Mark or zero-width no-break space.' },
  { name: 'Soft hyphen', code: 'U+00AD', regex: /\u00AD/g, description: 'Invisible hyphen that may show when line-breaking.' },
  { name: 'Non-breaking space', code: 'U+00A0', regex: /\u00A0/g, description: 'Space that prevents line breaks at that position.' },
  { name: 'En quad', code: 'U+2000', regex: /\u2000/g, description: 'Space the width of the letter n.' },
  { name: 'Em quad', code: 'U+2001', regex: /\u2001/g, description: 'Space the width of the letter m.' },
  { name: 'Hair space', code: 'U+200A', regex: /\u200A/g, description: 'Very thin invisible space.' },
  { name: 'Narrow no-break space', code: 'U+202F', regex: /\u202F/g, description: 'Thin non-breaking space.' },
  { name: 'Ideographic space', code: 'U+3000', regex: /\u3000/g, description: 'Full-width space used in CJK text.' },
  { name: 'Line separator', code: 'U+2028', regex: /\u2028/g, description: 'Unicode line separator.' },
  { name: 'Paragraph separator', code: 'U+2029', regex: /\u2029/g, description: 'Unicode paragraph separator.' },
];

export function detectInvisibleChars(input: string): ToolProcessResult {
  if (!input) {
    return { output: '', message: 'No input provided.' };
  }

  const found: Array<{ name: string; code: string; count: number; description: string }> = [];
  let totalInvisible = 0;

  for (const char of INVISIBLE_CHARS) {
    const matches = input.match(char.regex);
    if (matches && matches.length > 0) {
      found.push({
        name: char.name,
        code: char.code,
        count: matches.length,
        description: char.description,
      });
      totalInvisible += matches.length;
    }
  }

  if (found.length === 0) {
    return {
      output: 'No invisible characters found.',
      stats: [
        { label: 'Invisible characters', value: 0 },
        { label: 'Visible characters', value: input.length },
      ],
      message: 'Your text does not contain any common invisible Unicode characters.',
    };
  }

  const lines: string[] = [];
  lines.push('Invisible Characters Found: ' + totalInvisible);
  lines.push('');
  for (const item of found) {
    lines.push(item.code + ' (' + item.name + '): ' + item.count + ' found');
    lines.push('  ' + item.description);
    lines.push('');
  }
  lines.push('---');
  lines.push('These characters are invisible but may affect text processing,');
  lines.push('search, comparison, or data validation.');

  return {
    output: lines.join('\n'),
    stats: [
      { label: 'Types found', value: found.length },
      { label: 'Total invisible chars', value: totalInvisible },
      { label: 'Text length', value: input.length },
    ],
    message: 'Found ' + found.length + ' type(s) of invisible characters (' + totalInvisible + ' total).',
  };
}
