"use client";

import { FormEvent, useState } from "react";

import { getResearchFallback, type ResearchResult } from "@/lib/research";

interface ResearchResponseBody {
  source: "openai" | "fallback";
  result: ResearchResult;
  error?: string;
}

export function ResearchHelper() {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState<ResearchResult>(getResearchFallback(""));
  const [source, setSource] = useState<"openai" | "fallback">("fallback");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTopic = topic.trim();
    if (!trimmedTopic) {
      setResults(getResearchFallback(""));
      setSource("fallback");
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic: trimmedTopic })
      });

      const payload = (await response.json()) as ResearchResponseBody;

      if (!response.ok || !payload?.result) {
        throw new Error(payload?.error || "Unable to fetch research insights.");
      }

      setResults(payload.result);
      setSource(payload.source);
    } catch (apiError) {
      console.error(apiError);
      setError(apiError instanceof Error ? apiError.message : "Unexpected error");
      const fallback = getResearchFallback(trimmedTopic);
      setResults(fallback);
      setSource("fallback");
    } finally {
      setIsLoading(false);
    }
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
                className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Generate insights"}
              </button>
            </form>
            <div className="mt-3 space-y-2 text-xs text-slate-500">
              <p>BillBuddy shares high-level guidance. Always verify statistics before publication.</p>
              <p className="font-semibold text-primary">
                {source === "openai" ? "Powered by the OpenAI API." : "Using offline research templates."}
              </p>
              {error ? <p className="text-red-600">{error}</p> : null}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Research Highlights</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {results.highlights.map((result, index) => (
                <li key={`${result}-${index}`} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary"></span>
                  <span>{result}</span>
                </li>
              ))}
            </ul>
            {results.sources.length > 0 ? (
              <div className="mt-6 space-y-3 text-sm">
                <p className="text-sm font-semibold text-slate-900">Suggested sources</p>
                <ul className="space-y-3">
                  {results.sources.map((sourceItem) => (
                    <li key={sourceItem.url} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <a
                        href={sourceItem.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary underline-offset-4 hover:underline"
                      >
                        {sourceItem.title}
                      </a>
                      <p className="mt-1 text-xs text-slate-600">{sourceItem.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
