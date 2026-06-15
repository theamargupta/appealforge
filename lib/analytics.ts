/**
 * Typed GA4 event helpers (client-side). Wraps @next/third-parties' sendGAEvent so call
 * sites stay declarative and the full event taxonomy lives in one place (see README event plan).
 * Safe no-op when GA isn't loaded — sendGAEvent just buffers to dataLayer.
 */

import { sendGAEvent } from "@next/third-parties/google";

export type AnalyticsEvent =
  | { name: "appeal_started"; params?: Record<string, never> }
  | { name: "appeal_completed"; params: { source: "ai" | "template" } }
  | { name: "download_pdf"; params?: Record<string, never> }
  | { name: "copy_letter"; params?: Record<string, never> }
  | { name: "lead_submit"; params: { wants_expert_help: boolean } }
  | { name: "affiliate_click"; params: { resource: string } }
  | { name: "guide_view"; params: { slug: string } };

export function track(event: AnalyticsEvent): void {
  try {
    const params = "params" in event && event.params ? event.params : {};
    sendGAEvent("event", event.name, params);
  } catch {
    // Analytics must never break a user flow.
  }
}
