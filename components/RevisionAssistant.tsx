"use client";

import { useMemo, useState } from "react";

import { generateFeedback } from "@/lib/feedback";
import { sections } from "@/lib/sections";
import type { BillDraft } from "@/lib/types";

interface RevisionAssistantProps {
  draft: BillDraft;
}

export function RevisionAssistant({ draft }: RevisionAssistantProps) {
  const [selectedSectionId, setSelectedSectionId] = useState<(typeof sections)[number]["id"] | "overall">(
    "overall"
  );

  const feedback = useMemo(() => generateFeedback(draft), [draft]);

  const filteredFeedback = feedback.filter((item) =>
    selectedSectionId === "overall" ? item.sectionId !== "overall" : item.sectionId === selectedSectionId
  );

  const overallNotes = feedback.filter((item) => item.sectionId === "overall");

  const completionMessage = feedback.length === 0 ? (
    <p className="text-sm text-accent-700">
      Fantastic! Your bill meets all structural checks. Share it with an advisor to gather personalized guidance.
    </p>
  ) : null;

  return (
    <section id="revision" className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-semibold text-slate-900">AI Revision Assistant</h2>
              <p className="mt-2 text-sm text-slate-600">
                BillBuddy scans your draft for clarity, tone, structure, and missing evidence. Choose a section to view
                targeted suggestions.
              </p>
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
                      <li key={`${item.sectionId}-${item.type}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{item.type}</p>
                        <p className="mt-1 text-sm text-slate-700">{item.message}</p>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {filteredFeedback.length > 0 ? (
                  <ul className="mt-4 space-y-4">
                    {filteredFeedback.map((item, index) => (
                      <li key={`${item.sectionId}-${item.type}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{item.type}</p>
                        <p className="mt-1 text-sm text-slate-700">{item.message}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm text-slate-600">
                    No feedback for this section yet. Continue refining other areas or preview your formatted bill.
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
