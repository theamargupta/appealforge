/**
 * Deterministic offline fallback (Rule 5: the AI call can fail / no key — always
 * return something useful). Produces a solid, reason-specific appeal letter without
 * any network call, so the demo works with zero configuration.
 */

import { denialReasons } from "@/config/site";
import type { AppealInput, AppealResult } from "@/types/appeal";

const REASON_ARGUMENT: Record<string, string> = {
  not_medically_necessary:
    "The requested service is medically necessary. My treating physician has determined it is the appropriate, evidence-based standard of care for my condition, and deferring it risks avoidable harm and higher downstream costs.",
  experimental:
    "The denial classifies the service as experimental or investigational. This service is recognized and routinely provided as accepted medical practice for my diagnosis, and my physician can supply supporting documentation.",
  out_of_network:
    "Adequate in-network access was not available for this service in a clinically appropriate timeframe, so out-of-network care was necessary and should be covered at the in-network benefit level.",
  prior_auth:
    "The care was urgent and/or prior authorization was reasonably pursued. A retroactive authorization is warranted given the medical circumstances documented by my provider.",
  not_covered:
    "Please re-review my plan's Summary of Benefits and Coverage. The service falls within covered benefits, and the denial appears to rest on an overly narrow reading of the policy.",
  coding_error:
    "This denial appears to stem from a billing or coding error rather than a coverage decision. Please re-adjudicate the claim with the corrected codes from my provider.",
  step_therapy:
    "The step-therapy requirement should be waived. The previously required medications are contraindicated, ineffective, or were already tried, as my physician can document.",
  other:
    "I respectfully request a full re-review of this decision. The denial does not reflect the medical facts of my case, which my treating physician can substantiate.",
};

function reasonLabel(value: string): string {
  return denialReasons.find((r) => r.value === value)?.label ?? "the stated reason";
}

export function buildTemplateAppeal(input: AppealInput): AppealResult {
  const argument = REASON_ARGUMENT[input.denialReason] ?? REASON_ARGUMENT.other;

  const keyPoints = [
    `Formal first-level appeal of ${input.insurer}'s denial for "${input.procedure}".`,
    `Directly rebuts the stated reason: ${reasonLabel(input.denialReason)}.`,
    "Asserts your right to appeal under the ACA and ERISA.",
    "Requests a written decision within 30 days and preserves external-review rights.",
  ];

  const letter = [
    "[Your Full Name]",
    "[Your Address]",
    "[City, State ZIP]",
    "[Phone]  |  [Email]",
    "",
    "[Date]",
    "",
    `${input.insurer}`,
    "Attn: Appeals Department",
    "[Insurer Address]",
    "",
    `Re: Appeal of Denied Claim — ${input.procedure}`,
    "Member Name: [Your Name]   Member ID: [Member ID]",
    "Claim / Reference Number: [Claim Number]   Date of Service: [Date]",
    "",
    "To the Appeals Department:",
    "",
    `I am writing to formally appeal the denial of coverage for ${input.procedure}, ` +
      `which was denied on the basis of "${reasonLabel(input.denialReason)}." ` +
      "I respectfully request that you reverse this determination and approve coverage.",
    "",
    argument,
    "",
    input.denialDetails
      ? `Additional context relevant to my case: ${input.denialDetails}`
      : "My treating physician supports this appeal and can provide medical records, a letter of medical necessity, and supporting documentation upon request.",
    "",
    "Under the Affordable Care Act and applicable ERISA regulations, I am entitled to a full " +
      "and fair review of this claim. I request that a qualified medical professional with the " +
      "appropriate expertise review this appeal.",
    "",
    "Please provide a written decision within 30 days of receipt. If this appeal is denied, I " +
      "intend to pursue my right to an independent external review.",
    "",
    "Thank you for your prompt attention to this matter.",
    "",
    "Sincerely,",
    "[Your Signature]",
    `${input.patientName}`,
    "",
    "Enclosures: [Letter of medical necessity], [Relevant medical records], [Copy of denial letter]",
  ].join("\n");

  return { letter, keyPoints, source: "template" };
}
