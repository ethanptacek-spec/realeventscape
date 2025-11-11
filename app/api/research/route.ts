import { NextResponse } from "next/server";

import { getOpenAIClient } from "@/lib/openai";
import { createResearchMessages } from "@/lib/prompts";
import { getResearchFallback, type ResearchResult } from "@/lib/research";

interface ResearchPayload {
  topic: string;
}

export async function POST(request: Request) {
  let body: ResearchPayload;
  try {
    body = (await request.json()) as ResearchPayload;
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const topic = body?.topic?.trim();
  if (!topic) {
    return NextResponse.json({
      source: "fallback" as const,
      result: getResearchFallback("")
    });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ source: "fallback", result: getResearchFallback(topic) });
  }

  try {
    const client = getOpenAIClient();
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: createResearchMessages(topic),
      temperature: 0.2
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("Empty research response");
    }

    const cleaned = content.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(cleaned) as ResearchResult;
    if (!parsed?.highlights || !Array.isArray(parsed.highlights)) {
      throw new Error("Malformed research payload");
    }

    return NextResponse.json({ source: "openai", result: parsed });
  } catch (error) {
    console.error("AI research error", error);
    return NextResponse.json({
      source: "fallback" as const,
      result: getResearchFallback(topic),
      error: error instanceof Error ? error.message : "AI request failed"
    });
  }
}
