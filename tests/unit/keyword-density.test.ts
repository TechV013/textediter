import { describe, expect, it } from 'vitest';
import { analyzeKeywordDensity, KEYWORD_DENSITY_DEFAULT_OPTIONS } from '../../src/lib/tools/keyword-density';

describe('analyzeKeywordDensity', () => {
  it('handles empty input', () => {
    const result = analyzeKeywordDensity('', KEYWORD_DENSITY_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
    expect(result.message).toMatch(/paste/i);
  });

  it('requires a keyword', () => {
    const result = analyzeKeywordDensity('some text here', { ...KEYWORD_DENSITY_DEFAULT_OPTIONS, keyword: '' });
    expect(result.message).toMatch(/enter a keyword/i);
  });

  it('calculates keyword density correctly', () => {
    const result = analyzeKeywordDensity('test hello test world test', {
      ...KEYWORD_DENSITY_DEFAULT_OPTIONS,
      keyword: 'test',
    });
    const densityStat = result.stats?.find((s) => s.label === 'Density');
    expect(densityStat?.value).toBe('60%'); // 3 out of 5 words
  });

  it('counts keyword occurrences', () => {
    const result = analyzeKeywordDensity('apple banana apple cherry apple', {
      ...KEYWORD_DENSITY_DEFAULT_OPTIONS,
      keyword: 'apple',
    });
    const occurrenceStat = result.stats?.find((s) => s.label === 'Occurrences');
    expect(occurrenceStat?.value).toBe(3);
  });

  it('is case-insensitive by default', () => {
    const result = analyzeKeywordDensity('Test TEST test', {
      ...KEYWORD_DENSITY_DEFAULT_OPTIONS,
      keyword: 'test',
      caseSensitive: false,
    });
    const occurrenceStat = result.stats?.find((s) => s.label === 'Occurrences');
    expect(occurrenceStat?.value).toBe(3);
  });

  it('supports case-sensitive matching', () => {
    const result = analyzeKeywordDensity('Test TEST test', {
      ...KEYWORD_DENSITY_DEFAULT_OPTIONS,
      keyword: 'test',
      caseSensitive: true,
    });
    const occurrenceStat = result.stats?.find((s) => s.label === 'Occurrences');
    expect(occurrenceStat?.value).toBe(1);
  });

  it('reports a low density neutrally', () => {
    const result = analyzeKeywordDensity('word '.repeat(100) + 'keyword', {
      ...KEYWORD_DENSITY_DEFAULT_OPTIONS,
      keyword: 'keyword',
    });
    expect(result.message).toMatch(/%/i);
    expect(result.message).toMatch(/keyword/i);
    expect(result.message).not.toMatch(/recommended|stuffing/);
  });

  it('reports a high density neutrally', () => {
    const result = analyzeKeywordDensity('keyword '.repeat(10), {
      ...KEYWORD_DENSITY_DEFAULT_OPTIONS,
      keyword: 'keyword',
    });
    expect(result.message).toMatch(/%/i);
    expect(result.message).not.toMatch(/recommended|stuffing/);
  });
});
