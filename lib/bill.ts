import { sections } from "./sections";
import type { BillDraft } from "./types";

export function formatBillDraft(draft: BillDraft): string {
  const lines: string[] = [];

  lines.push("YOUTH IN GOVERNMENT MODEL LEGISLATURE");
  lines.push("STATE OF [YOUR STATE]");
  lines.push("\n");
  lines.push(`An Act relating to ${draft.title ? draft.title.trim() : "[Bill Title]"}`);
  lines.push("\n");

  sections.forEach((section) => {
    const heading = section.label.toUpperCase();
    const content = draft[section.id]?.trim() || "[Add this section]";
    lines.push(heading);
    lines.push(content);
    lines.push("\n");
  });

  lines.push("BE IT ENACTED BY THE YOUTH IN GOVERNMENT MODEL LEGISLATURE.");

  return lines.join("\n");
}
