# SEO Migration Plan

**Last Updated:** September 2025

## Migration Safety Assessment

**Risk Level: LOW**

No historical production URLs have been confirmed in this repository. This is an early-stage/pre-launch site. The current URL structure is clean and logical.

---

## Current URL Structure

All tools use flat `/slug` URLs with no subdirectories:

```
/                           → Homepage
/about                      → About page
/contact                    → Contact page
/privacy                    → Privacy policy
/terms                      → Terms of use
/text-cleaner               → Text Cleaner tool
/word-counter               → Word Counter tool
/character-counter          → Character Counter tool
/text-statistics            → Text Statistics tool
/reading-time               → Reading Time Calculator tool
/readability-checker         → Readability Checker tool
/keyword-counter             → Keyword Counter tool
/keyword-density             → Keyword Density Calculator tool
/add-line-numbers           → Add Line Numbers tool
/add-prefix-suffix          → Add Prefix/Suffix tool
/sort-text                  → Sort Text tool
/text-to-one-line            → Text to One Line tool
/case-converter              → Case Converter tool
/find-and-replace           → Find & Replace tool
/text-diff                  → Text Diff tool
/compare-two-lquares         → Compare Two Lists tool
/email-extractor            → Email Extractor tool
/url-extractor               → URL Extractor tool
/phone-number-extractor       → Phone Number Extractor tool
```

---

## URL Preservation Rules

1. **Do not rename existing tool URLs** — All current `/slug` URLs are clean, descriptive, and established.
2. **All new tool pages must follow the `/slug` convention** — Use kebab-case, descriptive names.
3. **If a URL must change**, implement a permanent 301 redirect from old URL to new URL.
4. **Never redirect unrelated URLs to the homepage** — This dilutes crawl budget and confuses users.
5. **Never create redirect chains** — Each redirect should point directly to the final destination.

---

## Planned URL Changes

### No changes currently planned

The existing URL structure is clean and SEO-friendly. No URL changes are required at this time.

---

## New Tool Pages (URL Additions)

The following new tool pages will be created (these are additions, not changes):

| New URL | Tool | Reason |
|---------|------|--------|
| `/json-formatter` | JSON Formatter | Referenced in POPULAR_TOOL_SLUGS and url-extractor relatedTools |
| `/json-validator` | JSON Validator | Companion to JSON Formatter |
| `/html-to-text` | HTML to Text | Web developer tool, referenced in product concept |
| `/remove-extra-spaces` | Remove Extra Spaces | Referenced in POPULAR_TOOL_SLUGS and text-cleaner relatedTools |
| `/remove-line-breaks` | Remove Line Breaks | Referenced in POPULAR_TOOL_SLUGS and text-cleaner relatedTools |
| `/invisible-character-detector` | Invisible Character Detector | Referenced in POPULAR_TOOL_SLUGS |

---

## Redirect Reference Table

If any URLs change in the future, record them here:

| OLD URL | NEW URL | REDIRECT TYPE | REASON |
|---------|---------|--------------|--------|
| — | — | — | — |

---

## Migration Checklist

- [ ] No existing URLs require changes
- [ ] New URLs follow `/slug` kebab-case convention
- [ ] Internal links updated to use new URLs
- [ ] Canonical URLs updated for changed URLs
- [ ] Sitemap updated for new/changed URLs
- [ ] 301 redirects implemented for any changed URLs
- [ ] No redirect chains created
- [ ] No unrelated URLs redirected to homepage
