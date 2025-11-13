const categories = [
  {
    name: "Environment",
    description: "Sustainability, clean energy, and conservation initiatives",
    examples: [
      {
        title: "An Act to Retrofit State Facilities with Renewable Energy",
        highlights: [
          "Establishes a five-year LED and solar installation schedule",
          "Creates a state sustainability task force with student advisors",
          "Allocates funds through energy performance contracts"
        ]
      },
      {
        title: "An Act to Expand Green Schoolyards",
        highlights: [
          "Provides grants for permeable playground materials",
          "Partners with local environmental nonprofits for maintenance",
          "Measures success via stormwater runoff reduction"
        ]
      }
    ]
  },
  {
    name: "Education",
    description: "Academic access, curriculum, and student services",
    examples: [
      {
        title: "An Act to Provide Open Educational Resources",
        highlights: [
          "Requires districts to adopt free digital textbooks when available",
          "Funds teacher professional development for OER creation",
          "Reports annual cost savings back to the legislature"
        ]
      },
      {
        title: "An Act to Expand Career Exploration",
        highlights: [
          "Creates regional internship consortiums for rural schools",
          "Offers transportation stipends for low-income participants",
          "Collects program metrics in a public-facing dashboard"
        ]
      }
    ]
  },
  {
    name: "Public Health",
    description: "Wellness, nutrition, and safety measures",
    examples: [
      {
        title: "An Act to Increase School-Based Mental Health Staffing",
        highlights: [
          "Sets a counselor-to-student ratio aligned with ASCA standards",
          "Funds telehealth licenses for districts with provider shortages",
          "Requires annual impact reporting to the Department of Health"
        ]
      },
      {
        title: "An Act to Expand Naloxone Access in Schools",
        highlights: [
          "Mandates overdose response training for staff and student leaders",
          "Provides grants for secure on-campus naloxone storage",
          "Coordinates with local EMS agencies for restocking"
        ]
      }
    ]
  }
];

export function ExampleLibrary() {
  return (
    <section id="examples" className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-6 text-center">
          <h2 className="text-2xl font-semibold text-slate-900">Example Library</h2>
          <p className="mx-auto max-w-3xl text-sm text-slate-600">
            Learn from successful Youth in Government bills. Browse by focus area to see how others structured arguments,
            backed claims, and formatted their legislation.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {categories.map((category) => (
            <article
              key={category.name}
              className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-slate-900">{category.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{category.description}</p>
              <div className="mt-4 space-y-4">
                {category.examples.map((example) => (
                  <div key={example.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <h4 className="text-sm font-semibold text-primary">{example.title}</h4>
                    <ul className="mt-2 space-y-1 text-xs text-slate-600">
                      {example.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
