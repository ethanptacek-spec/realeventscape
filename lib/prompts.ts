import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

import { sections } from "./sections";
import type { BillDraft, BillSectionId } from "./types";

function formatDraftForPrompt(draft: BillDraft) {
  return sections
    .map((section) => {
      const content = draft[section.id]?.trim() || "[Not provided]";
      return `${section.label}:\n${content}`;
    })
    .join("\n\n");
}

export function createFeedbackMessages(draft: BillDraft): ChatCompletionMessageParam[] {
  const allowedSections = sections.map((section) => section.id).join(", ");

  return [
    {
      role: "system",
      content:
        "You are an expert Youth in Government advisor who helps students polish legislative bills. When asked for feedback, respond strictly with valid JSON that parses into an array of objects. Each object must contain sectionId, type, message, and may include suggestion. sectionId must be one of the provided section keys or 'overall'."
    },
    {
      role: "user",
      content: `Analyze the following bill draft and provide targeted revision notes.\n\nSections to consider: ${allowedSections}.\n\nReturn a JSON array. Each item should be {"sectionId": string, "type": "structure"|"clarity"|"tone"|"evidence"|"format", "message": string, "suggestion"?: string }.\n\nBill draft:\n${formatDraftForPrompt(draft)}`
    }
  ];
}

export function createResearchMessages(topic: string): ChatCompletionMessageParam[] {
  return [
    {
      role: "system",
      content:
        "You surface credible civic data for Youth in Government students. Respond with JSON containing a 'highlights' array of 2-4 concise bullet strings and a 'sources' array of objects with title, url, and note fields."
    },
    {
      role: "user",
      content: `Provide research support for the topic "${topic}" relevant to state-level youth legislation. Focus on publicly accessible U.S. data from the last five years.`
    }
  ];
}

export function createSectionCoachMessages(
  sectionId: BillSectionId,
  currentText: string,
  draft: BillDraft
): ChatCompletionMessageParam[] {
  const section = sections.find((item) => item.id === sectionId);
  const label = section ? section.label : sectionId;

  return [
    {
      role: "system",
      content:
        "You rewrite legislative bill sections in a formal, debate-ready tone. Respond with JSON containing 'improvedText' and 'rationale'. Keep improvedText within 3 paragraphs or 6 numbered clauses."
    },
    {
      role: "user",
      content: `Review the student's ${label} section and strengthen it. Provide an improved version and explain the key improvement.\n\nExisting text:\n${currentText || "[empty]"}\n\nFull bill context:\n${formatDraftForPrompt(draft)}`
    }
  ];
}
