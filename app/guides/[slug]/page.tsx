import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "@/lib/guides";
import { Faq } from "@/components/Faq";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { articleLd, breadcrumbLd, faqLd } from "@/lib/jsonld";

type Params = { slug: string };

// Pre-render every guide at build time.
export function generateStaticParams(): Params[] {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide not found" };

  return {
    title: guide.metaTitle,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      type: "article",
      title: guide.metaTitle,
      description: guide.description,
      url: `/guides/${guide.slug}`,
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = guide.related.map(getGuide).filter((g) => g !== undefined);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd
        data={[
          articleLd({
            title: guide.title,
            description: guide.description,
            path: `/guides/${guide.slug}`,
            datePublished: guide.datePublished,
          }),
          faqLd(guide.faqs),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: guide.title, path: `/guides/${guide.slug}` },
          ]),
        ]}
      />

      {/* Breadcrumb (visible) */}
      <nav className="text-xs text-slate-400">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/guides" className="hover:text-blue-600">
          Guides
        </Link>
      </nav>

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">{guide.title}</h1>
      <p className="mt-2 text-sm text-slate-400">{guide.readingTime}</p>

      {/* Body */}
      <div className="mt-6 space-y-5">
        {guide.blocks.map((block, i) => (
          <div key={i}>
            {block.heading && (
              <h2 className="mt-6 text-xl font-bold text-slate-900">{block.heading}</h2>
            )}
            {block.paragraphs?.map((p, j) => (
              <p key={j} className="mt-2 leading-relaxed text-slate-700">
                {p}
              </p>
            ))}
            {block.list && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                {block.list.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* CTA back to the tool (internal link + conversion) */}
      <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
        <h2 className="text-lg font-bold text-slate-900">Ready to draft your appeal?</h2>
        <p className="mt-1 text-sm text-slate-600">
          Use the free generator to produce a letter for your exact denial in under two minutes.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Open the Appeal Generator →
        </Link>
      </div>

      <AdSlot label="In-article" />

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">FAQ</h2>
        <div className="mt-4">
          <Faq items={guide.faqs} />
        </div>
      </section>

      {/* Related guides — internal linking */}
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">Related guides</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r!.slug}
                href={`/guides/${r!.slug}`}
                className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm"
              >
                <span className="font-semibold text-slate-900">{r!.title}</span>
                <span className="mt-1 block text-sm text-slate-500">{r!.description}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
