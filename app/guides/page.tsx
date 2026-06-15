import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Insurance Appeal Guides",
  description:
    "Step-by-step guides on appealing health insurance denials — deadlines, medical-necessity denials, appeal letter templates and more.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }])} />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Insurance Appeal Guides
        </h1>
        <p className="mt-3 text-slate-600">
          Practical, plain-English guides to appealing a denied health insurance claim. When
          you&apos;re ready, draft your letter with the{" "}
          <Link href="/" className="font-semibold text-blue-600 hover:underline">
            free appeal generator
          </Link>
          .
        </p>

        <div className="mt-8 space-y-5">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="block rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-sm"
            >
              <span className="text-xs font-medium uppercase tracking-wide text-blue-600">
                {g.readingTime}
              </span>
              <h2 className="mt-1 text-lg font-bold text-slate-900">{g.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{g.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
