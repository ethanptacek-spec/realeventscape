"use client";

import { useMemo, useState } from "react";

import { generateFeedback, type FeedbackItem } from "@/lib/feedback";
import { sections } from "@/lib/sections";
import type { BillDraft } from "@/lib/types";

interface RevisionAssistantProps {
  draft: BillDraft;
}

interface FeedbackResponseBody {
  source: "openai" | "rule-based";
  feedback: FeedbackItem[];
  error?: string;
}

export function RevisionAssistant({ draft }: RevisionAssistantProps) {
  const [selectedSectionId, setSelectedSectionId] = useState<(typeof sections)[number]["id"] | "overall">(
    "overall"
  );
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [source, setSource] = useState<"openai" | "rule-based" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredFeedback = useMemo(
    () =>
      feedback.filter((item) =>
        selectedSectionId === "overall" ? item.sectionId !== "overall" : item.sectionId === selectedSectionId
      ),
    [feedback, selectedSectionId]
  );

  const overallNotes = useMemo(() => feedback.filter((item) => item.sectionId === "overall"), [feedback]);

  const completionMessage = feedback.length === 0 && source ? (
    <p className="text-sm text-accent-700">
      Fantastic! Your bill meets all structural checks. Share it with an advisor to gather personalized guidance.
    </p>
  ) : null;

  async function handleAnalyze() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft })
      });

      const payload = (await response.json()) as FeedbackResponseBody;

      if (!response.ok || !payload?.feedback) {
        throw new Error(payload?.error || "Unable to analyze the bill at this time.");
      }

      setFeedback(payload.feedback);
      setSource(payload.source);
    } catch (requestError) {
      console.error(requestError);
      setError(requestError instanceof Error ? requestError.message : "Unexpected error");
      const fallback = generateFeedback(draft);
      setFeedback(fallback);
      setSource("rule-based");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="revision" className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-semibold text-slate-900">AI Revision Assistant</h2>
              <p className="mt-2 text-sm text-slate-600">
                BillBuddy scans your draft for clarity, tone, structure, and missing evidence. Choose a section to view targeted
                suggestions.
              </p>
              <button
                type="button"
                onClick={handleAnalyze}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isLoading}
              >
                {isLoading ? "Analyzing..." : "Analyze draft with AI"}
              </button>
              <p className="mt-3 text-xs text-slate-500">
                {source === "openai"
                  ? "Powered by OpenAI—perfect for final polishing."
                  : source === "rule-based"
                  ? "Using offline checklists for quick validation."
                  : "Run the analysis whenever you're ready."}
              </p>
              {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
              <div className="mt-6 grid gap-2 text-sm">
                <button
                  type="button"
                  onClick={() => setSelectedSectionId("overall")}
                  className={`rounded-xl border px-4 py-2 text-left font-semibold transition ${
                    selectedSectionId === "overall"
                      ? "border-primary bg-primary text-white"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-primary/50"
                  }`}
                >
                  Overall feedback
                </button>
                {sections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setSelectedSectionId(section.id)}
                    className={`rounded-xl border px-4 py-2 text-left transition ${
                      selectedSectionId === section.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-slate-200 bg-white text-slate-600 hover:border-primary/50"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:w-2/3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-slate-900">Suggestions</h3>
                {completionMessage}
                {selectedSectionId === "overall" && overallNotes.length > 0 ? (
                  <ul className="mt-4 space-y-4">
                    {overallNotes.map((item, index) => (
                      <li
                        key={`${item.sectionId}-${item.type}-${index}`}
                        className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{item.type}</p>
                        <p className="mt-1 text-sm text-slate-700">{item.message}</p>
                        {item.suggestion ? (
                          <p className="mt-2 rounded-xl bg-white/50 p-3 text-xs text-slate-600">
                            <span className="font-semibold text-primary">Try this:</span> {item.suggestion}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {filteredFeedback.length > 0 ? (
                  <ul className="mt-4 space-y-4">
                    {filteredFeedback.map((item, index) => (
                      <li
                        key={`${item.sectionId}-${item.type}-${index}`}
                        className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{item.type}</p>
                        <p className="mt-1 text-sm text-slate-700">{item.message}</p>
                        {item.suggestion ? (
                          <p className="mt-2 rounded-xl bg-white/50 p-3 text-xs text-slate-600">
                            <span className="font-semibold text-primary">Try this:</span> {item.suggestion}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm text-slate-600">
                    {source
                      ? "No feedback for this section yet. Continue refining other areas or preview your formatted bill."
                      : "Run the AI analysis to unlock tailored revision tips for each section."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
