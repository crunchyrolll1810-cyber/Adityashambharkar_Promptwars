import { DecisionAnalysis } from '../types/decision.types'

export function generateMemoText(
  analysis: DecisionAnalysis,
  context?: string,
  rationale?: string
): string {
  const dateStr = new Date().toISOString().split('T')[0]
  return `# 🧭 ReasonLens: Decision Review Memo
**Your AI Thinking Partner**
*Generated: ${dateStr} • Powered by Gemini 2.5 Flash & Google Antigravity*

> **Our Promise:**
> *"You make the final call. We just help you spot what you might have missed."*

---

## 1. What You're Deciding
${context ? `- **What you plan to do:** ${context}\n` : ''}${rationale ? `- **Why you think it's a good idea:** ${rationale}\n` : ''}- **Summary:** ${analysis.summary}
- **Clarity Score:** ${analysis.clarityScore} / 100

---

## 2. Things You Might Be Assuming
${analysis.unstatedAssumptions
  .map(
    (a, i) => `### Assumption #${i + 1}: ${a.assumption}
- **Risk Level:** ${a.vulnerability === 'HIGH' ? 'Big Risk' : a.vulnerability === 'MED' ? 'Medium' : 'Minor'}
- **Why it might be fragile:** ${a.reasoning}
`
  )
  .join('\n')}

---

## 3. What Could Go Wrong? (12-Month Reality Check)
${analysis.preMortemScenarios
  .map(
    (s, i) => `### Failure Scenario #${i + 1}
- **What happens:** ${s.whatWentWrong}
- **Main reason:** ${s.catalyst}
`
  )
  .join('\n')}

---

## 4. Tough Questions to Ask Yourself
${analysis.socraticQuestions
  .map(
    (q, i) => `${i + 1}. **"${q.question}"**
   - *Why this matters:* ${q.reasoningAngle}`
  )
  .join('\n\n')}

---
*Created with ReasonLens • Your AI Thinking Partner*
`
}

export function exportDecisionMemo(
  analysis: DecisionAnalysis,
  context?: string,
  rationale?: string
) {
  const dateStr = new Date().toISOString().split('T')[0]
  const content = generateMemoText(analysis, context, rationale)
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `ReasonLens_Decision_Memo_${dateStr}.md`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
