/**
 * Anonymous product analytics types.
 * NEVER include user text, outputs, emails, phones, URLs, JSON, or HTML.
 */
export type AnalyticsEventName =
  | 'tool_view'
  | 'tool_run'
  | 'copy_result'
  | 'download_result'
  | 'related_tool_click'
  | 'tool_search'
  | 'error';

export interface AnalyticsPayload {
  event: AnalyticsEventName;
  tool?: string;
  category?: string;
  meta?: Record<string, string | number | boolean>;
}

/**
 * Stub tracker for V1 foundation.
 * Enabled later via PUBLIC_ANALYTICS_ENABLED + endpoint.
 * Guarantees no text content is accepted by the type system.
 */
export function track(payload: AnalyticsPayload): void {
  if (import.meta.env.PUBLIC_ANALYTICS_ENABLED !== 'true') return;
  // Endpoint wiring lands in the analytics phase.
  void payload;
}
