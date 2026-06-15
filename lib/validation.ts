/**
 * Boundary validation (Rule 5: every input can be invalid — validate at the edge).
 * Pure functions, no framework deps, so they're trivially testable and reusable
 * across the API routes and the client forms.
 */

import type { AppealInput, LeadInput } from "@/types/appeal";

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: string[] };

const MAX_TEXT = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateAppealInput(body: unknown): ValidationResult<AppealInput> {
  const errors: string[] = [];
  const b = (body ?? {}) as Record<string, unknown>;

  const insurer = str(b.insurer);
  const procedure = str(b.procedure);
  const denialReason = str(b.denialReason);
  const denialDetails = str(b.denialDetails);

  if (!insurer) errors.push("Insurer is required.");
  if (!procedure) errors.push("Procedure or service is required.");
  if (!denialReason) errors.push("A denial reason is required.");
  if (denialDetails.length > MAX_TEXT)
    errors.push(`Denial details must be under ${MAX_TEXT} characters.`);

  if (errors.length) return { ok: false, errors };

  return {
    ok: true,
    value: {
      patientName: str(b.patientName) || "[Your Name]",
      insurer,
      procedure,
      denialReason: denialReason as AppealInput["denialReason"],
      planType: str(b.planType) || "Commercial / employer plan",
      denialDetails,
    },
  };
}

export function validateLeadInput(body: unknown): ValidationResult<LeadInput> {
  const errors: string[] = [];
  const b = (body ?? {}) as Record<string, unknown>;

  const fullName = str(b.fullName);
  const email = str(b.email);

  if (!fullName) errors.push("Name is required.");
  if (!email || !EMAIL_RE.test(email)) errors.push("A valid email is required.");
  if (b.consent !== true) errors.push("Consent is required to contact you.");

  if (errors.length) return { ok: false, errors };

  return {
    ok: true,
    value: {
      fullName,
      email,
      insurer: str(b.insurer) || undefined,
      procedure: str(b.procedure) || undefined,
      denialReason: str(b.denialReason) || undefined,
      caseSummary: str(b.caseSummary).slice(0, MAX_TEXT) || undefined,
      wantsExpertHelp: b.wantsExpertHelp === true,
      consent: true,
    },
  };
}
