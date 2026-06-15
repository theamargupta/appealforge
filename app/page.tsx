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
      <section className="bg-gradient-to-b from-blue-50 to-transparent">
        <div className="mx-auto max-w-5xl px-4 pb-6 pt-14 text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            Free · No signup · Powered by AI
          </span>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Insurance Denial Appeal Letter Generator
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Your health insurer denied a claim — but a denial isn&apos;t final. Paste your denial
            reason and get a formal, evidence-based appeal letter in minutes, free to download as a
            PDF.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <span>✓ Tailored to your denial reason</span>
            <span>✓ Cites your ACA appeal rights</span>
            <span>✓ Download as PDF</span>
          </div>
        </div>
      </section>

      {/* The tool */}
      <section id="tool" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-8">
        <AppealTool />
      </section>

      <div className="mx-auto max-w-5xl px-4">
        <AdSlot label="Top of content" demo />
      </div>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-center text-2xl font-bold text-slate-900">How it works</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {howItWorksSteps.map((step, i) => (
            <div key={step.name} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-blue-600 font-bold text-white">
                {i + 1}
              </div>
              <h3 className="mt-3 font-semibold text-slate-900">{step.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why use this — value props */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-center text-2xl font-bold text-slate-900">
          Why people use {siteConfig.name}
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900">{b.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Guides — internal linking cluster */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Appeal guides</h2>
          <Link href="/guides" className="text-sm font-semibold text-blue-600 hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm"
            >
              <span className="text-xs font-medium uppercase tracking-wide text-blue-600">
                {g.readingTime}
              </span>
              <span className="mt-2 font-semibold text-slate-900">{g.title}</span>
              <span className="mt-1 flex-1 text-sm text-slate-500">{g.description}</span>
              <span className="mt-3 text-sm font-semibold text-blue-600">Read guide →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Affiliate resources */}
      <section className="mx-auto max-w-5xl px-4">
        <AffiliateResources />
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-center text-2xl font-bold text-slate-900">Frequently asked questions</h2>
        <div className="mt-6">
          <Faq items={landingFaqs} />
        </div>
      </section>
    </>
  );
}
