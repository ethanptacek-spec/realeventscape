"use client";

import { useMemo, useState } from "react";

import { BillBuilder } from "@/components/BillBuilder";
import { ExampleLibrary } from "@/components/ExampleLibrary";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ResearchHelper } from "@/components/ResearchHelper";
import { RevisionAssistant } from "@/components/RevisionAssistant";
import { emptyDraft } from "@/lib/sections";
import type { BillDraft } from "@/lib/types";

export default function HomePage() {
  const [draft, setDraft] = useState<BillDraft>(emptyDraft);

  const draftForRevision = useMemo(() => draft, [draft]);

  return (
    <main>
      <Header />
      <Hero />
      <BillBuilder draft={draft} onDraftChange={setDraft} />
      <RevisionAssistant draft={draftForRevision} />
      <ResearchHelper />
      <ExampleLibrary />
      <CallToAction />
      <Footer />
    </main>
  );
}

function CallToAction() {
  return (
    <section className="bg-gradient-to-r from-primary via-primary/90 to-accent py-16 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center">
        <h2 className="text-3xl font-semibold">Ready to launch BillBuddy at your delegation?</h2>
        <p className="max-w-2xl text-sm text-white/80">
          Advisors can onboard their entire delegation in minutes. Track student progress, leave comments, and export
          debate-ready bills for conferences.
        </p>
        <a
          href="mailto:hello@billbuddy.app"
          className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-lg transition hover:bg-slate-100"
        >
          Contact the team
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 py-10 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">BillBuddy</p>
          <p className="mt-1 text-xs text-slate-400">
            Built to support Youth in Government delegates with AI-guided drafting and research assistance.
          </p>
        </div>
        <div className="text-xs text-slate-500">
          © {new Date().getFullYear()} BillBuddy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
