import type { Metadata } from "next";
import Link from "next/link";
import { author, siteConfig } from "@/config/site";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About",
  description: `Who builds ${siteConfig.name}, how the AI appeal generator works, and the important disclaimer about using it.`,
  alternates: { canonical: "/about" },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: author.name,
  url: author.url,
  jobTitle: author.role,
  email: `mailto:${author.email}`,
  sameAs: author.sameAs,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd
        data={[personLd, breadcrumbLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])]}
      />

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
        About {siteConfig.name}
      </h1>

      <p className="mt-4 leading-relaxed text-slate-700">
        {siteConfig.name} is a free tool that helps patients respond to health insurance denials.
        Insurers deny a meaningful share of claims, and many are overturned on appeal — but writing
        a strong appeal letter is intimidating. This tool turns a few details about your denial into
        a formal, structured appeal letter you can review, download, and send.
      </p>

      <h2 className="mt-8 text-xl font-bold text-slate-900">How it works</h2>
      <p className="mt-2 leading-relaxed text-slate-700">
        You provide your insurer, the denied service, and the stated denial reason. An AI model
        drafts a letter built around your specific reason and your appeal rights under the
        Affordable Care Act and ERISA. We don&apos;t store the details you enter into the generator —
        the letter is created on the fly and stays with you.
      </p>

      <h2 className="mt-8 text-xl font-bold text-slate-900">Who built this</h2>
      <p className="mt-2 leading-relaxed text-slate-700">
        Built by{" "}
        <a href={author.url} className="font-semibold text-blue-600 hover:underline" rel="author">
          {author.name}
        </a>
        , an {author.role.toLowerCase()} specializing in AI-powered web applications and LLM
        integration. You can find more at{" "}
        <a href={author.url} className="text-blue-600 hover:underline">
          amargupta.tech
        </a>
        .
      </p>

      <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
        <strong>Important disclaimer.</strong> {siteConfig.name} provides general information and
        document-drafting assistance only. It is not legal, medical, or insurance advice, and using
        it does not create an attorney–client or advisor relationship. Always review your letter and
        your options with a qualified professional before acting.
      </div>

      <div className="mt-8">
        <Link href="/" className="font-semibold text-blue-600 hover:underline">
          ← Back to the Appeal Generator
        </Link>
      </div>
    </div>
  );
}
