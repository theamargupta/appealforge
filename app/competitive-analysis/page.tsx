import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Competitive Analysis — AppealForge",
  description:
    "How AppealForge compares against Counterforce Health, Claimable, Sheer Health, DoNotPay, and Epic in the AI insurance denial appeal space.",
  alternates: { canonical: "/competitive-analysis" },
};

const MATRIX = [
  {
    company: "AppealForge",
    highlight: true,
    free: "Yes — 100% free",
    ai: "Yes — 2 min",
    pdf: "Yes — client-side",
    model: "B2C",
    revenue: "Ads + lead-gen",
    weakness: "SEO-dependent traffic; trust around lead handoff must be earned",
  },
  {
    company: "Counterforce Health",
    free: "Yes — free",
    ai: "Yes — custom AI",
    pdf: "Letter download",
    model: "B2C",
    revenue: "Non-profit / grants",
    weakness: "Nonprofit model; no PDF, no revenue path, limited scale",
  },
  {
    company: "Claimable",
    free: "No ($50/case)",
    ai: "Yes — bounded LLM",
    pdf: "Internal only",
    model: "B2C + B2B",
    revenue: "Flat fee + pharma partnerships",
    weakness: "Locked to 28 disease states & 90 treatments; paywall blocks most users",
  },
  {
    company: "Sheer Health",
    free: "Freemium",
    ai: "Yes — AI + human",
    pdf: "N/A — app-based",
    model: "B2C",
    revenue: "% of savings or monthly fee",
    weakness: "App install required; broader insurance tool, not appeal-focused",
  },
  {
    company: "DoNotPay",
    free: "No ($20–50/mo)",
    ai: "Yes — chatbot",
    pdf: "Yes",
    model: "B2C",
    revenue: "Subscription SaaS",
    weakness: "FTC order Feb 2025 ($193K fine); generic, low clinical accuracy",
  },
  {
    company: "Epic Denials Assistant",
    free: "No (millions/yr)",
    ai: "Yes — EHR module",
    pdf: "Yes — clinical sync",
    model: "B2B only",
    revenue: "Enterprise licensing",
    weakness: "Zero consumer access; hospital-only gated product",
  },
];

const COMPETITORS = [
  {
    name: "Counterforce Health",
    url: "https://www.counterforcehealth.org",
    badge: "Non-profit — Free",
    badgeColor: "bg-green-100 text-green-800",
    source: "Source: Wikipedia, Axios (Aug 2025), NC Health News (Nov 2025)",
    points: [
      "Founded early 2025 in Durham, North Carolina by a team including Mayo Clinic clinicians.",
      "Free AI tool that reads the patient's denial letter + insurance policy + medical research to draft a customized appeal.",
      "Copies state insurance regulators on every filing to build a public record of insurer denial patterns.",
      "Reports >70% overturn rate in beta; clinical coordinators reported same-day and next-day approvals.",
    ],
    gap: "Nonprofit funding limits scale and product investment. No PDF export, no lead-gen path, and no revenue model to sustain growth. AppealForge solves the same problem with a self-funding ads + lead-gen model.",
  },
  {
    name: "Claimable",
    url: "https://www.getclaimable.com",
    badge: "VC-backed ($10M, Mark Cuban)",
    badgeColor: "bg-purple-100 text-purple-800",
    source: "Source: Bloomberg Apr 2026, PYMNTS.com 2026, InnovationIowa Aug 2025",
    points: [
      "Founded 2023 by physician Warris Bokhari and former VA chief data scientist Zach Veigulis.",
      "AI drafts AND physically submits appeal packets (fax/mail/escalation to executives and journalists) on the patient's behalf.",
      "Bounded LLM trained on insurance law, legal precedents, and medical literature — covers 28 conditions and 90 treatments.",
      "Charges $50 flat per case; free for qualifying patients via pharma manufacturer partnerships (4 pharma deals signed as of 2026).",
      "Reports ~75% denial reversal rate; exploring a class-action litigation arm against payers.",
    ],
    gap: "Covers only 28 disease states — everyday imaging, ER balance bills, dental, minor surgery are out of scope. The $50 paywall blocks users with low-value denials. AppealForge is free and handles any denial type.",
  },
  {
    name: "Sheer Health",
    url: "https://www.sheerhealth.com",
    badge: "Mobile app — 3 yrs old",
    badgeColor: "bg-blue-100 text-blue-800",
    source: "Source: Stateline / NC Health News (Nov 2025), App Store listing",
    points: [
      "Mobile app (iOS + Android) that connects directly to a patient's insurance account.",
      "Tracks incoming claims, verifies bills for errors, handles corrections, resubmissions, and denial appeals.",
      "Freemium: free tier shares a % of money recovered; premium tier charges a small monthly fee.",
      "Uses a hybrid AI + human model — not purely automated.",
    ],
    gap: "Requires app install and insurance account connection — high friction for a one-time urgent appeal. AppealForge works instantly in a browser with no account, no app, no data sharing.",
  },
  {
    name: "DoNotPay",
    url: "https://donotpay.com",
    badge: "FTC order finalized Feb 2025",
    badgeColor: "bg-red-100 text-red-800",
    source: "Source: FTC.gov press release Feb 2025, ABA Journal, Springer Consumer Policy 2025",
    points: [
      "Originally a parking-ticket bot; added a 'Fight Health Insurance Denials' feature among 200+ legal tools.",
      "Subscription model: $20–$50/month for access to all tools — not health-insurance-specific.",
      "FTC order finalized January 16 2025: $193,000 fine, prohibited from claiming AI performs like a real lawyer.",
      "Generates generic template letters; not trained on clinical denial reasons or payer-specific policies.",
    ],
    gap: "A monthly subscription for a one-time urgent task is a terrible UX fit. The FTC settlement damages trust. AppealForge is free, instant, and focused solely on insurance appeals.",
  },
];

