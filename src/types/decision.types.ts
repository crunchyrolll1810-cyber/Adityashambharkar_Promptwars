/**
 * ReasonLens: Domain Data Models & Gemini Schema
 * Package: src/types/decision.types.ts
 * Enforces Creative Code Architect strict <150 lines rule.
 */

export type VulnerabilityLevel = 'LOW' | 'MED' | 'HIGH';

export interface DecisionInputFile {
  name: string;
  dataUrl: string;
  mimeType: string;
}

export interface DecisionInput {
  context: string;
  rationale: string;
  files?: DecisionInputFile[];
}

export interface UnstatedAssumption {
  assumption: string;
  vulnerability: VulnerabilityLevel;
  reasoning: string;
}

export interface BlindSpotRisk {
  risk: string;
  impactArea: string;
}

export interface PreMortemScenario {
  whatWentWrong: string;
  catalyst: string;
}

export interface SocraticQuestion {
  question: string;
  reasoningAngle: string;
}

export interface DecisionAnalysis {
  summary: string;
  clarityScore: number;
  unstatedAssumptions: UnstatedAssumption[];
  blindSpotRisks: BlindSpotRisk[];
  preMortemScenarios: PreMortemScenario[];
  socraticQuestions: SocraticQuestion[];
  nonDecisionPledge: string;
}

/**
 * Structured response schema for Gemini generation.
 * Guarantees deterministic, type-safe JSON extraction.
 */
export const DECISION_ANALYSIS_SCHEMA = {
  type: 'object',
  properties: {
    summary: { type: 'string', description: 'Concise executive synopsis of the proposed decision' },
    clarityScore: { type: 'integer', description: 'Decision framing clarity score from 0 to 100' },
    unstatedAssumptions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          assumption: { type: 'string', description: 'The unstated or implicit assumption' },
          vulnerability: { type: 'string', enum: ['LOW', 'MED', 'HIGH'], description: 'Vulnerability level' },
          reasoning: { type: 'string', description: 'Why this assumption is fragile or untested' }
        },
        required: ['assumption', 'vulnerability', 'reasoning']
      }
    },
    blindSpotRisks: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          risk: { type: 'string', description: 'Critical unaddressed blind spot risk' },
          impactArea: { type: 'string', description: 'Impact area (e.g. Financial, Operational, Product)' }
        },
        required: ['risk', 'impactArea']
      }
    },
    preMortemScenarios: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          whatWentWrong: { type: 'string', description: '12-month post-decision failure simulation' },
          catalyst: { type: 'string', description: 'The root cause trigger that precipitated the failure' }
        },
        required: ['whatWentWrong', 'catalyst']
      }
    },
    socraticQuestions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          question: { type: 'string', description: 'Piercing Socratic inquiry challenging assumptions' },
          reasoningAngle: { type: 'string', description: 'Cognitive or strategic angle explored' }
        },
        required: ['question', 'reasoningAngle']
      }
    },
    nonDecisionPledge: {
      type: 'string',
      description: 'Socratic pledge reminding user that ReasonLens clarifies thinking but leaves the decision in human hands'
    }
  },
  required: [
    'summary',
    'clarityScore',
    'unstatedAssumptions',
    'blindSpotRisks',
    'preMortemScenarios',
    'socraticQuestions',
    'nonDecisionPledge'
  ]
} as const;
