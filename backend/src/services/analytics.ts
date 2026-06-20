import { run } from '../db.js';
import type { AnalyticsEventType } from '../types.js';

export function trackEvent(input: {
  eventType: AnalyticsEventType | string;
  payload?: Record<string, unknown> | string;
  path?: string;
  sessionId?: string;
}): void {
  try {
    run('INSERT INTO analytics_events (event_type, payload, path, session_id) VALUES (?, ?, ?, ?)', [
      input.eventType,
      typeof input.payload === 'string' ? input.payload : JSON.stringify(input.payload || {}),
      input.path || null,
      input.sessionId || null,
    ]);
  } catch (err) {
    console.error('Failed to track event:', err);
  }
}
