export type ToolCategory =
  | 'cleaning'
  | 'transformation'
  | 'analysis'
  | 'extraction'
  | 'comparison'
  | 'web-developer'
  | 'special';

export const TOOL_CATEGORY_LABELS: Record<ToolCategory, string> = {
  cleaning: 'Cleaning',
  transformation: 'Transformation',
  analysis: 'Analysis',
  extraction: 'Extraction',
  comparison: 'Comparison',
  'web-developer': 'Web & Developer',
  special: 'Special',
};

export interface ToolStat {
  label: string;
  value: string | number;
}

export interface ToolProcessResult {
  output: string;
  stats?: ToolStat[];
  message?: string;
}

export interface ToolExample {
  title: string;
  input: string;
  output: string;
  optionsNote?: string;
}

export interface ToolFaq {
  question: string;
  answer: string;
}

export type ToolOptionControl =
  | {
      type: 'checkbox';
      key: string;
      label: string;
      description?: string;
      defaultValue: boolean;
    }
  | {
      type: 'select';
      key: string;
      label: string;
      description?: string;
      defaultValue: string;
      choices: Array<{ value: string; label: string }>;
    }
  | {
      type: 'text';
      key: string;
      label: string;
      description?: string;
      defaultValue: string;
      placeholder?: string;
    };

export interface ToolDefinition {
  slug: string;
  name: string;
  category: ToolCategory;
  description: string;
  shortDescription: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Single-input processor. Provide this OR processDual, not both. */
  process?: (input: string, options: Record<string, unknown>) => ToolProcessResult;
  /** Dual-input processor for comparison tools (e.g. text-diff). */
  processDual?: (inputA: string, inputB: string, options: Record<string, unknown>) => ToolProcessResult;
  options: ToolOptionControl[];
  defaultOptions: Record<string, unknown>;
  relatedTools: string[];
  examples: ToolExample[];
  faq: ToolFaq[];
  howToSteps: string[];
  useCases: string[];
  dualInput?: boolean;
  actionLabel?: string;
  supportsDownload?: boolean;
  searchIntents?: string[];
}
