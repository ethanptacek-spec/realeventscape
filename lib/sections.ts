import type { BillDraft, BillSectionId } from "./types";

export interface BillSection {
  id: BillSectionId;
  label: string;
  prompt: string;
}

export const sections: BillSection[] = [
  {
    id: "title",
    label: "Bill Title",
    prompt:
      "Craft a short, descriptive title that captures the core action of your bill. Use action verbs like 'An act to...'"
  },
  {
    id: "purpose",
    label: "Purpose Statement",
    prompt:
      "Explain in two to three sentences why the bill is needed and what problem it solves for your community."
  },
  {
    id: "definitions",
    label: "Definitions",
    prompt:
      "Clarify any specialized terms or acronyms. Each definition should be concise and legally precise."
  },
  {
    id: "provisions",
    label: "Provisions / Action Steps",
    prompt:
      "Outline the specific actions, requirements, or programs your bill establishes. Use numbered clauses for clarity."
  },
  {
    id: "fiscal",
    label: "Fiscal Impact",
    prompt:
      "Detail costs, funding sources, and any savings expected. Reference data or estimates where possible."
  },
  {
    id: "enforcement",
    label: "Enforcement",
    prompt:
      "Explain how the bill will be implemented, monitored, and what penalties exist for non-compliance."
  }
];

export const emptyDraft: BillDraft = sections.reduce((acc, section) => {
  acc[section.id] = "";
  return acc;
}, {} as BillDraft);
