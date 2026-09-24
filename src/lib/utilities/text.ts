/** Normalize Windows/Mac/Unix line endings to LF. */
export function normalizeNewlines(text: string): string {
  return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

/** Split into lines after newline normalization (keeps empty trailing line semantics). */
export function splitLines(text: string): string[] {
  const normalized = normalizeNewlines(text);
  if (normalized.length === 0) return [];
  return normalized.split('\n');
}

export function joinLines(lines: string[]): string {
  return lines.join('\n');
}

/** Count Unicode code points (grapheme-safe enough for most utilities; not NFC-aware clusters). */
export function countCharacters(text: string): number {
  return Array.from(text).length;
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/u).filter(Boolean).length;
}

export function countLines(text: string): number {
  if (text.length === 0) return 0;
  return splitLines(text).length;
}

export function isWhitespaceOnly(text: string): boolean {
  return text.length > 0 && text.trim().length === 0;
}

/**
 * Collapse runs of horizontal whitespace (spaces/tabs) to a single space.
 * Preserves newlines.
 */
export function collapseHorizontalWhitespace(text: string): string {
  return text.replace(/[^\S\n\r]+/gu, ' ');
}

/** Remove common punctuation (Unicode-aware punctuation class + ASCII extras). */
export function stripPunctuation(text: string): string {
  return text.replace(/[\p{P}\p{S}]+/gu, '');
}

/**
 * Keep letters, numbers, whitespace, and common word marks.
 * Removes other symbols/controls except newlines/tabs.
 */
export function stripSpecialCharacters(text: string): string {
  return text.replace(/[^\p{L}\p{N}\p{M}\s]/gu, '');
}

export function trimEachLine(text: string): string {
  return joinLines(splitLines(text).map((line) => line.trim()));
}

export function removeBlankLines(text: string): string {
  return joinLines(splitLines(text).filter((line) => line.trim().length > 0));
}

export interface DeduplicateLinesOptions {
  ignoreCase?: boolean;
  trimWhitespace?: boolean;
  preserveOrder?: boolean;
}

export function deduplicateLines(
  text: string,
  options: DeduplicateLinesOptions = {},
): string {
  const { ignoreCase = false, trimWhitespace = false, preserveOrder = true } = options;
  const lines = splitLines(text);
  const seen = new Set<string>();
  const result: string[] = [];

  for (const line of lines) {
    let key = trimWhitespace ? line.trim() : line;
    if (ignoreCase) key = key.toLocaleLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(line);
  }

  if (!preserveOrder) {
    return joinLines([...result].sort((a, b) => a.localeCompare(b)));
  }
  return joinLines(result);
}

export interface DeduplicateWordsOptions {
  ignoreCase?: boolean;
  preserveOrder?: boolean;
}

/**
 * Deduplicate whitespace-separated words across the whole text.
 * Preserves line breaks; joins remaining words on each line with a single space.
 * Keeps the original spelling of the first occurrence.
 */
export function deduplicateWords(
  text: string,
  options: DeduplicateWordsOptions = {},
): string {
  const { ignoreCase = false, preserveOrder = true } = options;
  const seen = new Set<string>();

  const filteredLines = splitLines(text).map((line) => {
    const words = line.split(/\s+/u).filter(Boolean);
    const kept: string[] = [];
    for (const word of words) {
      const key = ignoreCase ? word.toLocaleLowerCase() : word;
      if (seen.has(key)) continue;
      seen.add(key);
      kept.push(word);
    }
    return kept;
  });

  if (!preserveOrder) {
    const all = filteredLines.flat().sort((a, b) => a.localeCompare(b));
    return all.join(' ');
  }

  return joinLines(filteredLines.map((words) => words.join(' ')));
}

export function removeLineBreaks(text: string, separator = ' '): string {
  const normalized = normalizeNewlines(text);
  return normalized
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join(separator);
}
