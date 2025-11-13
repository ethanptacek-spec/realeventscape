import { NextResponse } from "next/server";

import { getOpenAIClient } from "@/lib/openai";
import { createSectionCoachMessages } from "@/lib/prompts";
import { buildSectionCoachFallback, type SectionCoachingSuggestion } from "@/lib/research";
import type { BillDraft, BillSectionId } from "@/lib/types";

interface CoachPayload {
  sectionId: BillSectionId;
  draft: BillDraft;
  currentText?: string;
}

export async function POST(request: Request) {
  let body: CoachPayload;
  try {
    body = (await request.json()) as CoachPayload;
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (!body?.sectionId || !body?.draft) {
    return NextResponse.json({ error: "Missing section information." }, { status: 400 });
  }

  const fallbackSuggestion = buildSectionCoachFallback(body.sectionId, body.currentText ?? "", body.draft);

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ source: "rule-based", suggestion: fallbackSuggestion });
  }

  try {
    const client = getOpenAIClient();
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: createSectionCoachMessages(body.sectionId, body.currentText ?? "", body.draft),
      temperature: 0.3
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("Empty coaching response");
    }

    const cleaned = content.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(cleaned) as SectionCoachingSuggestion;
    if (!parsed?.improvedText) {
      throw new Error("Malformed coaching payload");
    }

    return NextResponse.json({ source: "openai", suggestion: parsed });
  } catch (error) {
    console.error("AI coach error", error);
    return NextResponse.json({
      source: "rule-based" as const,
      suggestion: fallbackSuggestion,
      error: error instanceof Error ? error.message : "AI request failed"
    });
  }
}
