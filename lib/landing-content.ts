/**
 * Landing-page copy as data. Extracted because the steps + FAQs are consumed twice:
 * once by the UI and once by the HowTo / FAQPage JSON-LD (DRY — define once, render twice).
 */

export const howItWorksSteps = [
  {
    name: "Paste your denial details",
    text: "Enter your insurer, the denied procedure or service, and the reason given in your denial letter.",
  },
  {
    name: "Generate your appeal letter",
    text: "Our AI writes a formal, evidence-based appeal letter tailored to your specific denial reason and your rights under the ACA.",
  },
  {
    name: "Download and send",
    text: "Review the letter, download it as a PDF, add your physician's documentation, and submit it to your insurer.",
  },
];

export const benefits = [
  {
    title: "Built around your denial reason",
    body: "The letter rebuts the exact reason your claim was denied — 'not medically necessary', 'experimental', 'out of network' and more.",
  },
  {
    title: "Cites your real appeal rights",
    body: "References your right to a full and fair review under the Affordable Care Act and ERISA, and your right to external review.",
  },
  {
    title: "Free and instant",
    body: "No signup, no paywall. Get a complete, downloadable appeal letter in under two minutes.",
  },
  {
    title: "Private by design",
    body: "We don't store the details you type into the generator. Your draft is created on the fly and stays with you.",
  },
];

export const landingFaqs = [
  {
    q: "Is the insurance appeal generator really free?",
    a: "Yes. The appeal letter generator is completely free to use — no signup or payment required. You can generate and download as many letters as you need.",
  },
  {
    q: "How long do I have to appeal a denial?",
    a: "Under the Affordable Care Act you generally have 180 days from the date of your denial to file an internal appeal. Urgent medical situations can be expedited.",
  },
  {
    q: "Will an appeal letter actually overturn my denial?",
    a: "A significant share of appealed claims are overturned, particularly when the appeal directly addresses the stated denial reason and includes supporting documentation from your doctor. Results vary by case.",
  },
  {
    q: "Does this replace a lawyer or patient advocate?",
    a: "No. This is a free tool to help you draft a strong first-level appeal. For complex, urgent, or high-value denials, consider a professional patient advocate or attorney.",
  },
  {
    q: "Do you store my medical information?",
    a: "The information you enter into the generator is used only to create your letter and is not saved. If you separately request expert help, we store only the contact details you provide.",
  },
];
