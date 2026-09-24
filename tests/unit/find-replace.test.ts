import { describe, expect, it } from 'vitest';
import { findReplace, FIND_REPLACE_DEFAULT_OPTIONS } from '../../src/lib/tools/find-replace';

describe('findReplace', () => {
  it('handles empty input', () => {
    const result = findReplace('', FIND_REPLACE_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
    expect(result.message).toMatch(/paste/i);
  });

  it('requires find text', () => {
    const result = findReplace('hello world', { ...FIND_REPLACE_DEFAULT_OPTIONS, find: '' });
    expect(result.output).toBe('hello world');
    expect(result.message).toMatch(/find/i);
  });

  it('replaces all occurrences', () => {
    const result = findReplace('cat cat cat', {
      find: 'cat',
      replace: 'dog',
      caseSensitive: false,
      replaceAll: true,
    });
    expect(result.output).toBe('dog dog dog');
    expect(result.stats?.find((s) => s.label === 'Replacements made')?.value).toBe(3);
  });

  it('replaces only first occurrence when replaceAll is false', () => {
    const result = findReplace('cat cat cat', {
      find: 'cat',
      replace: 'dog',
      caseSensitive: false,
      replaceAll: false,
    });
    expect(result.output).toBe('dog cat cat');
    expect(result.stats?.find((s) => s.label === 'Replacements made')?.value).toBe(1);
  });

  it('respects case sensitivity', () => {
    const result = findReplace('Cat cat CAT', {
      find: 'cat',
      replace: 'dog',
      caseSensitive: true,
      replaceAll: true,
    });
    expect(result.output).toBe('Cat dog CAT');
    expect(result.stats?.find((s) => s.label === 'Replacements made')?.value).toBe(1);
  });

  it('is case insensitive by default', () => {
    const result = findReplace('Cat cat CAT', {
      find: 'cat',
      replace: 'dog',
      caseSensitive: false,
      replaceAll: true,
    });
    expect(result.output).toBe('dog dog dog');
    expect(result.stats?.find((s) => s.label === 'Replacements made')?.value).toBe(3);
  });

  it('handles special regex characters safely', () => {
    const result = findReplace('2 + 2 = 4', {
      find: '2 + 2',
      replace: '3 + 3',
      caseSensitive: false,
      replaceAll: true,
    });
    expect(result.output).toBe('3 + 3 = 4');
  });

  it('deletes text when replace is empty', () => {
    const result = findReplace('hello world hello ', {
      find: 'hello ',
      replace: '',
      caseSensitive: false,
      replaceAll: true,
    });
    expect(result.output).toBe('world ');
  });

  it('counts matches correctly', () => {
    const result = findReplace('apple apple banana apple', {
      find: 'apple',
      replace: 'orange',
      caseSensitive: false,
      replaceAll: true,
    });
    expect(result.stats?.find((s) => s.label === 'Matches found')?.value).toBe(3);
  });

  it('handles no matches', () => {
    const result = findReplace('hello world', {
      find: 'xyz',
      replace: 'abc',
      caseSensitive: false,
      replaceAll: true,
    });
    expect(result.output).toBe('hello world');
    expect(result.stats?.find((s) => s.label === 'Matches found')?.value).toBe(0);
  });
});
