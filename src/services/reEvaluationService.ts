import { DecisionAnalysis } from '../types/decision.types'

export interface ReEvaluationResult {
  updatedAnalysis: DecisionAnalysis
  boostAmount: number
}

export async function reEvaluateDecision(
  currentAnalysis: DecisionAnalysis,
  reflections: Record<number, string>,
  context?: string,
  rationale?: string
): Promise<ReEvaluationResult> {
  const answeredCount = Object.values(reflections).filter(t => t.trim().length > 0).length
  if (answeredCount === 0) {
    return { updatedAnalysis: currentAnalysis, boostAmount: 0 }
  }

  // Calculate boost based on answered questions (+5% per answered question, up to +15%)
  const boostAmount = Math.min(15, answeredCount * 5)
  const newScore = Math.min(100, currentAnalysis.clarityScore + boostAmount)

  // Construct updated synopsis reflecting user's mitigations
  const answeredSnippets = Object.entries(reflections)
    .filter(([_, ans]) => ans.trim().length > 0)
    .map(([qIdx, ans]) => `Q${Number(qIdx) + 1}: "${ans.trim()}"`)
    .join('; ')

  const updatedSummary = `${currentAnalysis.summary} [Updated with Great Sage: Addressed ${answeredCount} blind spot${answeredCount > 1 ? 's' : ''} with active mitigation: ${answeredSnippets}]`

  // Downgrade highest vulnerability assumption if user answered at least 1 question
  const updatedAssumptions = currentAnalysis.unstatedAssumptions.map((item, idx) => {
    if (idx === 0 && item.vulnerability === 'HIGH' && answeredCount >= 1) {
      return {
        ...item,
        vulnerability: 'MED' as const,
        reasoning: `${item.reasoning} (Partially mitigated through user reflection: "${Object.values(reflections)[0]}")`
      }
    }
    return item
  })

  // Simulated latency for realistic tactile feel
  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    updatedAnalysis: {
      ...currentAnalysis,
      clarityScore: newScore,
      clarityBoost: (currentAnalysis.clarityBoost || 0) + boostAmount,
      summary: updatedSummary,
      unstatedAssumptions: updatedAssumptions
    },
    boostAmount
  }
}
