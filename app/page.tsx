import Link from "next/link";
import { AppealTool } from "@/components/AppealTool";
import { AffiliateResources } from "@/components/AffiliateResources";
import { AdSlot } from "@/components/AdSlot";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { benefits, howItWorksSteps, landingFaqs } from "@/lib/landing-content";
import { guides } from "@/lib/guides";
import { faqLd, howToLd, webApplicationLd } from "@/lib/jsonld";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          webApplicationLd(),
          howToLd("How to appeal a health insurance denial", howItWorksSteps),
          faqLd(landingFaqs),
        ]}
      />

      {/* Hero */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-5xl px-4 pb-14 pt-16 text-center sm:pt-20">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1.5 text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Free · No signup · Powered by AI
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl">
            Turn your insurance <span className="text-accent">denial</span> into a winning appeal.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-subtle">
            Your health insurer denied a claim — but a denial isn&apos;t final. Paste your denial
            reason and get a formal, evidence-based appeal letter in minutes, free to download as a
            PDF.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#tool"
              className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-ink transition hover:bg-accent/90"
            >
              Generate my appeal letter →
            </a>
            <Link
              href="/guides"
              className="rounded-md border border-line px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent/40"
            >
              Read the appeal guides
            </Link>
          </div>

          <dl className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
            <div className="bg-muted px-4 py-3 text-left sm:text-center">
              <dt className="eyebrow text-subtle">Turnaround</dt>
              <dd className="mt-1 font-mono text-sm text-foreground">&lt; 2 minutes</dd>
            </div>
            <div className="bg-muted px-4 py-3 text-left sm:text-center">
              <dt className="eyebrow text-subtle">Appeal window</dt>
              <dd className="mt-1 font-mono text-sm text-foreground">180 days (ACA)</dd>
            </div>
            <div className="bg-muted px-4 py-3 text-left sm:text-center">
              <dt className="eyebrow text-subtle">Output</dt>
              <dd className="mt-1 font-mono text-sm text-foreground">PDF + copy</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* The tool */}
      <section id="tool" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-12">
        <AppealTool />
      </section>

      <div className="mx-auto max-w-5xl px-4">
        <AdSlot label="Top of content" demo />
      </div>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="text-center">
          <p className="eyebrow text-accent">Step by step</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">How it works</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {howItWorksSteps.map((step, i) => (
            <div
              key={step.name}
              className="rounded-lg border border-line bg-paper p-6 transition hover:border-accent/40"
            >
              <div className="font-mono text-sm font-bold text-accent">0{i + 1}</div>
              <h3 className="mt-3 font-semibold text-foreground">{step.name}</h3>
              <p className="mt-1.5 text-sm text-subtle">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why use this — value props */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="text-center">
          <p className="eyebrow text-accent">Why this tool</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Why people use {siteConfig.name}
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-lg border border-line bg-paper p-6 transition hover:border-accent/40"
            >
              <h3 className="font-semibold text-foreground">{b.title}</h3>
              <p className="mt-1.5 text-sm text-subtle">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Guides — internal linking cluster */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow text-accent">Learn more</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Appeal guides</h2>
          </div>
          <Link href="/guides" className="text-sm font-semibold text-accent hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="flex flex-col rounded-lg border border-line bg-paper p-5 transition hover:border-accent/40"
            >
              <span className="eyebrow text-accent">{g.readingTime}</span>
              <span className="mt-2 font-semibold text-foreground">{g.title}</span>
              <span className="mt-1 flex-1 text-sm text-subtle">{g.description}</span>
              <span className="mt-3 text-sm font-semibold text-accent">Read guide →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Competitive positioning */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="rounded-xl border border-line bg-paper p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow text-accent">How we compare</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                The only free, instant, no-account appeal generator
              </h2>
              <p className="mt-2 text-sm text-subtle max-w-xl">
                Claimable charges $50/case and covers only 28 conditions. DoNotPay was fined by the
                FTC in 2025. Counterforce Health is a nonprofit with no PDF export. AppealForge is
                free, handles any denial type, and exports client-side — your data never leaves your
                browser.
              </p>
            </div>
            <Link
              href="/competitive-analysis"
              className="shrink-0 rounded-md border border-accent/40 px-5 py-3 text-sm font-semibold text-accent transition hover:bg-accent/5"
            >
              See full comparison →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Claimable", detail: "$50 / case" },
              { label: "DoNotPay", detail: "FTC fined 2025" },
              { label: "Sheer Health", detail: "App install required" },
              { label: "AppealForge", detail: "Free · instant · private", highlight: true },
            ].map((c) => (
              <div
                key={c.label}
                className={`rounded-lg border px-4 py-3 text-sm ${
                  c.highlight
                    ? "border-accent/40 bg-accent-soft text-accent font-semibold"
                    : "border-line text-subtle"
                }`}
              >
                <div className="font-semibold text-foreground">{c.label}</div>
                <div className="mt-0.5">{c.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate resources */}
      <section className="mx-auto max-w-5xl px-4">
        <AffiliateResources />
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="text-center">
          <p className="eyebrow text-accent">FAQ</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Frequently asked questions
          </h2>
        </div>
        <div className="mt-8">
          <Faq items={landingFaqs} />
        </div>
      </section>
    </>
  );
}
