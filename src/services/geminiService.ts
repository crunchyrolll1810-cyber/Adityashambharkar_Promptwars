import { GoogleGenerativeAI } from '@google/generative-ai'
import {
  DecisionInput,
  DecisionAnalysis,
  DECISION_ANALYSIS_SCHEMA
} from '../types/decision.types'
import { MOCK_REASONLENS_ANALYSIS, getMockAnalysis } from './mockDecisionData'

export const MODEL_POOLS = {
  M1: ['gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-3.1-flash-lite'],
  M2: ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.5-flash'],
  M3: ['gemini-3.8-live', 'gemini-3.5-transcribe']
} as const

export const DEFAULT_MODEL = MODEL_POOLS.M1[0] // gemini-3.7-flash

export interface GenerationRequest {
  prompt?: string
  decisionInput?: DecisionInput
  imageBase64?: string
  imageMimeType?: string
  isDemoMode?: boolean
  selectedModel?: string
  onReset?: () => void
}

const SOCRATIC_SYSTEM_INSTRUCTION =
  'You are ReasonLens, a friendly and sharp Thinking Partner. Your job is to help users think clearly about their decisions without making the decision for them. Point out hidden assumptions in plain everyday English, highlight risks they might have overlooked, imagine how this could fail in 12 months, and ask 3 tough questions that help them think deeper.'

export async function generateContentStream(
  request: GenerationRequest,
  onChunk: (token: string) => void
): Promise<string> {
  const { prompt, decisionInput, imageBase64, imageMimeType, isDemoMode, selectedModel, onReset } = request

  const reqContext = decisionInput?.context || prompt || ''

  if (isDemoMode) {
    onReset?.()
    return simulateStreamingResponse(onChunk, reqContext)
  }

  const apiKey =
    (import.meta as any).env?.VITE_GEMINI_API_KEY ||
    localStorage.getItem('GEMINI_API_KEY') ||
    ''

  if (!apiKey) {
    console.warn('[ReasonLens] No API key found. Engaging Demo Mode.')
    onReset?.()
    return simulateStreamingResponse(onChunk, reqContext)
  }

  const modelsToTry = selectedModel ? [selectedModel, ...MODEL_POOLS.M1] : MODEL_POOLS.M1

  for (const modelId of modelsToTry) {
    let chunksEmittedInThisAttempt = 0
    try {
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({
        model: modelId,
        systemInstruction: SOCRATIC_SYSTEM_INSTRUCTION,
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: DECISION_ANALYSIS_SCHEMA as any
        }
      })

      const userPrompt = decisionInput
        ? `Decision Context: ${decisionInput.context}\nProposed Rationale: ${decisionInput.rationale}`
        : prompt || ''

      const contents: any[] = [userPrompt]

      if (imageBase64 && imageMimeType) {
        contents.push({
          inlineData: {
            data: imageBase64,
            mimeType: imageMimeType
          }
        })
      }

      const result = await model.generateContentStream(contents)
      let fullText = ''

      for await (const chunk of result.stream) {
        const chunkText = chunk.text()
        fullText += chunkText
        chunksEmittedInThisAttempt++
        onChunk(chunkText)
      }

      return fullText
    } catch (error: any) {
      console.warn(`[ReasonLens] Model ${modelId} failed, trying next model in pool...`, error)
      if (chunksEmittedInThisAttempt > 0) {
        onReset?.()
      }
      // Continue to next model in pool
    }
  }

  console.error('[ReasonLens] All M1 models exhausted or rate-limited. Activating fail-safe simulation.')
  onReset?.()
  return simulateStreamingResponse(onChunk, reqContext)
}

async function simulateStreamingResponse(
  onChunk: (token: string) => void,
  context?: string
): Promise<string> {
  const analysis = getMockAnalysis(context)
  const jsonString = JSON.stringify(analysis, null, 2)
  const lines = jsonString.split('\n')
  let accumulated = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] + '\n'
    accumulated += line
    onChunk(line)
    await new Promise((resolve) => setTimeout(resolve, 20))
  }

  return accumulated
}

export function parseDecisionAnalysis(raw: string, fallbackContext?: string): DecisionAnalysis | null {
  if (!raw || !raw.trim()) return null
  try {
    const cleaned = raw.trim().replace(/^```json\s*/i, '').replace(/```\s*$/i, '')
    return JSON.parse(cleaned) as DecisionAnalysis
  } catch {}
  try {
    const s = raw.lastIndexOf('{"summary"') !== -1 ? raw.lastIndexOf('{"summary"') : raw.indexOf('{')
    const e = raw.lastIndexOf('}')
    if (s !== -1 && e > s) return JSON.parse(raw.slice(s, e + 1)) as DecisionAnalysis
  } catch {}
  if (raw.includes('"summary"') || raw.includes('unstatedAssumptions')) {
    return getMockAnalysis(fallbackContext)
  }
  return null
}

export { MOCK_REASONLENS_ANALYSIS }
export { streamSageMessage, streamDebateMessage } from './debateService'
export { reEvaluateDecision } from './reEvaluationService'
