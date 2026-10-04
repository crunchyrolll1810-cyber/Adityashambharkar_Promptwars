import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DecisionDashboard } from '../components/DecisionDashboard'
import { DecisionAnalysis } from '../types/decision.types'

const testAnalysis: DecisionAnalysis = {
  summary: 'Pivoting from B2C to B2B enterprise tier.',
  clarityScore: 82,
  unstatedAssumptions: [
    {
      assumption: 'Enterprise sales cycles will be under 60 days',
      vulnerability: 'HIGH',
      reasoning: 'Reach out to 3 enterprise prospects today'
    },
    {
      assumption: 'Team can deliver SSO and compliance in 1 month',
      vulnerability: 'MED',
      reasoning: 'Review SOC2 audit requirements'
    }
  ],
  blindSpotRisks: [
    { risk: 'No dedicated enterprise sales rep', impactArea: 'Sales' },
    { risk: 'Lack of compliance certification', impactArea: 'Security' }
  ],
  preMortemScenarios: [
    {
      whatWentWrong: 'Sales cycle drags past 6 months',
      catalyst: 'Complex procurement requirements'
    }
  ],
  socraticQuestions: [
    {
      question: 'What happens if enterprise sales cycle takes 9 months?',
      reasoningAngle: 'Financial runway'
    }
  ],
  nonDecisionPledge: 'ReasonLens never decides for you.'
}

describe('DecisionDashboard Component', () => {
  it('renders summary and telemetry badges', () => {
    render(
      <DecisionDashboard
        analysis={testAnalysis}
        context="B2B Pivot"
        rationale="B2C churn is high"
        reflections={{}}
        onChangeReflection={vi.fn()}
        onReEvaluate={vi.fn()}
      />
    )
    expect(screen.getByText(/Pivoting from B2C to B2B enterprise tier\./i)).toBeInTheDocument()
    expect(screen.getByText('[EXP 01]')).toBeInTheDocument()
    expect(screen.getByText('[EXP 02]')).toBeInTheDocument()
    expect(screen.getByText('[EXP 03]')).toBeInTheDocument()
  })

  it('renders blind spot risk alert chips', () => {
    render(
      <DecisionDashboard
        analysis={testAnalysis}
        context="B2B Pivot"
        rationale="B2C churn is high"
        reflections={{}}
        onChangeReflection={vi.fn()}
        onReEvaluate={vi.fn()}
      />
    )
    expect(screen.getByText(/No dedicated enterprise sales rep/i)).toBeInTheDocument()
    expect(screen.getByText(/Lack of compliance certification/i)).toBeInTheDocument()
  })

  it('renders all unstated assumptions and vulnerability badges', () => {
    render(
      <DecisionDashboard
        analysis={testAnalysis}
        context="B2B Pivot"
        rationale="B2C churn is high"
        reflections={{}}
        onChangeReflection={vi.fn()}
        onReEvaluate={vi.fn()}
      />
    )
    expect(screen.getByText(/Enterprise sales cycles will be under 60 days/i)).toBeInTheDocument()
    expect(screen.getByText(/🔴 High Risk/i)).toBeInTheDocument()
    expect(screen.getByText(/🟡 Medium/i)).toBeInTheDocument()
  })
})
