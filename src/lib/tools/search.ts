import type { ToolDefinition } from './types';

export interface ToolSearchDocument {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  keywords: string[];
  searchText: string;
}

export function buildSearchDocuments(tools: ToolDefinition[]): ToolSearchDocument[] {
  return tools.map((tool) => {
    const parts = [
      tool.name,
      tool.shortDescription,
      tool.description,
      ...tool.keywords,
      ...(tool.searchIntents ?? []),
    ];
    return {
      slug: tool.slug,
      name: tool.name,
      category: tool.category,
      shortDescription: tool.shortDescription,
      keywords: tool.keywords,
      searchText: parts.join(' ').toLocaleLowerCase(),
    };
  });
}

/** Fast client-side search over prebuilt documents. */
export function searchTools(documents: ToolSearchDocument[], query: string): ToolSearchDocument[] {
  const q = query.trim().toLocaleLowerCase();
  if (!q) return documents;

  const terms = q.split(/\s+/u).filter(Boolean);

  return documents
    .map((doc) => {
      let score = 0;
      const nameLower = doc.name.toLocaleLowerCase();
      if (nameLower === q) score += 100;
      if (nameLower.includes(q)) score += 40;
      if (doc.slug.includes(q.replace(/\s+/g, '-'))) score += 30;
      for (const term of terms) {
        if (doc.searchText.includes(term)) score += 10;
        if (nameLower.includes(term)) score += 15;
      }
      return { doc, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.doc.name.localeCompare(b.doc.name))
    .map((item) => item.doc);
}
