/**
 * Sorting utilities for text lines
 */

import { splitLines, joinLines } from './text';

export type SortMode = 'alpha-asc' | 'alpha-desc' | 'numeric-asc' | 'numeric-desc' | 'length-asc' | 'length-desc';

export interface SortOptions {
  mode: SortMode;
  ignoreCase?: boolean;
}

/**
 * Sort lines alphabetically (ascending A-Z)
 */
export function sortLinesAlphabetically(lines: string[], ignoreCase = false): string[] {
  return [...lines].sort((a, b) => {
    const aComp = ignoreCase ? a.toLocaleLowerCase() : a;
    const bComp = ignoreCase ? b.toLocaleLowerCase() : b;
    return aComp.localeCompare(bComp);
  });
}

/**
 * Sort lines alphabetically (descending Z-A)
 */
export function sortLinesAlphabeticallyReverse(lines: string[], ignoreCase = false): string[] {
  return sortLinesAlphabetically(lines, ignoreCase).reverse();
}

/**
 * Sort lines numerically (ascending, treating lines as numbers)
 */
export function sortLinesNumerically(lines: string[]): string[] {
  return [...lines].sort((a, b) => {
    const numA = parseFloat(a) || 0;
    const numB = parseFloat(b) || 0;
    return numA - numB;
  });
}

/**
 * Sort lines numerically (descending)
 */
export function sortLinesNumericallyReverse(lines: string[]): string[] {
  return sortLinesNumerically(lines).reverse();
}

/**
 * Sort lines by length (shortest to longest)
 */
export function sortLinesByLength(lines: string[]): string[] {
  return [...lines].sort((a, b) => a.length - b.length);
}

/**
 * Sort lines by length (longest to shortest)
 */
export function sortLinesByLengthReverse(lines: string[]): string[] {
  return sortLinesByLength(lines).reverse();
}

/**
 * Sort text based on the specified mode
 */
export function sortText(text: string, options: SortOptions): string {
  const lines = splitLines(text);
  let sorted: string[];

  switch (options.mode) {
    case 'alpha-asc':
      sorted = sortLinesAlphabetically(lines, options.ignoreCase);
      break;
    case 'alpha-desc':
      sorted = sortLinesAlphabeticallyReverse(lines, options.ignoreCase);
      break;
    case 'numeric-asc':
      sorted = sortLinesNumerically(lines);
      break;
    case 'numeric-desc':
      sorted = sortLinesNumericallyReverse(lines);
      break;
    case 'length-asc':
      sorted = sortLinesByLength(lines);
      break;
    case 'length-desc':
      sorted = sortLinesByLengthReverse(lines);
      break;
    default:
      sorted = lines;
  }

  return joinLines(sorted);
}
