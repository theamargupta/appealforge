"use client";

import { useEffect } from "react";
import { integrations } from "@/config/site";

interface AdSlotProps {
  /** AdSense ad unit slot id. */
  slot?: string;
  label?: string;
}

/**
 * AdSense display slot. When NEXT_PUBLIC_ADSENSE_CLIENT is set it renders a real
 * <ins class="adsbygoogle">; otherwise it renders a clearly-marked placeholder so the
 * ad placement is visible in the demo without a live AdSense account.
 */
export function AdSlot({ slot = "0000000000", label = "Advertisement" }: AdSlotProps) {
  const client = integrations.adsenseClient;

  useEffect(() => {
    if (!client) return;
    try {
      // adsbygoogle is injected at runtime by the AdSense script.
      const w = window as unknown as { adsbygoogle: Array<Record<string, unknown>> };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      // AdSense not ready / blocked — non-critical.
    }
  }, [client]);

  if (!client) {
    return (
      <div className="my-8 grid h-24 place-items-center rounded-xl border border-dashed border-slate-300 bg-slate-100 text-xs font-medium uppercase tracking-wide text-slate-400">
        Ad slot — {label} (configure NEXT_PUBLIC_ADSENSE_CLIENT)
      </div>
    );
  }

  return (
    <div className="my-8">
      <p className="mb-1 text-center text-[10px] uppercase tracking-wide text-slate-400">{label}</p>
      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