const SEO_GAPS = [
  {
    query: '"free tool to write insurance appeal letter"',
    current: "Outdated lists, Reddit threads, no live tool",
    opportunity: "High",
  },
  {
    query: '"medical necessity appeal letter example"',
    current: "Static Word/PDF templates from 2015",
    opportunity: "High",
  },
  {
    query: '"how to appeal Aetna denial for MRI"',
    current: "Generic blog articles, no insurer-specific tool",
    opportunity: "High",
  },
  {
    query: '"not medically necessary appeal letter"',
    current: "Provider toolkits repurposed by consumers",
    opportunity: "High",
  },
  {
    query: '"how to read health insurance EOB"',
    current: "Educational articles, no interactive decoder",
    opportunity: "Medium",
  },
  {
    query: '"insurance appeal letter for experimental treatment"',
    current: "Cancer/rare-disease site guides only",
    opportunity: "Medium",
  },
];

const ADVANTAGES = [
  {
    title: "Zero data footprint",
    body: "PDF generation is fully client-side — patient details never touch a server. This is a hard privacy advantage over Claimable and DoNotPay, which ingest and store medical documents.",
  },
  {
    title: "Unrestricted coverage",
    body: "Claimable covers 28 disease states. AppealForge handles any denial — imaging, ER balance bills, dental, minor surgery, experimental treatments, prior-auth rejections — with no gatekeeping.",
  },
  {
    title: "No paywall, no account",
    body: "DoNotPay charges $36–48/quarter. AppealForge is free. For a one-time urgent task, a subscription is a terrible fit — zero friction is a moat.",
  },
  {
    title: "SEO-first distribution",
    body: "Enterprise tools (Epic, Waystar, AKASA) don't compete for organic traffic — they're sold through hospital sales cycles. The consumer search queries are wide open.",
  },
];

