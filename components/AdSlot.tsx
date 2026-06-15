"use client";

import { useEffect } from "react";
import { integrations } from "@/config/site";

interface AdSlotProps {
  /** AdSense ad unit slot id. */
  slot?: string;
  label?: string;
  /**
   * When AdSense isn't configured yet, show a realistic dummy ad banner instead of
   * a dashed box. Use for high-visibility slots so the page looks monetized in the demo.
   */
  demo?: boolean;
}

/**
 * AdSense display slot. When NEXT_PUBLIC_ADSENSE_CLIENT is set it renders a real
 * <ins class="adsbygoogle">; otherwise it renders a clearly-marked placeholder so the
 * ad placement is visible in the demo without a live AdSense account.
 */
export function AdSlot({ slot = "0000000000", label = "Advertisement", demo = false }: AdSlotProps) {
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
    // Dummy ad banner (web-hosted) shown until a real AdSense publisher ID is approved.
    if (demo) {
      return (
        <div className="my-8">
          <p className="eyebrow mb-1 text-center text-subtle">Advertisement</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://placehold.co/970x90/f5f0e9/8a8077/png?text=Advertisement+%C2%B7+970%C3%9790"
            alt="Advertisement"
            width={970}
            height={90}
            className="mx-auto h-auto w-full max-w-[970px] rounded-md border border-line"
          />
        </div>
      );
    }
    return (
      <div className="eyebrow my-8 grid h-24 place-items-center rounded-md border border-dashed border-line bg-muted text-subtle">
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
