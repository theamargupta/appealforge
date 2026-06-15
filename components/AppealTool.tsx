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
        className="rounded-lg border border-line bg-paper p-6"
      >
        <p className="eyebrow text-accent">Input</p>
        <h2 className="mt-1 text-lg font-bold text-foreground">Generate your appeal letter</h2>
        <p className="mt-1 text-sm text-subtle">
          Free. No signup. Your details are used only to draft the letter.
        </p>

        {/* Quick-start: auto-fill the form with a realistic example */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-subtle">Try a sample:</span>
          {appealSamples.map((sample) => (
            <button
              key={sample.label}
              type="button"
              onClick={() => fillSample(sample)}
              className="rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-semibold text-accent transition hover:border-accent/50"
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
          <span className="mb-1 block text-sm font-medium text-foreground">Detail level</span>
          <div className="inline-flex rounded-md border border-line p-0.5">
            {generationTiers.map((t) => {
              const active = input.tier === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => update("tier", t.value)}
                  aria-pressed={active}
                  className={`rounded px-3 py-1.5 text-sm font-medium transition ${
                    active ? "bg-ink text-paper" : "text-subtle hover:bg-muted"
                  }`}
                >
                  {t.label}
                  <span className={active ? "text-paper/50" : "text-subtle/70"}> · {t.hint}</span>
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-md bg-accent px-4 py-3 text-sm font-semibold text-ink transition hover:bg-accent/90 disabled:opacity-60"
        >
          {loading ? "Drafting your appeal…" : "Generate appeal letter"}
        </button>
      </form>

      {/* ---- Result ---- */}
      <div className="rounded-lg border border-line bg-paper p-6">
        {!result && !loading && (
          <div className="flex h-full min-h-64 flex-col items-center justify-center text-center text-subtle">
            <p className="eyebrow text-line">Output</p>
            <p className="mt-3 max-w-xs text-sm">
              Your appeal letter will appear here. Fill in the form and click{" "}
              <span className="font-medium text-foreground">Generate</span>.
            </p>
          </div>
        )}

        {loading && (
          <div className="flex h-full min-h-64 animate-pulse flex-col items-center justify-center text-subtle">
            <p className="eyebrow text-accent">Output</p>
            <p className="mt-3 text-sm">Drafting a tailored appeal for your denial…</p>
          </div>
        )}

        {result && (
          <div>
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow text-accent">Output</p>
                <h2 className="mt-1 text-lg font-bold text-foreground">Your appeal letter</h2>
              </div>
              <span className="eyebrow rounded-full bg-muted px-2 py-1 text-subtle">
                {result.source === "ai" ? "AI-generated" : "Template"}
              </span>
            </div>

            {result.keyPoints.length > 0 && (
              <ul className="mt-3 space-y-1 rounded-md bg-accent-soft p-3 text-sm text-foreground">
                {result.keyPoints.map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 flex gap-2">
              <button
                onClick={handleDownload}
                className="flex-1 rounded-md bg-ink px-3 py-2 text-sm font-semibold text-paper transition hover:bg-ink/85"
              >
                ⬇ Download PDF
              </button>
              <button
                onClick={handleCopy}
                className="rounded-md border border-line px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="mt-4 max-h-80 overflow-auto rounded-md border border-line bg-muted p-4">
              <div className="letter-body text-foreground">{result.letter}</div>
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
  "w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-soft";

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
      <span className="mb-1 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      {children}
    </label>
  );
}
