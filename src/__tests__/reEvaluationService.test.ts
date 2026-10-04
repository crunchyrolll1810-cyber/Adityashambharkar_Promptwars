import { describe, it, expect } from 'vitest'
import { reEvaluateDecision } from '../services/reEvaluationService'
import { DecisionAnalysis } from '../types/decision.types'

describe('reEvaluationService - reEvaluateDecision', () => {
  const baseAnalysis: DecisionAnalysis = {
    summary: 'Initial decision state',
    clarityScore: 60,
    unstatedAssumptions: [
      { assumption: 'Users will pay $20/mo', vulnerability: 'HIGH', reasoning: 'Early survey' }
    ],
    blindSpotRisks: [
      { risk: 'High user churn', impactArea: 'Retention' }
    ],
    preMortemScenarios: [
      { whatWentWrong: 'No conversion', catalyst: 'Poor positioning' }
    ],
    socraticQuestions: [
      { question: 'What is the backup plan?', reasoningAngle: 'Risk mitigation' },
      { question: 'Who validates the revenue?', reasoningAngle: 'Market proof' },
      { question: 'How long can you self-fund?', reasoningAngle: 'Financial runway' }
    ],
    nonDecisionPledge: 'ReasonLens never decides for you.'
  }

  it('calculates a clarity score boost when user submits reflections', async () => {
    const reflections = {
      0: 'I have secured 10 pre-orders already.',
      1: 'My co-founder handles revenue validation.',
      2: 'I have 12 months of savings reserved.'
    }

    const { updatedAnalysis, boostAmount } = await reEvaluateDecision(
      baseAnalysis,
      reflections,
      'Startup Launch',
      'High growth opportunity'
    )

    expect(updatedAnalysis.clarityScore).toBeGreaterThan(baseAnalysis.clarityScore)
    expect(boostAmount).toBeGreaterThan(0)
    expect(updatedAnalysis.summary).toContain('Updated with Great Sage')
  })

  it('keeps base score if zero reflections are answered', async () => {
    const { updatedAnalysis, boostAmount } = await reEvaluateDecision(
      baseAnalysis,
      {},
      'Context',
      'Rationale'
    )

    expect(updatedAnalysis.clarityScore).toBe(baseAnalysis.clarityScore)
    expect(boostAmount).toBe(0)
  })

  it('caps clarity score at a maximum of 100', async () => {
    const highAnalysis: DecisionAnalysis = { ...baseAnalysis, clarityScore: 98 }
    const reflections = { 0: 'Detailed answer', 1: 'Detailed answer 2', 2: 'Detailed answer 3' }
    const { updatedAnalysis } = await reEvaluateDecision(highAnalysis, reflections, 'Ctx', 'Rat')
    expect(updatedAnalysis.clarityScore).toBeLessThanOrEqual(100)
  })
})
