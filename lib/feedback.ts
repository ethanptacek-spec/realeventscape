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
  suggestion?: string;
}

export function generateFeedback(draft: BillDraft): FeedbackItem[] {
  const feedback: FeedbackItem[] = [];

  sections.forEach((section) => {
    const value = draft[section.id].trim();

    if (!value) {
      feedback.push({
        sectionId: section.id,
        type: "structure",
        message: `${section.label} is empty—add content before sharing with advisors.`,
        suggestion: `Draft two to three sentences for the ${section.label.toLowerCase()} that clearly state who is affected, what changes, and when it takes effect.`
      });
      return;
    }

    if (value.length < 140) {
      feedback.push({
        sectionId: section.id,
        type: "clarity",
        message: `${section.label} is quite short. Expand with at least two detailed sentences or numbered clauses.`,
        suggestion: `Add concrete details—include names of agencies, timelines, or numerical targets to reach a full paragraph.`
      });
    }

    if (needsEvidence(section.id) && !evidenceKeywords.some((keyword) => value.toLowerCase().includes(keyword))) {
      feedback.push({
        sectionId: section.id,
        type: "evidence",
        message: `Strengthen the ${section.label.toLowerCase()} with a statistic, government source, or cost estimate.`,
        suggestion: `Cite a recent report (within 3 years) from a state agency or credible nonprofit and mention the figure directly in the section.`
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
        message: `Replace casual phrasing with legislative language, e.g., swap words matching "${replaced.casual.source}" with "${replaced.formal}".`,
        suggestion: `Rewrite each sentence using "shall" and precise verbs so the obligations are enforceable.`
      });
    }

    if (section.id === "provisions" && !/\d\./.test(value)) {
      feedback.push({
        sectionId: section.id,
        type: "format",
        message: "Number each major action (1., 2., 3.) so delegates can reference clauses during debate.",
        suggestion: "Break the provisions into numbered clauses such as '1. The Department of...' and '2. Funding shall...'"
      });
    }
  });

  const missingCount = sections.filter((section) => !draft[section.id].trim()).length;
  if (missingCount > 0) {
    feedback.push({
      sectionId: "overall",
      type: "structure",
      message: `Complete the remaining ${missingCount} section${missingCount > 1 ? "s" : ""} to finish your bill.`,
      suggestion: "Use the completion checklist to fill in each blank section before exporting your bill."
    });
  }

  return feedback;
}
