"use client";

import { affiliateResources } from "@/config/site";
import { track } from "@/lib/analytics";

/** Affiliate placements. Each click fires an `affiliate_click` GA4 event for revenue attribution. */
export function AffiliateResources() {
  return (
    <section aria-labelledby="resources-heading" className="mt-12">
      <p className="eyebrow text-accent">Helpful resources</p>
      <h2 id="resources-heading" className="mt-2 text-lg font-bold text-foreground">
        Need more help?
      </h2>
      <p className="mt-1 text-sm text-subtle">
        Independent services that can help with your denial. We may earn a commission.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {affiliateResources.map((r) => (
          <a
            key={r.name}
            href={r.url}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={() => track({ name: "affiliate_click", params: { resource: r.name } })}
            className="flex flex-col rounded-lg border border-line bg-paper p-4 transition hover:border-accent/40"
          >
            <span className="font-semibold text-foreground">{r.name}</span>
            <span className="mt-1 flex-1 text-sm text-subtle">{r.blurb}</span>
            <span className="mt-3 text-sm font-semibold text-accent">{r.cta} →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
