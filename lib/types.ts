export type BillSectionId =
  | "title"
  | "purpose"
  | "definitions"
  | "provisions"
  | "fiscal"
  | "enforcement";

export type BillDraft = Record<BillSectionId, string>;

export const sectionLabels: Record<BillSectionId, string> = {
  title: "Bill Title",
  purpose: "Purpose Statement",
  definitions: "Definitions",
  provisions: "Provisions / Action Steps",
  fiscal: "Fiscal Impact",
  enforcement: "Enforcement"
};
