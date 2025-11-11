# BillBuddy

BillBuddy is a prototype web application that helps Youth in Government (YIG) students draft, revise, and research legislative bills. It follows the accompanying product requirements document and demonstrates the core experience outlined for the MVP release.

## Features

- **Guided Bill Builder** – A step-by-step workflow that walks students through every required bill section (title, purpose, definitions, provisions, fiscal impact, and enforcement). Progress indicators, completion tips, and an AI-powered section coach keep drafters on track.
- **AI Revision Assistant** – Sends the full draft to the OpenAI API (or a rule-based fallback when no key is configured) to produce structured feedback covering tone, clarity, structure, and evidence gaps. Suggestions are grouped by bill section for quick editing.
- **Research Helper** – Uses the OpenAI API to surface recent policy insights and recommended public sources for a topic. When offline, curated fallback research cards keep students moving.
- **Formatted Bill Preview** – Assembles the draft into a YIG-ready layout with copy/download actions so students can share a polished document instantly.
- **Example Library & Advisor CTA** – Curated sample bills organized by topic and an advisor-focused call-to-action that aligns with the planned dashboard vision.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment variables. Create a `.env.local` file and supply an OpenAI API key (skip this step to run in fallback/offline mode):

   ```bash
   OPENAI_API_KEY=sk-your-key-here
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to explore the prototype. The revision assistant, research helper, and section coach will automatically use the API key when present and fall back to heuristic guidance otherwise.

### Offline Preview

If you cannot install dependencies in your environment, open the static mock stored at
`preview/index.html` to review the interface:

```bash
open preview/index.html   # macOS
xdg-open preview/index.html # Linux
```

The standalone HTML/CSS page mirrors the main landing experience showcased in the Next.js app.

## Technology Stack

- [Next.js 14](https://nextjs.org/) with the App Router
- [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- TypeScript for type safety

## Project Structure

```
app/                # Next.js app router pages and API routes for AI orchestration
components/         # Reusable UI components for the BillBuddy experience
lib/                # Shared utilities, prompts, and fallback heuristics
preview/            # Standalone static mock for offline review
```

## Next Steps

- Integrate the production AI model for nuanced, context-aware feedback and drafting assistance.
- Persist drafts using a hosted database (e.g., Firebase Firestore) tied to user authentication.
- Expand research coverage with live API integrations for government datasets.
- Build the advisor dashboard to review student progress, leave comments, and manage delegations.

## License

This project is provided as an educational prototype and does not include a formal license.
