/**
 * AI generation layer. Calls Claude when ANTHROPIC_API_KEY is set; otherwise (or on any
 * failure) falls back to the deterministic template so the tool always returns a result.
 * Rule 3: this is the data/logic layer — the API route and UI never import the SDK directly.
 */

import Anthropic from "@anthropic-ai/sdk";
import { buildTemplateAppeal } from "@/lib/appeal-template";
import { APPEAL_SYSTEM_PROMPT, buildAppealUserPrompt } from "@/lib/prompt";
import type { AppealInput, AppealResult } from "@/types/appeal";

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6";

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

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 2000,
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
      letter: parsed.letter,
      keyPoints: parsed.keyPoints.length ? parsed.keyPoints : buildTemplateAppeal(input).keyPoints,
      source: "ai",
    };
  } catch (error) {
    console.error("[generateAppeal] Claude request failed; using template fallback", {
      insurer: input.insurer,
      model: MODEL,
      error: error instanceof Error ? error.message : String(error),
    });
    return buildTemplateAppeal(input);
  }
}
