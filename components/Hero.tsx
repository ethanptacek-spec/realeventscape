export function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-white to-accent/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-20 md:flex-row md:items-center">
        <div className="md:w-1/2">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Youth in Government</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">
            Draft confident, debate-ready legislation with BillBuddy
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            BillBuddy guides students through every stage of the bill writing journey—
            from structuring sections to refining language and bolstering arguments.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#builder"
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
            >
              Start a new bill
            </a>
            <a
              href="#examples"
              className="rounded-md border border-primary/30 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10"
            >
              Browse examples
            </a>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-primary/10">
            <p className="text-sm font-semibold text-primary">Live guidance</p>
            <p className="mt-2 text-sm text-slate-600">
              BillBuddy highlights missing sections, offers stronger legal language, and
              provides research-backed talking points so delegates can focus on persuasive ideas.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                Guided structure for all required bill sections
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                Formal tone suggestions and clarity improvements
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                Quick access to credible research summaries
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
