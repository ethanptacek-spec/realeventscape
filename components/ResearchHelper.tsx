"use client";

import { FormEvent, useState } from "react";

import { getResearchSummary } from "@/lib/feedback";

export function ResearchHelper() {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState<string[]>(getResearchSummary(""));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResults(getResearchSummary(topic));
  }

  return (
    <section id="research" className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Research Helper</h2>
            <p className="mt-2 text-sm text-slate-600">
              Quickly surface credible facts and context to support your bill. Search by topic to view curated data points
              and tips for sourcing additional evidence.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 md:flex-row">
              <input
                type="text"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                placeholder="Enter a topic (e.g., environment, education, transportation)"
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
              >
                Generate insights
              </button>
            </form>
            <p className="mt-3 text-xs text-slate-500">
              BillBuddy shares high-level guidance. Always verify statistics before publication.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Research Highlights</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {results.map((result, index) => (
                <li key={`${result}-${index}`} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary"></span>
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
