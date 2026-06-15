import { NextResponse } from "next/server";
import { generateAppeal } from "@/lib/anthropic";
import { validateAppealInput } from "@/lib/validation";

// Anthropic SDK requires the Node.js runtime (not edge).
export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const validated = validateAppealInput(body);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.errors.join(" ") }, { status: 400 });
  }

  try {
    const result = await generateAppeal(validated.value);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    // generateAppeal already falls back internally; this guards against anything unexpected.
    console.error("[/api/generate] unexpected failure", {
      insurer: validated.value.insurer,
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { error: "We couldn't generate your appeal right now. Please try again." },
      { status: 500 },
    );
  }
}
