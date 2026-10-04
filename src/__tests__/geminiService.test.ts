import { describe, it, expect } from 'vitest'
import { parseDecisionAnalysis } from '../services/geminiService'

describe('geminiService - parseDecisionAnalysis', () => {
  const validMockJson = JSON.stringify({
    summary: 'Testing career shift to AI startup.',
    clarityScore: 78,
    unstatedAssumptions: [
      {
        assumption: 'Product will find early traction in 90 days',
        vulnerability: 'HIGH',
        reasoning: 'Interview 5 potential users before quitting'
      }
    ],
    blindSpotRisks: [
      { risk: 'Zero enterprise sales experience', impactArea: 'Revenue' }
    ],
    preMortemScenarios: [
      {
        whatWentWrong: 'Runway depleted faster than expected',
        catalyst: 'Underestimated cloud GPU costs'
      }
    ],
    socraticQuestions: [
      {
        question: 'What emergency reserves do you have for month 7?',
        reasoningAngle: 'Financial safety'
      }
    ],
    nonDecisionPledge: 'ReasonLens never decides for you.'
  })

  it('correctly parses raw valid JSON decision analysis', () => {
    const parsed = parseDecisionAnalysis(validMockJson, 'Career Move')
    expect(parsed).not.toBeNull()
    expect(parsed?.clarityScore).toBe(78)
    expect(parsed?.summary).toBe('Testing career shift to AI startup.')
    expect(parsed?.unstatedAssumptions).toHaveLength(1)
    expect(parsed?.unstatedAssumptions[0].vulnerability).toBe('HIGH')
    expect(parsed?.preMortemScenarios).toHaveLength(1)
  })

  it('correctly parses markdown-wrapped JSON code blocks', () => {
    const wrappedJson = `\`\`\`json\n${validMockJson}\n\`\`\``
    const parsed = parseDecisionAnalysis(wrappedJson, 'Test Context')
    expect(parsed).not.toBeNull()
    expect(parsed?.clarityScore).toBe(78)
  })

  it('returns mock analysis when raw JSON contains summary or unstatedAssumptions marker', () => {
    const parsed = parseDecisionAnalysis('{"summary": "Broken incomplete JSON', 'Startup Leap')
    expect(parsed).not.toBeNull()
    expect(parsed?.clarityScore).toBeGreaterThanOrEqual(40)
    expect(parsed?.unstatedAssumptions.length).toBeGreaterThan(0)
  })

  it('handles empty string gracefully by returning null', () => {
    const result = parseDecisionAnalysis('', '')
    expect(result).toBeNull()
  })
})