export default function CompetitiveAnalysisPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Header */}
      <div className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
        Assignment research
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
        Competitive Analysis
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
        The AI insurance denial appeal market splits cleanly into three tiers:
        enterprise hospital software (Epic, Waystar, AKASA), consumer tools
        (Claimable, DoNotPay, Fight Health Insurance), and patient advocacy
        services. AppealForge competes only in the consumer tier — and that
        tier has a gaping free-tool gap.
      </p>

      {/* Market tiers */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          {
            tier: "Enterprise",
            desc: "Epic, Waystar, AKASA, Counterforce",
            price: "$10k–$1M+ / yr",
            color: "border-slate-300 bg-slate-50",
            label: "Not your competition",
          },
          {
            tier: "Consumer tools",
            desc: "Counterforce Health, Claimable, Sheer Health, DoNotPay",
            price: "Free → $50/case",
            color: "border-blue-300 bg-blue-50",
            label: "Direct competition",
          },
          {
            tier: "Advocacy services",
            desc: "PAF, AdvoConnection, Medical Cost Advocate",
            price: "Free → 35% of savings",
            color: "border-amber-300 bg-amber-50",
            label: "Lead-gen buyers",
          },
        ].map((t) => (
          <div key={t.tier} className={`rounded-xl border p-5 ${t.color}`}>
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t.label}
            </div>
            <div className="mt-1 text-lg font-bold text-slate-900">{t.tier}</div>
            <div className="mt-1 text-sm text-slate-600">{t.desc}</div>
            <div className="mt-2 text-sm font-semibold text-slate-700">
              {t.price}
            </div>
          </div>
        ))}
      </div>

      {/* Comparison matrix */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">
          Head-to-head comparison
        </h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                {["Company", "Free?", "AI?", "PDF?", "Model", "Revenue", "Key weakness"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-3 py-3 text-left font-semibold text-slate-700"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {MATRIX.map((row, i) => (
                <tr
                  key={row.company}
                  className={
                    row.highlight
                      ? "bg-blue-50 font-semibold"
                      : i % 2 === 0
                      ? "bg-white"
                      : "bg-slate-50"
                  }
                >
                  <td className="px-3 py-3 text-slate-900">{row.company}</td>
                  <td className="px-3 py-3 text-slate-700">{row.free}</td>
                  <td className="px-3 py-3 text-slate-700">{row.ai}</td>
                  <td className="px-3 py-3 text-slate-700">{row.pdf}</td>
                  <td className="px-3 py-3 text-slate-700">{row.model}</td>
                  <td className="px-3 py-3 text-slate-700">{row.revenue}</td>
                  <td className="px-3 py-3 text-slate-600 text-xs">{row.weakness}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          Sources: PYMNTS.com, Tracxn 2026, Dhakal 2024 (ShodhAI), Mello 2025 (Health Affairs). Only verified competitors included.
        </p>
      </section>

      {/* Per-competitor breakdown */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">
          Competitor deep-dives
        </h2>
        <div className="mt-4 space-y-6">
          {COMPETITORS.map((c) => (
            <div
              key={c.name}
              className="rounded-xl border border-slate-200 p-5"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-bold text-slate-900">{c.name}</h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c.badgeColor}`}
                >
                  {c.badge}
                </span>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:underline"
                >
                  {c.url}
                </a>
              </div>
              <div className="mt-1 text-xs text-slate-400">{c.source}</div>
              <ul className="mt-3 space-y-1.5">
                {c.points.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <span className="mt-0.5 shrink-0 text-slate-400">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 rounded-lg bg-green-50 px-4 py-2.5 text-sm text-green-800">
                <strong>AppealForge gap:</strong> {c.gap}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO opportunities */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">
          SEO gaps — queries with no good free tool
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          These high-intent queries rank articles, PDFs, and law firms — not
          interactive tools. AppealForge targets all of them directly.
        </p>
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Search query
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  What ranks now
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Opportunity
                </th>
              </tr>
            </thead>
            <tbody>
              {SEO_GAPS.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="px-4 py-3 font-mono text-xs text-slate-800">
                    {row.query}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.current}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        row.opportunity === "High"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {row.opportunity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* AppealForge advantages */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">
          AppealForge's structural advantages
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {ADVANTAGES.map((a) => (
            <div
              key={a.title}
              className="rounded-xl border border-slate-200 p-5"
            >
              <div className="font-semibold text-slate-900">{a.title}</div>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Revenue model validation */}
      <section className="mt-12 rounded-xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-lg font-bold text-amber-900">
          Lead-gen revenue validation
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-amber-800">
          Patient advocacy firms like{" "}
          <strong>Medical Cost Advocate</strong> (25–35% contingency),{" "}
          <strong>AdvoConnection</strong> ($100–250/hr independent advocates),
          and <strong>Claimable's own pharma-partnership model</strong> all
          confirm there is an established buyer market for warm, qualified
          patient leads. AppealForge's lead-gen model — offering an expert
          review after letter generation — inserts itself at the highest-intent
          moment: a patient who just learned what their appeal needs to say.
        </p>
      </section>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/" className="font-semibold text-blue-600 hover:underline">
          ← Back to the Appeal Generator
        </Link>
      </div>
    </div>
  );
}
