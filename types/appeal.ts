/** Shared domain types for the appeal generator (used by UI, API and logic layers). */

import type { DenialReasonValue } from "@/config/site";

export interface AppealInput {
  patientName: string;
  insurer: string;
  procedure: string;
  denialReason: DenialReasonValue;
  planType: string;
  denialDetails: string;
}

export interface AppealResult {
  /** The full formatted appeal letter, ready to download. */
  letter: string;
  /** Short bullet list of the key arguments used — shown above the letter. */
  keyPoints: string[];
  /** Whether the letter came from the live AI model or the offline template fallback. */
  source: "ai" | "template";
}

export interface LeadInput {
  fullName: string;
  email: string;
  insurer?: string;
  procedure?: string;
  denialReason?: string;
  caseSummary?: string;
  wantsExpertHelp: boolean;
  consent: boolean;
}
