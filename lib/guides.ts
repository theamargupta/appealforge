/**
 * Guide content as data (Rule 3: data separated from UI). Drives /guides, /guides/[slug],
 * the sitemap, and the internal-linking topic cluster. `related` slugs build the link graph.
 */

export interface GuideBlock {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  /** <title>/meta description + card copy. */
  metaTitle: string;
  description: string;
  datePublished: string;
  readingTime: string;
  blocks: GuideBlock[];
  faqs: { q: string; a: string }[];
  /** Slugs of related guides — the internal-linking backbone. */
  related: string[];
}

export const guides: Guide[] = [
  {
    slug: "how-to-appeal-a-health-insurance-denial",
    title: "How to Appeal a Health Insurance Denial (Step-by-Step)",
    metaTitle: "How to Appeal a Health Insurance Denial: Step-by-Step Guide (2026)",
    description:
      "A clear, step-by-step guide to appealing a denied health insurance claim — deadlines, what to include in your appeal letter, internal vs. external review, and a free tool to draft it.",
    datePublished: "2026-06-15",
    readingTime: "6 min read",
    blocks: [
      {
        paragraphs: [
          "An insurance denial is not the final word. Insurers overturn a meaningful share of appealed claims, yet most people never appeal. This guide walks through exactly how to do it — and you can use our free AI Appeal Generator to draft your letter in minutes.",
        ],
      },
      {
        heading: "1. Read the denial letter and find the reason",
        paragraphs: [
          "Your denial letter (often called an Explanation of Benefits, or EOB) states a specific reason code — for example, 'not medically necessary', 'experimental', or 'out of network'. The reason determines your strongest argument, so identify it first.",
        ],
      },
      {
        heading: "2. Note your deadline",
        paragraphs: [
          "Under the Affordable Care Act you generally have 180 days from the denial to file an internal appeal. Urgent care cases can be expedited. Mark the deadline immediately — missing it is the most common way appeals fail.",
        ],
      },
      {
        heading: "3. Gather your evidence",
        list: [
          "A copy of the denial letter / EOB",
          "A letter of medical necessity from your treating physician",
          "Relevant medical records and test results",
          "Your plan's Summary of Benefits and Coverage",
        ],
      },
      {
        heading: "4. Write the appeal letter",
        paragraphs: [
          "Your letter should reference your claim number, restate the denial reason, rebut it directly with the medical facts, and request a specific remedy and a written response within 30 days. Our generator produces this structure automatically — you just paste in your details.",
        ],
      },
      {
        heading: "5. Escalate to external review if needed",
        paragraphs: [
          "If the internal appeal is denied, you have the right to an independent external review by a third party not affiliated with your insurer. Their decision is binding on the plan.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long do I have to appeal an insurance denial?",
        a: "Under the ACA you generally have 180 days from the date of the denial to file an internal appeal. Urgent cases can be expedited.",
      },
      {
        q: "Does appealing actually work?",
        a: "Yes — a significant percentage of appealed claims are overturned, especially when the appeal directly addresses the stated denial reason with supporting medical documentation.",
      },
      {
        q: "Do I need a lawyer to appeal?",
        a: "No. Most first-level appeals are handled directly by the patient. For complex or high-value denials, a patient advocate or attorney can help.",
      },
    ],
    related: [
      "appeal-a-not-medically-necessary-denial",
      "insurance-appeal-letter-template",
    ],
  },
  {
    slug: "appeal-a-not-medically-necessary-denial",
    title: "How to Appeal a 'Not Medically Necessary' Denial",
    metaTitle: "Appeal a 'Not Medically Necessary' Insurance Denial (What to Say)",
    description:
      "'Not medically necessary' is the most common denial reason. Here's how to rebut it, what your doctor's letter must say, and how to draft a winning appeal letter for free.",
    datePublished: "2026-06-15",
    readingTime: "5 min read",
    blocks: [
      {
        paragraphs: [
          "'Not medically necessary' is the single most common reason insurers cite when denying care. The good news: it is also one of the most appealable, because it is a medical judgment your own physician can directly contest.",
        ],
      },
      {
        heading: "What 'medically necessary' actually means",
        paragraphs: [
          "Insurers define medical necessity in their policy documents — usually as care that is clinically appropriate, consistent with accepted standards, and not primarily for convenience. Your appeal should show the denied service meets that definition.",
        ],
      },
      {
        heading: "The most important document: the letter of medical necessity",
        paragraphs: [
          "The strongest lever is a letter of medical necessity from your treating physician. It should state your diagnosis, why the service is the appropriate standard of care, what alternatives were considered or tried, and the risk of not proceeding.",
        ],
      },
      {
        heading: "Build the rebuttal",
        list: [
          "Quote the plan's own definition of medical necessity",
          "Show, point by point, how your care meets it",
          "Attach the physician's letter and supporting records",
          "Request review by a specialist in the relevant field",
        ],
      },
      {
        heading: "Draft it automatically",
        paragraphs: [
          "Select 'Not medically necessary' as the denial reason in our free Appeal Generator and it will produce a letter built around this exact argument, ready for you and your doctor to finalize.",
        ],
      },
    ],
    faqs: [
      {
        q: "Who decides if care is medically necessary?",
        a: "The insurer makes the initial determination, but you can appeal it. On appeal you can request that a physician with relevant specialty expertise review the case.",
      },
      {
        q: "What should my doctor's letter include?",
        a: "Your diagnosis, the clinical rationale, alternatives considered, accepted standards of care, and the risk of delaying or denying the treatment.",
      },
    ],
    related: [
      "how-to-appeal-a-health-insurance-denial",
      "insurance-appeal-letter-template",
    ],
  },
  {
    slug: "insurance-appeal-letter-template",
    title: "Insurance Appeal Letter Template (What to Include)",
    metaTitle: "Insurance Appeal Letter Template — Free Example & Generator",
    description:
      "The exact structure of an effective insurance appeal letter, section by section, plus a free generator that fills it in for your specific denial.",
    datePublished: "2026-06-15",
    readingTime: "4 min read",
    blocks: [
      {
        paragraphs: [
          "A good appeal letter is short, specific, and structured. Insurers process thousands of letters — yours should make the reviewer's decision easy. Here is the structure that works.",
        ],
      },
      {
        heading: "The required sections",
        list: [
          "Your contact details and the date",
          "The insurer's appeals department address",
          "A subject line with the service and claim number",
          "Member name, member ID, claim number, date of service",
          "A direct statement that you are appealing, and the remedy you want",
          "A point-by-point rebuttal of the denial reason",
          "A request for a written decision within 30 days",
          "A list of enclosures (medical necessity letter, records, denial copy)",
        ],
      },
      {
        heading: "Tone matters",
        paragraphs: [
          "Be firm, factual, and professional. Avoid emotional language — cite the medical facts and your appeal rights under the ACA and ERISA. Keep it to one page where possible.",
        ],
      },
      {
        heading: "Generate a filled-in version",
        paragraphs: [
          "Rather than starting from a blank template, use our free Appeal Generator: enter your insurer, the service, and the denial reason, and it produces a complete letter using the structure above — then download it as a PDF.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should the appeal letter be one page?",
        a: "Aim for one page where possible. Reviewers handle high volumes, so a focused, well-structured letter with supporting documents attached is more effective than a long one.",
      },
      {
        q: "Can I email my appeal?",
        a: "Follow the method in your denial letter. Many insurers accept mail, fax, or an online portal. Keep proof of submission and the date.",
      },
    ],
    related: [
      "how-to-appeal-a-health-insurance-denial",
      "appeal-a-not-medically-necessary-denial",
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
