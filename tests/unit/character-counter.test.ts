import { describe, expect, it } from 'vitest';
import { countCharacterStats, CHARACTER_COUNTER_DEFAULT_OPTIONS } from '../../src/lib/tools/character-counter';

describe('countCharacterStats', () => {
  it('handles empty input', () => {
    const result = countCharacterStats('', CHARACTER_COUNTER_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
    expect(result.message).toMatch(/paste/i);
  });

  it('counts total characters', () => {
    const result = countCharacterStats('Hello', CHARACTER_COUNTER_DEFAULT_OPTIONS);
    const totalStat = result.stats?.find((s) => s.label === 'Total characters');
    expect(totalStat?.value).toBe(5);
  });

  it('counts characters without spaces', () => {
    const result = countCharacterStats('Hello World', CHARACTER_COUNTER_DEFAULT_OPTIONS);
    const stat = result.stats?.find((s) => s.label === 'Without spaces');
    expect(stat?.value).toBe(10);
  });

  it('counts spaces separately', () => {
    const result = countCharacterStats('Hello World', CHARACTER_COUNTER_DEFAULT_OPTIONS);
    const stat = result.stats?.find((s) => s.label === 'Spaces');
    expect(stat?.value).toBe(1);
  });

  it('counts letters', () => {
    const result = countCharacterStats('Hello123', CHARACTER_COUNTER_DEFAULT_OPTIONS);
    const stat = result.stats?.find((s) => s.label === 'Letters');
    expect(stat?.value).toBe(5);
  });

  it('counts digits', () => {
    const result = countCharacterStats('Test123', CHARACTER_COUNTER_DEFAULT_OPTIONS);
    const stat = result.stats?.find((s) => s.label === 'Digits');
    expect(stat?.value).toBe(3);
  });

  it('counts punctuation', () => {
    const result = countCharacterStats('Hello, World!', CHARACTER_COUNTER_DEFAULT_OPTIONS);
    const stat = result.stats?.find((s) => s.label === 'Punctuation');
    expect(stat?.value).toBe(2);
  });

  it('counts line breaks', () => {
    const result = countCharacterStats('Line 1\nLine 2\nLine 3', CHARACTER_COUNTER_DEFAULT_OPTIONS);
    const stat = result.stats?.find((s) => s.label === 'Line breaks');
    expect(stat?.value).toBe(2);
  });
});
