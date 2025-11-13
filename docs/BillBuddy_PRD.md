# BillBuddy Product Requirements Document (PRD)

## Project Overview
- **Project Name:** BillBuddy
- **Version:** 1.0
- **Prepared by:** Ethan
- **Date:** 2025

BillBuddy is a web and mobile application designed to help Youth in Government (YIG) students draft, refine, and understand legislative bills. The platform leverages AI-guided assistance to provide real-time suggestions, formatting corrections, educational resources, and guided practice so that students can produce polished legislation with confidence.

## Problem Statement
Students participating in YIG often face the following challenges:
- Limited understanding of how to structure a legislative bill.
- Difficulty writing in formal legal language.
- Limited individualized guidance from advisors due to time constraints.
- Extra time spent searching for examples, formats, and background research.

These challenges result in lower-quality bills, reduced confidence when presenting legislation, and less meaningful debate experiences. BillBuddy addresses these gaps by providing structured guidance and AI-powered support throughout the drafting process.

## Goals & Objectives
### Primary Goal
Help students write polished, accurate, well-structured bills that are ready to present at YIG conferences.

### Objectives
1. Provide step-by-step guidance for creating each section of a bill.
2. Offer AI-powered suggestions that improve clarity, grammar, and structure.
3. Deliver targeted recommendations that strengthen arguments and research.
4. Simplify access to official bill formats and past examples.
5. Encourage learning by prompting users to understand and refine AI suggestions rather than relying on automated rewriting.

## Target Audience
| Group | Needs | Benefit from BillBuddy |
| --- | --- | --- |
| New YIG Delegates | Understanding the format and purpose of bills | Clear templates and guided editing |
| Experienced Delegates | Improving argument depth and clarity | Strong revision and research suggestions |
| Advisors / Teachers | Supporting many students effectively | Dashboard to review progress and provide feedback |

## Key Features
### 1. Bill Builder (Core Feature)
A step-by-step interface that guides users through all required bill elements:
- Title
- Purpose statement
- Definitions
- Provisions / Action steps
- Fiscal impact
- Enforcement plan

### 2. AI Revision Assistant
- Suggests improvements to clarity, grammar, structure, and conciseness.
- Highlights weak areas and proposes stronger, more formal language.
- Detects missing sections and prompts users to complete them.

### 3. Research Helper
- Provides summaries and breakdowns of key facts related to the bill topic.
- Suggests credible sources (without direct access to paywalled content).
- Generates bullet points to support speeches and debate preparation.

### 4. Example Library
- Includes successful past YIG bills (publicly available or user-submitted).
- Supports filtering by category (e.g., environment, education, public health, crime).
- Enables comparative learning by showcasing effective examples.

### 5. Advisor Dashboard (Phase 2)
- Allows advisors and teachers to monitor student progress.
- Supports commenting on drafts.
- Enables exporting and generating print-ready PDFs.

## User Experience Flow
1. User signs in using Google, school login, or email.
2. User selects "Start a New Bill" or "Upload/Import an Existing Bill."
3. Guided Bill Builder walks the user through each section of the bill.
4. User inputs text and receives real-time AI suggestions and highlights.
5. User revises the bill based on feedback.
6. User previews the final formatted bill.
7. User downloads or shares the finished bill.

## Technical Requirements
- **Frontend:** React / Next.js for web, with optional React Native mobile app.
- **Backend:** Node.js with Express or Firebase Functions.
- **Database:** Firebase Firestore or Supabase.
- **AI Model:** GPT-5 API for text analysis and rewriting.
- **Authentication:** Google OAuth with optional school login integration.
- **File Exporting:** Support for PDF and .docx generation.
- **Hosting:** Firebase Hosting or Vercel.

## Success Metrics
| Metric | Goal |
| --- | --- |
| Bill completion rate | 70% of started bills completed within the platform |
| User satisfaction | Average feedback rating of 4.5/5 from students and advisors |
| Time to first draft | Reduce drafting time by 50% |
| Advisor workload | Reduce repeated formatting guidance by 60% |

## Risks & Mitigation
| Risk | Description | Mitigation |
| --- | --- | --- |
| Over-reliance on AI | Students may allow the AI to write entire sections | Require users to provide explanations when accepting AI suggestions |
| Data privacy concerns | Student documents must remain secure | Implement encrypted storage and strict access controls |
| Educational integrity | The tool must teach rather than replace student effort | Offer contextual learning pop-ups and explanations with AI feedback |

## Timeline (MVP)
| Phase | Duration | Deliverables |
| --- | --- | --- |
| Design & UI Wireframes | 2 weeks | App screens and user flows |
| Core Development | 4–6 weeks | Bill Builder and AI Revision Assistant |
| Testing & Feedback | 2 weeks | Beta testing with YIG students |
| Public Launch | Week 10 | Website launch and onboarding guide |

