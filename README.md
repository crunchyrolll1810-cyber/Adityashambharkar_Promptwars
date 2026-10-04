# 🧭 ReasonLens: AI Thinking Partner for High-Stakes Decisions

[![Google Labs Experiment](https://img.shields.io/badge/Google%20Labs-Experiment%20%2301-4285F4?logo=google&logoColor=white)](https://labs.google/)
[![Gemini](https://img.shields.io/badge/Model-Google%20Gemini-8B5CF6?logo=google&logoColor=white)](https://aistudio.google.com/)
[![Built With Antigravity](https://img.shields.io/badge/Built%20With-Google%20Antigravity-4F46E5)](https://antigravity.google/)
[![PromptWars 2026](https://img.shields.io/badge/Hackathon-PromptWars%202026-F59E0B)](https://hack2skill.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10B981.svg)](LICENSE)

> **"ReasonLens never decides for you. We stress-test your logic so you decide with conviction."**

ReasonLens is an experimental **AI Thinking Partner** built in the spirit of Google Labs and Google Antigravity. Rather than generating superficial advice or usurping your decision-making agency, ReasonLens acts as an intellectual mirror: unmasking fragile unstated assumptions, forecasting potential 12-month failure modes, and asking tough questions that force you to **use your own brain**.

---

## 🚩 The Problem: Why Most High-Stakes Decisions Fail

When humans make major career, technical, or financial choices—such as quitting a job for a startup, rewriting an entire legacy codebase, pivoting a business model, or skipping campus placements—they suffer from two fatal cognitive traps:

1. **Confirmation Bias & Fragile Premises:** We fall in love with our plan, fixating only on evidence that supports it while remaining completely blind to the silent, unstated assumptions underpinning the entire move.
2. **Sycophantic AI & Robbed Human Agency:** Most modern AI tools exacerbate this problem in one of two ways:
   - **They act as agreeable "Yes-Men":** Reinforcing your biases because language models are RLHF-tuned to be polite and agreeable.
   - **They usurp human judgment:** Spitting out definitive verdicts (*"Based on your inputs, you should choose Option B"*). This strips away human ownership, leaving you unprepared and vulnerable when real-world friction hits.

---

## 💡 How ReasonLens Solves It

ReasonLens flips the traditional AI paradigm. It is engineered around an unshakeable invariant: **The AI is strictly forbidden from making the decision for you.**

Instead of acting as a GPS that tells you which route to take, ReasonLens operates as a **stress-testing laboratory**:

1. **Decoupled Context & Rationale:** Separates *what you are deciding* from *why you believe it will work*, allowing objective inspection of your reasoning chain.
2. **Unstated Assumptions Unmasked:** Extracts the invisible gambles you took for granted (e.g., *"assuming you will find 3 enterprise customers in 60 days"*), grading each by vulnerability with 1-click **48h Stress Tests**.
3. **12-Month Failure Forecaster (Pre-Mortem):** Simulates a prospective post-mortem across Months 1–3, 4–8, and 9–12 to uncover the catalyst that could derail your plan before you invest capital or time.
4. **Answerable Reflection Loop:** Presents targeted questions with interactive reflection textareas. Answering them triggers a re-evaluation loop that updates your **Clarity Score**.
5. **The Great Sage (Wise Thinking Companion):** A multi-turn mentor floating companion that respects your ambition, but asks grounding questions so you walk into your choice with open eyes.

---

## 🛸 How This Was Made Using Google Antigravity

ReasonLens was conceived, architected, and built from scratch using the **Google Antigravity (AGY)** agentic AI development platform:

```
                      ┌──────────────────────────────────────────────┐
                      │          Google Antigravity Agent            │
                      │  (Autonomous Planning & Pair Programming)    │
                      └──────────────────────┬───────────────────────┘
                                             │
             ┌───────────────────────────────┼───────────────────────────────┐
             ▼                               ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│     Agentic Skills      │     │  Engineering Invariant  │     │   Antigravity Visuals   │
│ creative-code-architect │     │   Strict File Cap Law   │     │  Canvas Magnetic Grid   │
│ hackathon-sprint-master │     │   Every file < 150 LOC  │     │ Staggered Blur-Fade Text│
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
```

### 1. Autonomous Planning & Pair Programming
- Developed through Antigravity's **Planning Mode**, generating structured implementation plans, research notes, and architectural walkthroughs prior to code execution.
- Leveraged Antigravity's **Background Task Execution** and non-blocking reactive wakeups to manage concurrent TypeScript compilation, Vite bundling, and dependency audits.

### 2. Specialized Agentic Skills
- **`creative-code-architect`**: Enforced Google Labs aesthetic tokens, micro-interactions (magnetic cursor physics, tactile button compressions, spotlight radial cards), and MVI state isolation.
- **`hackathon-sprint-master`**: Orchestrated the sprint lifecycle from 4-tier problem dissection, sweet-spot synthesis, to rapid feature delivery under strict competition deadlines.

### 3. Strict Architectural Invariant: 150-Line Hard Cap
To ensure zero monolithic bloat and absolute maintainability, every single file was held to a **strict limit of under 150 lines of code**:
- Decomposed data sets (`mockDecisionData.ts`, `mockScenariosPart2.ts`, `calibrationQuestions.ts`).
- Decoupled complex UI into modular components (`ClarityGauge.tsx`, `HeroHeader.tsx`, `GreatSageWidget.tsx`, `ReflectionSection.tsx`).
- Separated services into clean single-responsibility modules (`geminiService.ts`, `debateService.ts`, `reEvaluationService.ts`).
- **Result:** 100% of all 22 source and style files strictly comply with the rule.

### 4. Replicating Antigravity's Signature Visual Identity
- **Interactive Magnetic Dot Canvas (`InteractiveDotGrid.tsx`):** A custom 60fps HTML5 canvas dot matrix where dots within a 140px radius gently pull toward the cursor with spring dampening physics, mirroring the [antigravity.google](https://antigravity.google) homepage.
- **Staggered Blur-Fade Typography (`HeroHeader.tsx`):** Words (`INTERROGATE`, `YOUR`, `THINKING.`) float in sequentially from a 12px Gaussian blur with cubic-bezier easing.
- **Dynamic Decision Prompt Carousel:** Real-world dilemmas smoothly fade out and fade in with an ethereal upward translation and a glowing gradient cursor.
- **Obsidian Glass & Ambient Aurora:** Deep `#090D16` canvas illuminated by multi-layered volumetric glows and scanline CRT overlays.

---

## 🧠 Traditional AI vs. ReasonLens

| Traditional AI Assistants | ReasonLens Thinking Partner |
| :--- | :--- |
| *"You should quit your job and launch the company."* | *"What evidence proves customer demand, and what sustains you in month 7 if sales take a year?"* |
| Tells you what to do (passive reliance). | Asks grounding questions that demand reflection (active agency). |
| Validates your biases with sycophantic praise. | Identifies your most fragile unstated assumption and challenges it. |
| Ignores failure modes until they happen. | Runs a prospective 12-month reality check before you commit resources. |
| Human is a passive consumer. | **Human retains 100% of the decision ownership and conviction.** |

---

## 🛠️ Technical Stack & Architecture

- **Framework:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS 3.4, Custom Obsidian Glass Design System, Lucide Icons
- **AI Inference:** Google Gemini API via `@google/generative-ai` & `@google/genai`
- **Schema Enforcement:** Strict JSON Schema generation (`responseMimeType: "application/json"`)
- **Resilience:** Dual-Mode Engine:
  - `🟢 LIVE INFERENCE`: Real-time streaming from Gemini with cascading model failovers.
  - `🟡 DEMO MODE`: Client-side simulation ensuring live presentations never fail if offline.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm installed
- *(Optional)* A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone & Install
```bash
git clone https://github.com/crunchyrolll1810-cyber/Adityashambharkar_Promptwars.git
cd Adityashambharkar_Promptwars
npm install
```

### 2. Environment Setup (Optional for Live API)
Create a `.env` file in the root directory:
```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```
*(If no API key is set, ReasonLens automatically runs in Demo Mode with rich realistic scenarios).*

### 3. Run Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
Creates an optimized, production-ready bundle in `dist/` ready to drag-and-drop onto **Netlify** or deploy on **Vercel**.

---

## 🏆 PromptWars 2026 Submission

- **Event:** PromptWars 2026 • SVPCET Nagpur
- **Organizers:** Engineering India x Hack2Skill x Google for Developers
- **Track:** AI Agents & Prompt Engineering
- **Author:** Aditya Shambharkar
- **Repository:** [Adityashambharkar_Promptwars](https://github.com/crunchyrolll1810-cyber/Adityashambharkar_Promptwars)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
