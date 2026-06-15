"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import type { AppealInput } from "@/types/appeal";

/** Prefill from the appeal the user just generated, if available. */
interface LeadFormProps {
  context?: Pick<AppealInput, "insurer" | "procedure" | "denialReason">;
}

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm({ context }: LeadFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = new FormData(e.currentTarget);
    const payload = {
      fullName: String(form.get("fullName") ?? ""),
      email: String(form.get("email") ?? ""),
      caseSummary: String(form.get("caseSummary") ?? ""),
      insurer: context?.insurer,
      procedure: context?.procedure,
      denialReason: context?.denialReason,
      wantsExpertHelp: true,
      consent: form.get("consent") === "on",
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      track({ name: "lead_submit", params: { wants_expert_help: true } });
      setStatus("success");
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-800">
        <strong>Thanks — we&apos;ve received your request.</strong> A specialist will review your
        denial and reach out by email. Meanwhile, your generated letter is ready to download above.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="font-bold text-slate-900">Want an expert to handle your appeal?</h3>
      <p className="mt-1 text-sm text-slate-500">
        Get a free review of your denial from a patient-advocacy specialist. No obligation.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input
          name="fullName"
          required
          placeholder="Full name"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email address"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
        />
      </div>
      <textarea
        name="caseSummary"
        rows={2}
        placeholder="Briefly, what was denied? (optional)"
        className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
      />

      <label className="mt-3 flex items-start gap-2 text-xs text-slate-500">
        <input type="checkbox" name="consent" required className="mt-0.5" />
        <span>I agree to be contacted about my appeal and accept the privacy disclaimer.</span>
      </label>

      {status === "error" && <p className="mt-3 text-sm text-red-600">{message}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Request a free review"}
      </button>
    </form>
  );
}
