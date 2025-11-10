import { sections } from "./sections";
import type { BillDraft, BillSectionId } from "./types";

const formalWordPairs: Array<{ casual: RegExp; formal: string }> = [
  { casual: /should/gi, formal: "shall" },
  { casual: /will/gi, formal: "shall" },
  { casual: /make sure/gi, formal: "ensure" },
  { casual: /try to/gi, formal: "endeavor to" }
];

const evidenceKeywords = ["data", "percent", "study", "report", "estimate", "$", "dollar"];

function needsEvidence(sectionId: BillSectionId) {
  return sectionId === "fiscal" || sectionId === "purpose" || sectionId === "provisions";
}

export interface FeedbackItem {
  sectionId: BillSectionId | "overall";
  type: "structure" | "clarity" | "tone" | "evidence" | "format";
  message: string;
}

export function generateFeedback(draft: BillDraft): FeedbackItem[] {
  const feedback: FeedbackItem[] = [];

  sections.forEach((section) => {
    const value = draft[section.id].trim();

    if (!value) {
      feedback.push({
        sectionId: section.id,
        type: "structure",
        message: `${section.label} is empty—add content before sharing with advisors.`
      });
      return;
    }

    if (value.length < 140) {
      feedback.push({
        sectionId: section.id,
        type: "clarity",
        message: `${section.label} is quite short. Expand with at least two detailed sentences or numbered clauses.`
      });
    }

    if (needsEvidence(section.id) && !evidenceKeywords.some((keyword) => value.toLowerCase().includes(keyword))) {
      feedback.push({
        sectionId: section.id,
        type: "evidence",
        message: `Strengthen the ${section.label.toLowerCase()} with a statistic, government source, or cost estimate.`
      });
    }

    const replaced = formalWordPairs.find((pair) => {
      pair.casual.lastIndex = 0;
      return pair.casual.test(value);
    });
    if (replaced) {
      feedback.push({
        sectionId: section.id,
        type: "tone",
        message: `Replace casual phrasing with legislative language, e.g., swap words matching "${replaced.casual.source}" with "${replaced.formal}".`
      });
    }

    if (section.id === "provisions" && !/\d\./.test(value)) {
      feedback.push({
        sectionId: section.id,
        type: "format",
        message: "Number each major action (1., 2., 3.) so delegates can reference clauses during debate."
      });
    }
  });

  const missingCount = sections.filter((section) => !draft[section.id].trim()).length;
  if (missingCount > 0) {
    feedback.push({
      sectionId: "overall",
      type: "structure",
      message: `Complete the remaining ${missingCount} section${missingCount > 1 ? "s" : ""} to finish your bill.`
    });
  }

  return feedback;
}

const researchTopics: Record<string, string[]> = {
  environment: [
    "According to the EPA, school buildings waste an estimated 25% of their energy annually due to outdated systems.",
    "The National Renewable Energy Laboratory reports that LED retrofits cut lighting costs by 50-70%."
  ],
  education: [
    "A 2023 NCES study found that project-based civic learning improved student policy knowledge by 32%.",
    "State youth civic participation grants have averaged $1.2M annually over the past five years."
  ],
  health: [
    "The CDC notes that adolescent mental health ER visits increased 31% from 2019 to 2021.",
    "Telehealth programs in rural counties reduced appointment wait times by 45% according to HHS."
  ],
  transportation: [
    "USDOT estimates that dedicated bus lanes can move three times more people per hour than mixed traffic lanes.",
    "A regional transit authority case study shows a 18% ridership increase after implementing student transit passes."
  ]
};

export function getResearchSummary(topic: string): string[] {
  const normalized = topic.trim().toLowerCase();
  const matchingKey = (Object.keys(researchTopics) as Array<keyof typeof researchTopics>).find((key) =>
    normalized.includes(key)
  );

  if (matchingKey) {
    return researchTopics[matchingKey];
  }

  if (!topic) {
    return ["Enter a topic to receive quick research highlights relevant to your bill."];
  }

  return [
    `Search local government reports, credible journalism, and academic studies about "${topic}" to gather supporting evidence.`,
    "Focus on recent data (within the last 3 years) and cite agencies or experts when possible."
  ];
}
