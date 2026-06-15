/** Builds the Claude prompt for the appeal generator. Pure string logic, no SDK deps. */

import { denialReasons } from "@/config/site";
import type { AppealInput } from "@/types/appeal";

function reasonLabel(value: string): string {
  return denialReasons.find((r) => r.value === value)?.label ?? "Other";
}

export const APPEAL_SYSTEM_PROMPT = [
  "You are an expert US health-insurance appeals specialist and patient advocate.",
  "You write formal, persuasive, factually grounded first-level appeal letters that cite the",
  "patient's right to appeal under the Affordable Care Act and ERISA, request a specific",
  "remedy, and reference medical-necessity standards.",
  "",
  "Rules:",
  "- Output a complete, ready-to-send letter. Use clear placeholders in [BRACKETS] for anything",
  "  the user did not provide (dates, member ID, claim number, physician name).",
  "- Be specific to the stated denial reason. Do NOT invent medical facts, study citations,",
  "  or policy clause numbers — speak in general, true terms the patient can verify.",
  "- Professional, firm, respectful tone. No emojis.",
  "- Close by requesting a written response within 30 days and noting the right to external review.",
].join("\n");

export function buildAppealUserPrompt(input: AppealInput): string {
  return [
    "Write a first-level insurance appeal letter using these details:",
    `- Patient: ${input.patientName}`,
    `- Insurer: ${input.insurer}`,
    `- Plan type: ${input.planType}`,
    `- Service / procedure denied: ${input.procedure}`,
    `- Stated denial reason: ${reasonLabel(input.denialReason)}`,
    input.denialDetails
      ? `- Additional context from the patient: ${input.denialDetails}`
      : "- Additional context from the patient: (none provided)",
    "",
    "Return your answer as a JSON object with exactly two keys:",
    '  "keyPoints": an array of 3-5 short strings summarising the strongest arguments,',
    '  "letter": the full appeal letter as a single string (use \\n for line breaks).',
    "Return ONLY the JSON object, no markdown fences, no commentary.",
  ].join("\n");
}
