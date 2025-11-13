"use client";

import { useMemo, useState } from "react";

import { formatBillDraft } from "@/lib/bill";
import { sections } from "@/lib/sections";
import type { BillDraft } from "@/lib/types";

interface BillPreviewProps {
  draft: BillDraft;
}

export function BillPreview({ draft }: BillPreviewProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const formattedBill = useMemo(() => formatBillDraft(draft), [draft]);
  const missingSections = useMemo(
    () => sections.filter((section) => !draft[section.id]?.trim()).map((section) => section.label),
    [draft]
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(formattedBill);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 3000);
    } catch (error) {
      console.error(error);
      setCopyState("error");
    }
  }

  function handleDownload() {
    const blob = new Blob([formattedBill], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "billbuddy-draft.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section id="preview" className="bg-slate-900 py-16 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-lg backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-semibold">Formatted Bill Preview</h2>
              <p className="mt-2 text-sm text-slate-300">
                Review how your bill will appear in a Youth in Government docket. Copy the text or download a shareable
                document for advisors and teammates.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary/90"
                >
                  {copyState === "copied" ? "Copied!" : "Copy to clipboard"}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                >
                  Download .txt
                </button>
              </div>
              {copyState === "error" ? (
                <p className="mt-2 text-xs text-red-300">Copy failed. You can still download the draft as a text file.</p>
              ) : null}
              {missingSections.length > 0 ? (
                <div className="mt-6 rounded-2xl border border-amber-300/40 bg-amber-400/10 p-4 text-xs text-amber-100">
                  <p className="font-semibold">Incomplete sections</p>
                  <p className="mt-1">Fill in: {missingSections.join(", ")}</p>
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-emerald-300/40 bg-emerald-400/10 p-4 text-xs text-emerald-100">
                  <p className="font-semibold">Ready for submission</p>
                  <p className="mt-1">Your bill includes every required section.</p>
                </div>
              )}
            </div>
            <div className="lg:w-2/3">
              <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-slate-950/70 p-6 text-sm leading-relaxed text-slate-100">
                {formattedBill}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
