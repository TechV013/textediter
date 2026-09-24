import { describe, expect, it } from 'vitest';
import { checkReadability, READABILITY_CHECKER_DEFAULT_OPTIONS } from '../../src/lib/tools/readability-checker';

describe('checkReadability', () => {
  it('handles empty input', () => {
    const result = checkReadability('', READABILITY_CHECKER_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
    expect(result.message).toMatch(/paste/i);
  });

  it('requires at least one sentence', () => {
    const result = checkReadability('word', READABILITY_CHECKER_DEFAULT_OPTIONS);
    expect(result.message).toMatch(/sentence/i);
  });

  it('refuses to score text that is too short', () => {
    const result = checkReadability('Just a few words here.', READABILITY_CHECKER_DEFAULT_OPTIONS);
    expect(result.message).toMatch(/not enough text/i);
  });

  it('calculates Flesch Reading Ease score', () => {
    const result = checkReadability(
      'The quick brown fox jumps over the lazy dog. It was a beautiful quiet morning in the countryside.',
      READABILITY_CHECKER_DEFAULT_OPTIONS,
    );
    expect(result.stats).toBeDefined();
    const scoreStat = result.stats?.find((s) => s.label === 'Flesch Reading Ease');
    expect(scoreStat?.value).toBeGreaterThan(0);
    expect(scoreStat?.value).toBeLessThanOrEqual(100);
  });

  it('provides reading level', () => {
    const result = checkReadability(
      'Simple text here. Easy words without any difficulty at all.',
      READABILITY_CHECKER_DEFAULT_OPTIONS,
    );
    const levelStat = result.stats?.find((s) => s.label === 'Reading level');
    expect(levelStat?.value).toBeDefined();
    expect(typeof levelStat?.value).toBe('string');
  });

  it('shows sentence statistics', () => {
    const result = checkReadability(
      'First sentence. Second sentence. Third one over here as well.',
      READABILITY_CHECKER_DEFAULT_OPTIONS,
    );
    const sentenceStat = result.stats?.find((s) => s.label === 'Sentences');
    expect(sentenceStat?.value).toBe(3);
  });
});
