"use client";

import { affiliateResources } from "@/config/site";
import { track } from "@/lib/analytics";

/** Affiliate placements. Each click fires an `affiliate_click` GA4 event for revenue attribution. */
export function AffiliateResources() {
  return (
    <section aria-labelledby="resources-heading" className="mt-12">
      <h2 id="resources-heading" className="text-lg font-bold text-slate-900">
        Helpful resources
      </h2>
      <p className="mt-1 text-sm text-slate-500">
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
            className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm"
          >
            <span className="font-semibold text-slate-900">{r.name}</span>
            <span className="mt-1 flex-1 text-sm text-slate-500">{r.blurb}</span>
            <span className="mt-3 text-sm font-semibold text-blue-600">{r.cta} →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
