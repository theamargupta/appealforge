"use client";

import { useState } from "react";
import { appealSamples, denialReasons, generationTiers, insurers } from "@/config/site";
import { track } from "@/lib/analytics";
import { downloadAppealPdf } from "@/lib/pdf";
import type { AppealInput, AppealResult } from "@/types/appeal";
import { LeadForm } from "@/components/LeadForm";

const EMPTY: AppealInput = {
  patientName: "",
  insurer: "",
  procedure: "",
  denialReason: "not_medically_necessary",
  planType: "",
  denialDetails: "",
  tier: "standard",
};

export function AppealTool() {
  const [input, setInput] = useState<AppealInput>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AppealResult | null>(null);
  const [copied, setCopied] = useState(false);

  function update<K extends keyof AppealInput>(key: K, value: AppealInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  function fillSample(sample: (typeof appealSamples)[number]) {
    setError("");
    setResult(null);
    setInput((prev) => ({
      ...prev, // keep the chosen tier
      patientName: sample.patientName,
      insurer: sample.insurer,
      procedure: sample.procedure,
      denialReason: sample.denialReason,
      planType: sample.planType,
      denialDetails: sample.denialDetails,
    }));
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    track({ name: "appeal_started" });

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "We couldn't generate your appeal. Please try again.");
        return;
      }
      setResult(data as AppealResult);
      track({ name: "appeal_completed", params: { source: (data as AppealResult).source } });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleDownload() {
    if (!result) return;
    downloadAppealPdf({ letter: result.letter, insurer: input.insurer, procedure: input.procedure });
    track({ name: "download_pdf" });
  }

  async function handleCopy() {
    if (!result) return;
    await navigator.clipboard.writeText(result.letter);
    setCopied(true);
    track({ name: "copy_letter" });
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* ---- Input form ---- */}
      <form
        onSubmit={handleGenerate}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-lg font-bold text-slate-900">Generate your appeal letter</h2>
        <p className="mt-1 text-sm text-slate-500">
          Free. No signup. Your details are used only to draft the letter.
        </p>

        {/* Quick-start: auto-fill the form with a realistic example */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-400">Try a sample:</span>
          {appealSamples.map((sample) => (
            <button
              key={sample.label}
              type="button"
              onClick={() => fillSample(sample)}
              className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              {sample.label}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-4">
          <Field label="Your name (optional)">
            <input
              value={input.patientName}
              onChange={(e) => update("patientName", e.target.value)}
              placeholder="Jane Doe"
              className={inputClass}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Insurer" required>
              <input
                list="insurers"
                required
                value={input.insurer}
                onChange={(e) => update("insurer", e.target.value)}
                placeholder="e.g. Aetna"
                className={inputClass}
              />
              <datalist id="insurers">
                {insurers.map((i) => (
                  <option key={i} value={i} />
                ))}
              </datalist>
            </Field>

            <Field label="Plan type (optional)">
              <input
                value={input.planType}
                onChange={(e) => update("planType", e.target.value)}
                placeholder="e.g. PPO, employer plan"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Procedure or service denied" required>
            <input
              required
              value={input.procedure}
              onChange={(e) => update("procedure", e.target.value)}
              placeholder="e.g. MRI of the lumbar spine"
              className={inputClass}
            />
          </Field>

          <Field label="Reason for denial" required>
            <select
              value={input.denialReason}
              onChange={(e) => update("denialReason", e.target.value as AppealInput["denialReason"])}
              className={inputClass}
            >
              {denialReasons.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Anything else from your denial letter? (optional)">
            <textarea
              rows={3}
              value={input.denialDetails}
              onChange={(e) => update("denialDetails", e.target.value)}
              placeholder="Paste the insurer's stated reason or any relevant context."
              className={inputClass}
            />
          </Field>
        </div>

        {/* Detail level — benefit-framed; never exposes the underlying model */}
        <div className="mt-5">
          <span className="mb-1 block text-sm font-medium text-slate-700">Detail level</span>
          <div className="inline-flex rounded-lg border border-slate-300 p-0.5">
            {generationTiers.map((t) => {
              const active = input.tier === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => update("tier", t.value)}
                  aria-pressed={active}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                    active ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {t.label}
                  <span className={active ? "text-blue-100" : "text-slate-400"}> · {t.hint}</span>
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Drafting your appeal…" : "Generate appeal letter"}
        </button>
      </form>

      {/* ---- Result ---- */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {!result && !loading && (
          <div className="flex h-full min-h-64 flex-col items-center justify-center text-center text-slate-400">
            <div className="text-4xl">📄</div>
            <p className="mt-3 max-w-xs text-sm">
              Your appeal letter will appear here. Fill in the form and click{" "}
              <span className="font-medium text-slate-600">Generate</span>.
            </p>
          </div>
        )}

        {loading && (
          <div className="flex h-full min-h-64 animate-pulse flex-col items-center justify-center text-slate-400">
            <p className="text-sm">Drafting a tailored appeal for your denial…</p>
          </div>
        )}

        {result && (
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Your appeal letter</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                {result.source === "ai" ? "AI-generated" : "Template"}
              </span>
            </div>

            {result.keyPoints.length > 0 && (
              <ul className="mt-3 space-y-1 rounded-lg bg-blue-50 p-3 text-sm text-slate-700">
                {result.keyPoints.map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-blue-600">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 flex gap-2">
              <button
                onClick={handleDownload}
                className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                ⬇ Download PDF
              </button>
              <button
                onClick={handleCopy}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="mt-4 max-h-80 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="letter-body text-slate-800">{result.letter}</div>
            </div>

            <div className="mt-6">
              <LeadForm
                context={{
                  insurer: input.insurer,
                  procedure: input.procedure,
                  denialReason: input.denialReason,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {children}
    </label>
  );
}
