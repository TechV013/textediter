import { describe, expect, it } from 'vitest';
import {
  compareLists,
  COMPARE_TWO_LISTS_DEFAULT_OPTIONS,
} from '../../src/lib/tools/compare-two-lists';

describe('compareLists', () => {
  it('returns empty when both inputs are empty', () => {
    const result = compareLists('', '', COMPARE_TWO_LISTS_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
  });

  it('reports identical lists', () => {
    const result = compareLists(
      'apple\nbanana',
      'apple\nbanana',
      COMPARE_TWO_LISTS_DEFAULT_OPTIONS,
    );
    expect(result.message).toMatch(/same/i);
  });

  it('finds items only in left', () => {
    const result = compareLists(
      'apple\nbanana\ncherry',
      'apple\nbanana',
      COMPARE_TWO_LISTS_DEFAULT_OPTIONS,
    );
    expect(result.output).toContain('Only in left');
    expect(result.output).toContain('cherry');
  });

  it('finds items only in right', () => {
    const result = compareLists(
      'apple\nbanana',
      'apple\nbanana\ndate',
      COMPARE_TWO_LISTS_DEFAULT_OPTIONS,
    );
    expect(result.output).toContain('Only in right');
    expect(result.output).toContain('date');
  });

  it('finds items in both', () => {
    const result = compareLists(
      'apple\nbanana',
      'banana\ncherry',
      COMPARE_TWO_LISTS_DEFAULT_OPTIONS,
    );
    expect(result.output).toContain('In both');
    expect(result.output).toContain('banana');
  });

  it('deduplicates within a list', () => {
    const result = compareLists(
      'apple\napple\nbanana',
      'apple\nbanana',
      COMPARE_TWO_LISTS_DEFAULT_OPTIONS,
    );
    expect(result.message).toMatch(/same/i);
  });

  it('filters blank lines', () => {
    const result = compareLists(
      'apple\n\nbanana\n',
      'apple\nbanana',
      COMPARE_TWO_LISTS_DEFAULT_OPTIONS,
    );
    expect(result.message).toMatch(/same/i);
  });

  it('handles case-insensitive comparison', () => {
    const result = compareLists(
      'Apple\nBanana',
      'apple\nbanana',
      { ...COMPARE_TWO_LISTS_DEFAULT_OPTIONS, caseInsensitive: true },
    );
    expect(result.message).toMatch(/same/i);
  });

  it('handles case-sensitive comparison (default)', () => {
    const result = compareLists(
      'Apple\nBanana',
      'apple\nbanana',
      COMPARE_TWO_LISTS_DEFAULT_OPTIONS,
    );
    expect(result.output).toContain('Only in left');
    expect(result.output).toContain('Only in right');
  });

  it('trims whitespace by default', () => {
    const result = compareLists(
      '  apple  \n  banana  ',
      'apple\nbanana',
      COMPARE_TWO_LISTS_DEFAULT_OPTIONS,
    );
    expect(result.message).toMatch(/same/i);
  });

  it('shows correct stats', () => {
    const result = compareLists(
      'apple\nbanana\ncherry',
      'banana\ndate',
      COMPARE_TWO_LISTS_DEFAULT_OPTIONS,
    );
    const left = result.stats?.find((s) => s.label === 'Items only in left');
    const right = result.stats?.find((s) => s.label === 'Items only in right');
    const both = result.stats?.find((s) => s.label === 'Items in both');
    expect(left?.value).toBe(2);
    expect(right?.value).toBe(1);
    expect(both?.value).toBe(1);
  });
});
