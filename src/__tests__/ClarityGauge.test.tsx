import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ClarityGauge } from '../components/ClarityGauge'
import { DecisionAnalysis } from '../types/decision.types'

const mockAnalysis: DecisionAnalysis = {
  summary: 'Executive summary test content',
  clarityScore: 78,
  unstatedAssumptions: [{ assumption: 'A1', vulnerability: 'HIGH', reasoning: 'R1' }],
  blindSpotRisks: [{ risk: 'B1', impactArea: 'Ops' }],
  preMortemScenarios: [{ whatWentWrong: 'W1', catalyst: 'C1' }],
  socraticQuestions: [{ question: 'Q1', reasoningAngle: 'Angle1' }],
  nonDecisionPledge: 'We never decide for you.'
}

describe('ClarityGauge Component', () => {
  it('renders clarity score gauge and telemetry header', () => {
    render(
      <ClarityGauge
        score={78}
        isType1={false}
        analysis={mockAnalysis}
        context="My Decision"
        rationale="My Rationale"
      />
    )
    expect(screen.getByText('[GAUGE 01]')).toBeInTheDocument()
    expect(screen.getByText('Confidence Metric')).toBeInTheDocument()
  })

  it('renders Type 1 vs Type 2 reversibility badge', () => {
    render(
      <ClarityGauge
        score={78}
        isType1={false}
        analysis={mockAnalysis}
        context="My Decision"
        rationale="My Rationale"
      />
    )
    expect(screen.getByText(/Type 2: Easy to Reverse/i)).toBeInTheDocument()
  })

  it('renders 1-click memo export action buttons', () => {
    render(
      <ClarityGauge
        score={78}
        isType1={false}
        analysis={mockAnalysis}
        context="My Decision"
        rationale="My Rationale"
      />
    )
    expect(screen.getByText('Copy Memo')).toBeInTheDocument()
    expect(screen.getByTitle('Print / PDF')).toBeInTheDocument()
    expect(screen.getByTitle('Download Markdown')).toBeInTheDocument()
  })

  it('renders Type 1 hard to reverse badge when isType1 is true', () => {
    render(
      <ClarityGauge
        score={42}
        isType1={true}
        analysis={mockAnalysis}
        context="Ctx"
        rationale="Rat"
      />
    )
    expect(screen.getByText(/Type 1: Hard to Reverse/i)).toBeInTheDocument()
  })
})
