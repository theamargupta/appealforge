import { NextResponse } from "next/server";
import { getSupabase, LEADS_TABLE } from "@/lib/supabase";
import { validateLeadInput } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const validated = validateLeadInput(body);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.errors.join(" ") }, { status: 400 });
  }

  const lead = validated.value;
  const supabase = getSupabase();

  // Not configured (e.g. local without env): log and accept so the flow still works.
  if (!supabase) {
    console.warn("[/api/lead] Supabase not configured — lead not persisted", {
      email: lead.email,
    });
    return NextResponse.json({ ok: true, persisted: false }, { status: 200 });
  }

  const { error } = await supabase.from(LEADS_TABLE).insert({
    full_name: lead.fullName,
    email: lead.email,
    insurer: lead.insurer ?? null,
    procedure: lead.procedure ?? null,
    denial_reason: lead.denialReason ?? null,
    case_summary: lead.caseSummary ?? null,
    wants_expert_help: lead.wantsExpertHelp,
    consent: lead.consent,
    source: "appealforge",
    user_agent: request.headers.get("user-agent")?.slice(0, 300) ?? null,
  });

  if (error) {
    console.error("[/api/lead] insert failed", { email: lead.email, error: error.message });
    return NextResponse.json(
      { error: "We couldn't save your request. Please try again or email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, persisted: true }, { status: 200 });
}
