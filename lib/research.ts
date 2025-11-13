import type { BillDraft, BillSectionId } from "./types";

export interface ResearchSource {
  title: string;
  url: string;
  note: string;
}

export interface ResearchResult {
  highlights: string[];
  sources: ResearchSource[];
}

const researchTopics: Record<string, ResearchResult> = {
  environment: {
    highlights: [
      "According to the EPA, outdated HVAC systems in public buildings can waste up to 30% of their energy budgets.",
      "The National Renewable Energy Laboratory reports LED retrofits cut lighting costs by 50-70%."
    ],
    sources: [
      {
        title: "EPA ENERGY STAR Portfolio Manager Data Trends",
        url: "https://www.energystar.gov/buildings/benchmark/understand/portfolio-manager-data-trends",
        note: "Summarizes energy efficiency opportunities for government facilities."
      },
      {
        title: "NREL Solid-State Lighting Research",
        url: "https://www.nrel.gov/lighting/",
        note: "Provides cost-savings insights from LED implementation."
      }
    ]
  },
  education: {
    highlights: [
      "A 2023 NCES study found project-based civic learning improved student policy knowledge by 32%.",
      "States offering youth civic participation grants invest an average of $1.2M annually."
    ],
    sources: [
      {
        title: "NCES Civics Assessment Brief",
        url: "https://nces.ed.gov/",
        note: "Tracks changes in civic knowledge for U.S. students."
      },
      {
        title: "Education Commission of the States Civic Engagement Report",
        url: "https://www.ecs.org/",
        note: "Highlights state-level funding for civic education programs."
      }
    ]
  },
  health: {
    highlights: [
      "The CDC reports adolescent mental health ER visits increased 31% from 2019 to 2021.",
      "Telehealth expansion in rural counties can reduce appointment wait times by up to 45%."
    ],
    sources: [
      {
        title: "CDC Mental Health Emergency Department Visits",
        url: "https://www.cdc.gov/mentalhealth/",
        note: "Provides statistics on youth mental health trends."
      },
      {
        title: "HHS Rural Telehealth Toolkit",
        url: "https://www.ruralhealthinfo.org/toolkits/telehealth",
        note: "Case studies demonstrating telehealth impact in rural communities."
      }
    ]
  },
  transportation: {
    highlights: [
      "USDOT estimates dedicated bus lanes can move three times more riders per hour than mixed traffic lanes.",
      "Regions providing universal student transit passes reported an 18% ridership increase within the first year."
    ],
    sources: [
      {
        title: "USDOT Bus Rapid Transit Guidance",
        url: "https://www.transit.dot.gov/",
        note: "Discusses throughput benefits of dedicated transit lanes."
      },
      {
        title: "Regional Transit Authority Universal Pass Study",
        url: "https://www.apta.com/",
        note: "Summarizes ridership growth from student access programs."
      }
    ]
  }
};

export function getResearchFallback(topic: string): ResearchResult {
  const normalized = topic.trim().toLowerCase();
  const matchingKey = (Object.keys(researchTopics) as Array<keyof typeof researchTopics>).find((key) =>
    normalized.includes(key)
  );

  if (matchingKey) {
    return researchTopics[matchingKey];
  }

  if (!topic) {
    return {
      highlights: ["Enter a topic to receive quick research highlights relevant to your bill."],
      sources: []
    };
  }

  return {
    highlights: [
      `Search local government reports, credible journalism, and academic studies about "${topic}" to gather supporting evidence.`,
      "Focus on recent data (within the last 3 years) and cite agencies or experts when possible."
    ],
    sources: []
  };
}

export interface SectionCoachingSuggestion {
  improvedText: string;
  rationale: string;
}

const sectionTemplates: Partial<Record<BillSectionId, string>> = {
  title: "An Act to ____",
  purpose:
    "The purpose of this bill is to address ____ by ensuring ____ for the citizens of ____ through ____.",
  definitions:
    "For the purposes of this bill, \"____\" shall mean ____ and \"____\" shall mean ____.",
  provisions:
    "1. The Department of ____ shall ____ by ____.\n2. Funding in the amount of ____ shall be allocated to ____.",
  fiscal:
    "The fiscal impact of this legislation is estimated at ____ dollars, sourced from ____ and offset by ____ savings.",
  enforcement:
    "The ____ agency shall enforce these provisions beginning on ____ with penalties of ____ for non-compliance."
};

export function buildSectionCoachFallback(
  sectionId: BillSectionId,
  currentText: string,
  draft: BillDraft
): SectionCoachingSuggestion {
  const template = sectionTemplates[sectionId];
  const normalized = currentText.trim();
  const label = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);

  if (!normalized && template) {
    return {
      improvedText: template,
      rationale: `Start by filling in the blanks of this ${label} template so your advisor can react to concrete language.`
    };
  }

  const reminder =
    sectionId === "provisions"
      ? "Add numbered clauses so delegates can cite specific actions during debate."
      : "Expand this section with formal language and at least two detailed sentences.";

  return {
    improvedText: normalized
      ? `${normalized}\n\nNext, incorporate supporting data or implementation specifics to strengthen this section.`
      : template ?? reminder,
    rationale: reminder
  };
}
