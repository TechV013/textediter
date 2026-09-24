# Content Guidelines for TextFixer

**Last Updated:** September 2025

This document explains how to write and maintain content for TextFixer tool pages. These guidelines ensure content is useful, accurate, and aligned with SEO best practices without resorting to keyword stuffing or filler.

---

## Content Philosophy

Every piece of content on TextFixer should answer the question: **"Does this help the user accomplish their task?"**

If the answer is no, remove it.

If the answer is yes, keep it.

---

## Tool Page Content Template

Every tool page should include these sections in this approximate order:

### 1. H1 (Page Title)
- Use the exact tool name
- Examples: "Word Counter", "Email Extractor", "Remove Line Breaks"
- Do NOT prefix with "Free Online" or "Best" — the name alone is sufficient

### 2. Meta Title (SEO Title)
- Format: `{Tool Name} — {Value Proposition} | TextFixer`
- Examples:
  - "Word Counter — Count Words and Characters Online | TextFixer"
  - "JSON Formatter — Format JSON Online | TextFixer"
- Max ~60 characters
- Include the primary keyword naturally

### 3. Meta Description
- One to two sentences
- Explain what the tool does and who it's for
- Include primary keyword naturally
- End with a subtle call to action or differentiator
- Examples:
  - "Count words, characters, lines, and paragraphs instantly. Free online word counter with detailed statistics. Perfect for essays, articles, and documents."
  - "Extract email addresses from any text with this free, private online tool. Deduplicate results and copy them in seconds. No signup required."

### 4. Short Description
- One sentence for tool cards and search results
- Focus on the primary benefit
- Example: "Count words, characters, lines, and paragraphs."

### 5. Description (Intro Paragraph)
- 2-3 sentences
- What the tool does, who it's for, what makes TextFixer's version valuable
- Be specific, not generic
- Example: "Count total characters, letters, digits, punctuation, spaces, and line breaks. Get detailed statistics about your text composition."

### 6. How-to Steps
- 3-4 numbered steps
- Keep each step to one clear action
- Example:
  1. Paste or type your text into the input area.
  2. View instant word, character, line, and paragraph counts.
  3. Toggle space counting if needed.

### 7. Examples
- 1-3 examples showing input → output
- Use realistic, varied examples
- Label non-obvious options
- Examples should be genuinely illustrative, not placeholder content

### 8. Common Use Cases
- 3-5 bullet points
- Real-world scenarios, not generic
- Example for Email Extractor:
  - Collecting contact emails from a newsletter or webpage
  - Pulling email addresses from a copied document
  - Cleaning up a contact list exported from a spreadsheet
  - Finding emails in long email threads

### 9. FAQ
- 2-4 questions that users actually ask
- Address common concerns, limitations, accuracy questions
- Be honest about limitations
- Examples:
  - Email Extractor: "Does this verify that the email addresses exist?" — Answer honestly: No.
  - Phone Number Extractor: "Does this verify that the phone numbers are real?" — Answer honestly: No, it only identifies patterns.
  - Keyword Density: "What is a good keyword density percentage?" — Answer honestly and discourage stuffing.

### 10. Related Tools
- 2-4 genuinely related tools
- Links should make navigational sense
- Example for Word Counter: Character Counter, Text Statistics, Reading Time
- Do NOT link unrelated tools just to increase internal linking

---

## Keywords and Search Intents

### Keyword Guidelines
- Include 3-6 relevant keywords per tool
- Keywords should appear naturally in content
- Do NOT repeat the same keyword phrase multiple times artificially
- Target primary + secondary keywords, not every variation

### Search Intents to Capture
- Transactional: "word counter online", "extract emails from text"
- Informational: "how to count words", "what is keyword density"
- Navigational: "text fixer", "textfixer word counter"

---

## What NOT to Write

### Never Write
- "This is the best free online word counter tool on the internet"
- "Trusted by millions of users worldwide"
- Generic filler: "In today's digital age, text processing is more important than ever"
- Fabricated quotes or testimonials
- Fake statistics ("used by 10,000+ writers")
- Duplicate content across pages (even with keyword swaps)
- "Click here to get started" — users already know how to use a text box

### Avoid
- Excessive exclamation marks (!!!!)
- ALL CAPS for emphasis
- Superlatives without evidence ("fastest", "most accurate", "best")
- Keyword stuffing (repeating the same phrase 10 times)
- Thin content padded to hit word counts

---

## Accuracy and Limitations

### Always Be Accurate
- If a tool identifies patterns, say "identifies patterns that look like" not "finds valid emails"
- If a tool does not verify data, say so
- If a score is an estimate, say "estimate" not "accurate score"
- If a tool has limitations for certain formats, document them

### Accuracy Examples

**Email Extractor:**
- Good: "The tool identifies patterns that look like email addresses. It does not send any verification messages or check whether an address is deliverable."
- Bad: "Find all verified email addresses instantly"

**Phone Number Extractor:**
- Good: "The tool identifies text patterns that look like phone numbers. It does not check whether a number is assigned, in service, or reachable."
- Bad: "Find all phone numbers in your text"

**Readability Checker:**
- Good: "The Flesch Reading Ease score is an estimate of text readability based on sentence length and syllable count. It is not a guarantee of actual readability for every reader."
- Bad: "Get your accurate readability score"

**Keyword Density:**
- Good: "Keyword density is calculated as (occurrences / total words) * 100. A typical recommendation is 1-3%. Do not intentionally stuff keywords — it hurts both readability and SEO."
- Bad: "Calculate your keyword density to optimize for SEO"

---

## Adding a New Tool Page

### Step-by-Step

1. **Create the tool definition file** at `src/lib/tools/<tool-name>.definition.ts`
   - Follow the `ToolDefinition` interface exactly
   - Include all fields: slug, name, category, description, shortDescription, seoTitle, metaDescription, keywords, searchIntents, process/processDual, options, defaultOptions, relatedTools, howToSteps, useCases, examples, faq, actionLabel, supportsDownload

2. **Create the page** at `src/pages/<tool-name>.astro`
   - Import the tool definition
   - Wrap with `<ToolLayout tool={...} />`
   - That's it — ToolLayout handles everything else

3. **Import the tool** in `src/lib/tools/registry.ts`
   - Add the import
   - Add the tool to the `tools` array

4. **Add to POPULAR_TOOL_SLUGS** if appropriate
   - Only include tools that actually have a page

5. **Add related tool links** to other relevant tool definitions
   - Keep it to 2-4 relevant tools
   - Verify slugs match actual pages

6. **Test the page**
   - Run `npm run build` and verify the page renders
   - Check that canonical, meta, and schema are correct

---

## Content Review Process

1. Every new tool definition should be reviewed for completeness before merging.
2. Check that examples are realistic and varied.
3. Check that FAQ answers are honest and accurate.
4. Check that relatedTools slugs actually correspond to existing pages.
5. Run SEO validator (when created) to catch missing metadata.

---

## Writing Style

- **Active voice** preferred
- **Short sentences** — aim for 15-25 words average
- **Second person** — "paste your text", "copy the result"
- **Specific over general** — "Count words in an essay" not "process text"
- **No marketing hype** — describe what the tool does, not how "amazing" it is
- **Consistent terminology** — if a feature is called "deduplicate" in options, use "deduplicate" not "remove duplicates" in prose
