import { NextResponse } from "next/server";

import { generateFeedback, type FeedbackItem } from "@/lib/feedback";
import { getOpenAIClient } from "@/lib/openai";
import { createFeedbackMessages } from "@/lib/prompts";
import type { BillDraft } from "@/lib/types";

interface FeedbackPayload {
  draft: BillDraft;
}

export async function POST(request: Request) {
  let body: FeedbackPayload;
  try {
    body = (await request.json()) as FeedbackPayload;
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (!body?.draft) {
    return NextResponse.json({ error: "Missing bill draft." }, { status: 400 });
  }

  const fallbackFeedback = generateFeedback(body.draft);

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ source: "rule-based", feedback: fallbackFeedback } satisfies {
      source: "rule-based";
      feedback: FeedbackItem[];
    });
  }

  try {
    const client = getOpenAIClient();
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: createFeedbackMessages(body.draft),
      temperature: 0.2
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Empty response from OpenAI");
    }

    const cleaned = content.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(cleaned) as FeedbackItem[];
    const sanitized = Array.isArray(parsed) ? parsed.filter((item) => item?.sectionId && item?.message) : [];

    if (sanitized.length === 0) {
      throw new Error("No actionable feedback from OpenAI");
    }

    return NextResponse.json({ source: "openai", feedback: sanitized } satisfies {
      source: "openai";
      feedback: FeedbackItem[];
    });
  } catch (error) {
    console.error("AI feedback error", error);
    return NextResponse.json({
      source: "rule-based" as const,
      feedback: fallbackFeedback,
      error: error instanceof Error ? error.message : "AI request failed"
    });
  }
}
