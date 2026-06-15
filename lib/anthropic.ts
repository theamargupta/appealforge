/**
 * AI generation layer. Calls Claude when ANTHROPIC_API_KEY is set; otherwise (or on any
 * failure) falls back to the deterministic template so the tool always returns a result.
 * Rule 3: this is the data/logic layer — the API route and UI never import the SDK directly.
 */

import Anthropic from "@anthropic-ai/sdk";
import { buildTemplateAppeal } from "@/lib/appeal-template";
import { APPEAL_SYSTEM_PROMPT, buildAppealUserPrompt } from "@/lib/prompt";
import type { AppealInput, AppealResult } from "@/types/appeal";

// Tier → model mapping lives ONLY here (server-side). The client sends a tier
// ("standard" | "enhanced") and never sees a model name.
// Standard = Haiku 4.5 (fast, ~1/3 the output cost). Enhanced = Sonnet 4.6 (more detailed).
const MODEL_BY_TIER: Record<string, string> = {
  standard: process.env.ANTHROPIC_MODEL_STANDARD ?? "claude-haiku-4-5",
  enhanced: process.env.ANTHROPIC_MODEL_ENHANCED ?? "claude-sonnet-4-6",
};

// Max output tokens. A one-page appeal letter + key points fits comfortably under this;
// it's a safety cap, not the cost driver (you're billed for tokens actually generated).
const MAX_TOKENS = 1500;

/**
 * Strip Markdown emphasis the model may emit (**bold**, *italic*, # headings, `code`).
 * The letter is plain text — these markers render as literal asterisks in the PDF.
 */
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/`{1,3}/g, "")
    .replace(/\*\*/g, "")
    .replace(/(^|[\s(])[*_]([^\s*_])/g, "$1$2");
}

function parseModelJson(raw: string): { letter: string; keyPoints: string[] } | null {
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "");
  try {
    const parsed = JSON.parse(cleaned) as { letter?: unknown; keyPoints?: unknown };
    if (typeof parsed.letter !== "string" || !parsed.letter.trim()) return null;
    const keyPoints = Array.isArray(parsed.keyPoints)
      ? parsed.keyPoints.filter((p): p is string => typeof p === "string")
      : [];
    return { letter: parsed.letter, keyPoints };
  } catch {
    return null;
  }
}

export async function generateAppeal(input: AppealInput): Promise<AppealResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // No key configured — return the offline template (still genuinely useful).
    return buildTemplateAppeal(input);
  }

  const model = MODEL_BY_TIER[input.tier] ?? MODEL_BY_TIER.standard;

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model,
      max_tokens: MAX_TOKENS,
      system: APPEAL_SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildAppealUserPrompt(input) }],
    });

    const text = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("");

    const parsed = parseModelJson(text);
    if (!parsed) {
      // Model returned unparseable output — degrade gracefully rather than 500.
      console.error("[generateAppeal] model returned unparseable JSON; using template", {
        insurer: input.insurer,
        preview: text.slice(0, 200),
      });
      return buildTemplateAppeal(input);
    }

    return {
      letter: stripMarkdown(parsed.letter),
      keyPoints: (parsed.keyPoints.length ? parsed.keyPoints : buildTemplateAppeal(input).keyPoints).map(
        stripMarkdown,
      ),
      source: "ai",
    };
  } catch (error) {
    console.error("[generateAppeal] Claude request failed; using template fallback", {
      insurer: input.insurer,
      model,
      error: error instanceof Error ? error.message : String(error),
    });
    return buildTemplateAppeal(input);
  }
}
