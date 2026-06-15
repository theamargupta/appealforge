/**
 * Single source of truth for site-wide constants.
 * Rule 4 (change-one-thing-in-one-place): brand, URLs, analytics IDs, ad/affiliate
 * config and form option lists all live here. Nothing below is hardcoded elsewhere.
 *
 * All public IDs are read from env so the same build deploys to any environment.
 * Sensible non-secret defaults keep the app runnable with zero config.
 */

export const siteConfig = {
  name: "AppealForge",
  shortName: "AppealForge",
  tagline: "Free AI Insurance Denial Appeal Letter Generator",
  description:
    "Turn a health-insurance denial into a strong, evidence-based appeal letter in minutes. " +
    "Free AI tool — paste your denial reason, get a citation-ready appeal letter you can download as a PDF.",
  // Used for canonical URLs, sitemap, robots and JSON-LD. Override in production.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://appealforge.vercel.app").replace(/\/$/, ""),
  locale: "en_US",
  twitter: "@amarguptta",
} as const;

/** E-E-A-T author block — Google rewards a real, qualified author on YMYL (health/finance) topics. */
export const author = {
  name: "Amar Gupta",
  role: "AI-Powered Full Stack Developer & Technical Consultant",
  url: "https://amargupta.tech",
  email: "theamargupta.tech@gmail.com",
  sameAs: [
    "https://github.com/theamargupta",
    "https://www.linkedin.com/in/amar-gupta-2684a1157/",
    "https://amargupta.tech",
  ],
} as const;

/** Analytics + monetization identifiers. Replace placeholders in Vercel env vars. */
export const integrations = {
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "", // e.g. G-XXXXXXXXXX
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "", // Search Console token
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "", // ca-pub-XXXXXXXXXXXXXXXX
} as const;

export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
} as const;

/** Top-nav + footer links (also the internal-linking backbone). */
export const navLinks = [
  { href: "/", label: "Appeal Generator" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
] as const;

/** Common US health insurers — powers the form datalist (autocomplete, not a hard list). */
export const insurers = [
  "UnitedHealthcare",
  "Aetna",
  "Cigna",
  "Anthem Blue Cross Blue Shield",
  "Humana",
  "Kaiser Permanente",
  "Centene",
  "Molina Healthcare",
  "Medicare",
  "Medicaid",
] as const;

/** Denial reasons drive the prompt strategy and the fallback letter's argument. */
export const denialReasons = [
  { value: "not_medically_necessary", label: "Not medically necessary" },
  { value: "experimental", label: "Experimental / investigational" },
  { value: "out_of_network", label: "Out of network" },
  { value: "prior_auth", label: "No prior authorization" },
  { value: "not_covered", label: "Service not covered by plan" },
  { value: "coding_error", label: "Billing / coding error" },
  { value: "step_therapy", label: "Step therapy not completed" },
  { value: "other", label: "Other / not sure" },
] as const;

export type DenialReasonValue = (typeof denialReasons)[number]["value"];

/**
 * Affiliate placements (Rule: revenue config centralized).
 * Replace `url` with real affiliate/referral links before launch.
 */
export const affiliateResources = [
  {
    name: "Patient advocacy & claims help",
    blurb: "Get a professional advocate to handle a complex or high-value denial for you.",
    url: "https://example.com/advocate?ref=appealforge",
    cta: "Find an advocate",
  },
  {
    name: "Health insurance comparison",
    blurb: "Shopping for a better plan after a denial? Compare marketplace options.",
    url: "https://example.com/compare?ref=appealforge",
    cta: "Compare plans",
  },
  {
    name: "Medical bill negotiation",
    blurb: "Already billed? Tools that negotiate medical bills down on your behalf.",
    url: "https://example.com/negotiate?ref=appealforge",
    cta: "Negotiate my bill",
  },
] as const;
