# BillBuddy

BillBuddy is a prototype web application that helps Youth in Government (YIG) students draft, revise, and research legislative bills. It follows the accompanying product requirements document and demonstrates the core experience outlined for the MVP release.

## Features

- **Guided Bill Builder** – A step-by-step workflow that walks students through every required bill section (title, purpose, definitions, provisions, fiscal impact, and enforcement). Progress indicators and completion tips keep drafters on track.
- **AI Revision Assistant (rule-based prototype)** – Provides structured feedback on tone, clarity, structure, and evidence needs using heuristics. This simulates how an AI assistant would highlight improvements before submitting to advisors.
- **Research Helper** – Generates quick research highlights for common YIG policy domains and offers guidance on gathering credible sources.
- **Example Library** – Curated sample bills organized by topic so students can compare formatting and persuasive techniques.
- **Call-to-action footer** – Encourages advisors to contact the team for onboarding, aligning with the Phase 2 dashboard vision.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to explore the prototype.

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
app/                # Next.js app router pages
components/         # Reusable UI components for the BillBuddy experience
lib/                # Shared utilities, including bill section metadata and feedback heuristics
public/             # (Optional) Static assets
```

## Next Steps

- Integrate the production AI model for nuanced, context-aware feedback and drafting assistance.
- Persist drafts using a hosted database (e.g., Firebase Firestore) tied to user authentication.
- Expand research coverage with live API integrations for government datasets.
- Build the advisor dashboard to review student progress, leave comments, and manage delegations.

## License

This project is provided as an educational prototype and does not include a formal license.
