import { describe, expect, it } from 'vitest';
import { extractEmails, EMAIL_EXTRACTOR_DEFAULT_OPTIONS } from '../../src/lib/tools/email-extractor';

describe('extractEmails', () => {
  it('handles empty input', () => {
    const result = extractEmails('', EMAIL_EXTRACTOR_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
    expect(result.message).toMatch(/paste/i);
  });

  it('extracts a single email', () => {
    const result = extractEmails('Contact: hello@example.com', EMAIL_EXTRACTOR_DEFAULT_OPTIONS);
    expect(result.output).toBe('hello@example.com');
  });

  it('extracts multiple emails', () => {
    const result = extractEmails(
      'Email a@b.com or c@d.org',
      EMAIL_EXTRACTOR_DEFAULT_OPTIONS,
    );
    expect(result.output).toContain('a@b.com');
    expect(result.output).toContain('c@d.org');
  });

  it('deduplicates emails by default', () => {
    const result = extractEmails(
      'a@b.com and a@b.com again',
      EMAIL_EXTRACTOR_DEFAULT_OPTIONS,
    );
    expect(result.output).toBe('a@b.com');
    const uniqueStat = result.stats?.find((s) => s.label === 'Unique emails');
    expect(uniqueStat?.value).toBe(1);
  });

  it('deduplicates case-insensitively', () => {
    const result = extractEmails(
      'A@B.COM and a@b.com',
      EMAIL_EXTRACTOR_DEFAULT_OPTIONS,
    );
    expect(result.output).toBe('A@B.COM');
  });

  it('preserves order by default', () => {
    const result = extractEmails(
      'first@test.com then second@test.com',
      EMAIL_EXTRACTOR_DEFAULT_OPTIONS,
    );
    expect(result.output).toBe('first@test.com\nsecond@test.com');
  });

  it('handles emails with dots and subdomains', () => {
    const result = extractEmails(
      'user.name@sub.domain.example.com',
      EMAIL_EXTRACTOR_DEFAULT_OPTIONS,
    );
    expect(result.output).toBe('user.name@sub.domain.example.com');
  });

  it('ignores non-email patterns', () => {
    const result = extractEmails('not an email @invalid', EMAIL_EXTRACTOR_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
  });

  it('handles Unicode without crashing', () => {
    const result = extractEmails('name-café@domain.com 日本語 text', EMAIL_EXTRACTOR_DEFAULT_OPTIONS);
    expect(result.output).toContain('name-café@domain.com');
  });

  it('reports zero when no emails found', () => {
    const result = extractEmails('no emails here', EMAIL_EXTRACTOR_DEFAULT_OPTIONS);
    expect(result.output).toBe('');
    const foundStat = result.stats?.find((s) => s.label === 'Emails found');
    expect(foundStat?.value).toBe(0);
  });

  it('returns no emails when deduplicate is off but all are the same', () => {
    const result = extractEmails('a@b.com a@b.com', {
      ...EMAIL_EXTRACTOR_DEFAULT_OPTIONS,
      deduplicate: false,
    });
    const lines = result.output.split('\n');
    expect(lines.length).toBe(2);
  });
});
