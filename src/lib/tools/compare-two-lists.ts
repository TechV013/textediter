import type { ToolProcessResult } from './types';

export interface CompareTwoListsOptions {
  caseInsensitive: boolean;
  trimWhitespace: boolean;
}

export const COMPARE_TWO_LISTS_DEFAULT_OPTIONS: CompareTwoListsOptions = {
  caseInsensitive: false,
  trimWhitespace: true,
};

/**
 * Compare two line-based lists and show which items appear in each.
 *
 * Items are compared line-by-line (after optional trimming/case folding).
 * Output is grouped into: items only in A, items only in B, and items in both.
 *
 * This is NOT a true set intersection — duplicate lines within a single input
 * are preserved in the per-list counts but deduplicated for the cross-list
 * comparison. The "in both" section shows one copy of each shared item.
 *
 * Everything runs in the browser — no server calls.
 */
export function compareLists(
  inputA: string,
  inputB: string,
  options: CompareTwoListsOptions,
): ToolProcessResult {
  if (inputA.length === 0 && inputB.length === 0) {
    return { output: '', message: 'Paste text into both fields to compare them.' };
  }
  if (inputA.length === 0) {
    return { output: '', message: 'Paste text into the left field to compare.' };
  }
  if (inputB.length === 0) {
    return { output: '', message: 'Paste text into the right field to compare.' };
  }

  const normalize = (s: string) => {
    let t = s;
    if (options.trimWhitespace) t = t.trim();
    if (options.caseInsensitive) t = t.toLowerCase();
    return t;
  };

  const parse = (text: string) => {
    const lines = text.split('\n');
    const normalized = lines.map(normalize).filter((l) => l.length > 0);
    const unique = [...new Set(normalized)];
    return { lines: normalized, unique };
  };

  const a = parse(inputA);
  const b = parse(inputB);

  const setA = new Set(a.unique);
  const setB = new Set(b.unique);

  const onlyInA = a.unique.filter((item) => !setB.has(item));
  const onlyInB = b.unique.filter((item) => !setA.has(item));
  const inBoth = a.unique.filter((item) => setB.has(item));

  const sections: string[] = [];

  if (onlyInA.length > 0) {
    sections.push(`--- Only in left (${onlyInA.length}) ---`);
    sections.push(...onlyInA);
  }
  if (onlyInB.length > 0) {
    sections.push(`--- Only in right (${onlyInB.length}) ---`);
    sections.push(...onlyInB);
  }
  if (inBoth.length > 0) {
    sections.push(`--- In both (${inBoth.length}) ---`);
    sections.push(...inBoth);
  }

  const output = sections.join('\n');
  const stats = [
    { label: 'Items only in left', value: onlyInA.length },
    { label: 'Items only in right', value: onlyInB.length },
    { label: 'Items in both', value: inBoth.length },
  ];

  const message =
    onlyInA.length === 0 && onlyInB.length === 0
      ? 'The two lists contain the same items.'
      : `Found ${onlyInA.length} item${onlyInA.length === 1 ? '' : 's'} only in left, ${onlyInB.length} only in right, and ${inBoth.length} in both.`;

  return { output, stats, message };
}
