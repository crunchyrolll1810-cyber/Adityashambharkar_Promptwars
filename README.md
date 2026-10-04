# 🧭 ReasonLens: AI-Powered Socratic Thinking Companion

[![Gemini](https://img.shields.io/badge/Model-Gemini%202.5%20Flash-4285F4?logo=google&logoColor=white)](https://aistudio.google.com/)
[![Google Antigravity](https://img.shields.io/badge/Built%20With-Google%20Antigravity-6366F1)](https://antigravity.google/)
[![React](https://img.shields.io/badge/Frontend-React%2018%20%7C%20TypeScript-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/UI-Tailwind%20CSS%203.4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![PromptWars 2026](https://img.shields.io/badge/Hackathon-PromptWars%202026-F59E0B)](https://hack2skill.com/)

> **"ReasonLens never decides for you. We stress-test your logic so you decide with conviction."**

ReasonLens is a high-stakes decision interrogation engine. Instead of generating robotic advice or making decisions on behalf of users, ReasonLens acts as an impartial Socratic companion: unmasking fragile unstated assumptions, simulating a 12-month post-decision pre-mortem failure, and asking piercing questions to shatter confirmation bias.

---

## ⚡ Core Features

1. **Dual Interrogation Canvas:** Captures both *Decision Context* (what you plan to do) and *Proposed Rationale* (why you believe it's sound). Supports multimodal doc/image attachments.
2. **Unstated Assumptions Grid:** Detects hidden premises and flags fragility with vulnerability badges (`🔴 HIGH`, `🟡 MED`, `🟢 LOW`).
3. **12-Month Pre-Mortem Simulator:** Simulates prospective failure modes and isolates the root catalyst before irreversible resources are committed.
4. **Piercing Socratic Inquiries:** Formulates 3 targeted questions tied to strategic cognitive angles (liquidity stress-testing, opportunity cost, push vs. pull motivation).
5. **Dual-Mode High Availability:** Features live streaming powered by **Gemini 2.5 Flash** with deterministic JSON schemas, plus an instant zero-latency **Demo Mode** fallback.

---

## 🏛️ Architecture & Clean Design

```mermaid
graph TD
    A["User Input: Context & Rationale"] --> B["MultimodalInput.tsx"]
    B --> C["geminiService.ts Engine"]
    C -->|Live Inference| D["Gemini 2.5 Flash (Structured JSON Schema)"]
    C -->|Network Lag / Demo Toggle| E["mockDecisionData.ts (Fail-Safe)"]
    D --> F["Streaming Card (Typewriter Stream)"]
    E --> F
    F --> G["DecisionDashboard.tsx"]
    G --> H1["Clarity Score & Non-Decision Pledge"]
    G --> H2["Unstated Assumptions Grid"]
    G --> H3["12-Month Pre-Mortem Failure Card"]
    G --> H4["Socratic Inquiry Cards"]
```

### Architectural Principles Enforced:
- **Package-by-Feature Scaffolding:** Presentation is decoupled from inference logic.
- **Strict File-Size Caps:** All components and service modules are maintained strictly under 150 lines.
- **Vibe Layer:** Frosted glassmorphism (`backdrop-blur-xl`), tactile button compression (`active:scale-[0.98]`), and ambient gradient backdrops.

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- Node.js 18+ and npm installed
- *(Optional)* Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone & Install
```bash
cd ~/WORK/promptwars/solution
npm install
```

### 2. Configure Environment (Optional)
```bash
cp .env.example .env
# Set your VITE_GEMINI_API_KEY=AIzaSy...
```
*(Note: If no API key is provided, ReasonLens automatically engages the offline Demo Mode with rich, interactive mock scenarios).*

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
Generates optimized static assets in `dist/` ready for 1-click deployment on Netlify Drop or Vercel.

---

## 👥 Hackathon Credits
- **Event:** PromptWars 2026
- **Venue:** St. Vincent Pallotti College of Engineering and Technology (SVPCET), Nagpur
- **Organizers:** Engineering India x Hack2Skill x Google for Developers
