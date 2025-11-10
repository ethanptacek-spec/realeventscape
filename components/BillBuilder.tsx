"use client";

import { useMemo, useState } from "react";

import { sections } from "@/lib/sections";
import type { BillDraft } from "@/lib/types";

interface BillBuilderProps {
  draft: BillDraft;
  onDraftChange: (draft: BillDraft) => void;
}

export function BillBuilder({ draft, onDraftChange }: BillBuilderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentStep = sections[currentIndex];

  const completion = useMemo(() => {
    const filled = sections.filter((section) => draft[section.id].trim().length > 0).length;
    return Math.round((filled / sections.length) * 100);
  }, [draft]);

  return (
    <section id="builder" className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900">Bill Builder</h2>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {completion}% complete
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Follow the guided steps to ensure your bill includes every required section.
              Save your progress by exporting the outline at any time.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {sections.map((section, index) => {
                const isActive = index === currentIndex;
                const isComplete = draft[section.id].trim().length > 0;
                return (
                  <button
                    key={section.id}
                    type="button"
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                      isActive
                        ? "border-primary bg-primary text-white"
                        : isComplete
                        ? "border-accent/60 bg-accent/10 text-accent-700"
                        : "border-slate-200 bg-white text-slate-500 hover:border-primary/40"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    {section.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 rounded-2xl bg-white p-6 shadow-inner">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Current step</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">{currentStep.label}</h3>
              <p className="mt-2 text-sm text-slate-600">{currentStep.prompt}</p>
              <textarea
                className="mt-4 h-48 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 shadow-sm focus:border-primary focus:outline-none"
                value={draft[currentStep.id]}
                onChange={(event) =>
                  onDraftChange({ ...draft, [currentStep.id]: event.target.value })
                }
                placeholder="Start drafting this section..."
              />
              <div className="mt-4 flex justify-between text-xs text-slate-500">
                <button
                  type="button"
                  onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
                  className="rounded-full border border-slate-200 px-3 py-1 font-semibold text-slate-600 transition hover:border-primary/60 hover:text-primary"
                  disabled={currentIndex === 0}
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex((index) => Math.min(sections.length - 1, index + 1))
                  }
                  className="rounded-full border border-primary bg-primary px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-primary/90"
                  disabled={currentIndex === sections.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <BuilderSummary draft={draft} />
        </div>
      </div>
    </section>
  );
}

function BuilderSummary({ draft }: { draft: BillDraft }) {
  const missing = sections.filter((section) => draft[section.id].trim().length === 0);
  const readyToShare = missing.length === 0;

  return (
    <aside className="space-y-6">
      <div className="rounded-3xl border border-primary/30 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Completion checklist</h3>
        <p className="mt-2 text-sm text-slate-600">
          BillBuddy automatically verifies that every required section is present before
          you export or share your bill draft.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          {sections.map((section) => {
            const complete = draft[section.id].trim().length > 0;
            return (
              <li key={section.id} className="flex items-center gap-2">
                <span
                  className={`inline-flex h-2 w-2 rounded-full ${
                    complete ? "bg-accent" : "bg-slate-300"
                  }`}
                ></span>
                <span className={complete ? "text-slate-700" : "text-slate-400"}>{section.label}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4 text-sm text-slate-600">
          {readyToShare ? (
            <p>
              Great work! Every section is filled in. Use the revision assistant next to
              polish tone, clarity, and persuasive impact.
            </p>
          ) : (
            <p>
              Complete the remaining sections highlighted above so advisors know your bill is
              ready for review.
            </p>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-primary/10 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Tips for stronger sections</h3>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li>
            <strong className="text-slate-700">Lead with outcomes:</strong> State the positive change your bill
            delivers in the first two sentences.
          </li>
          <li>
            <strong className="text-slate-700">Use formal language:</strong> Replace casual verbs ("make sure") with
            precise directives ("shall ensure").
          </li>
          <li>
            <strong className="text-slate-700">Cite sources:</strong> Reference credible statistics or agencies to
            support fiscal and enforcement details.
          </li>
        </ul>
      </div>
    </aside>
  );
}
