import { describe, expect, it } from 'vitest';
import {
  extractPhoneNumbers,
  PHONE_NUMBER_EXTRACTOR_DEFAULT_OPTIONS,
} from '../../src/lib/tools/phone-number-extractor';

describe('extractPhoneNumbers', () => {
  it('handles empty input', () => {
    const result = extractPhoneNumbers('', PHONE_NUMBER_EXTRACTOR_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
    expect(result.message).toMatch(/paste/i);
  });

  it('extracts a US-style number with country code', () => {
    const result = extractPhoneNumbers(
      'Call +1 555 123 4567',
      PHONE_NUMBER_EXTRACTOR_DEFAULT_OPTIONS,
    );
    expect(result.output).toContain('+1 555 123 4567');
  });

  it('extracts an Indian-style number', () => {
    const result = extractPhoneNumbers(
      'Call +91 98765 43210',
      PHONE_NUMBER_EXTRACTOR_DEFAULT_OPTIONS,
    );
    expect(result.output).toContain('+91 98765 43210');
  });

  it('extracts parenthesised area code format', () => {
    const result = extractPhoneNumbers(
      'Fax: (555) 987-6543',
      PHONE_NUMBER_EXTRACTOR_DEFAULT_OPTIONS,
    );
    expect(result.output).toContain('(555) 987-6543');
  });

  it('extracts plain dashed number', () => {
    const result = extractPhoneNumbers(
      'Call 555-123-4567',
      PHONE_NUMBER_EXTRACTOR_DEFAULT_OPTIONS,
    );
    expect(result.output).toContain('555-123-4567');
  });

  it('deduplicates by phone digits', () => {
    const result = extractPhoneNumbers(
      '+1 555 123 4567 and +15551234567',
      PHONE_NUMBER_EXTRACTOR_DEFAULT_OPTIONS,
    );
    const stat = result.stats?.find((s) => s.label === 'Potential phone numbers');
    expect(stat?.value).toBe(1);
  });

  it('reports zero when none found', () => {
    const result = extractPhoneNumbers(
      'no phones here',
      PHONE_NUMBER_EXTRACTOR_DEFAULT_OPTIONS,
    );
    expect(result.output).toBe('');
    const stat = result.stats?.find((s) => s.label === 'Potential phone numbers');
    expect(stat?.value).toBe(0);
  });

  it('preserves order by default', () => {
    const result = extractPhoneNumbers(
      'First +1 555 111 1111 then +1 555 222 2222',
      PHONE_NUMBER_EXTRACTOR_DEFAULT_OPTIONS,
    );
    const lines = result.output.split('\n');
    expect(lines[0]).toContain('555 111 1111');
    expect(lines[1]).toContain('555 222 2222');
  });

  it('handles multiple numbers in one line', () => {
    const result = extractPhoneNumbers(
      'Call +1 555 111 1111 or +1 555 222 2222',
      PHONE_NUMBER_EXTRACTOR_DEFAULT_OPTIONS,
    );
    const stat = result.stats?.find((s) => s.label === 'Potential phone numbers');
    expect(stat?.value).toBe(2);
  });

  it('uses "potential" wording in message', () => {
    const result = extractPhoneNumbers(
      '+1 555 123 4567',
      PHONE_NUMBER_EXTRACTOR_DEFAULT_OPTIONS,
    );
    expect(result.message).toMatch(/potential/i);
  });
});
