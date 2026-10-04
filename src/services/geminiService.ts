import { GoogleGenerativeAI } from '@google/generative-ai'
import {
  DecisionInput,
  DecisionAnalysis,
  DECISION_ANALYSIS_SCHEMA
} from '../types/decision.types'
import { MOCK_REASONLENS_ANALYSIS, getMockAnalysis } from './mockDecisionData'

/**
 * Model Pool Invariants based on User Google AI Studio Quota:
 * M1 (Primary / Fast / High-Frequency): Gemini 3.7 Flash, 3.6 Flash, 3.5 Flash, 3.5 Flash Lite
 * M2 (Balanced / Deep Reasoning): Gemini 3.8 Flash, 3.7 Flash, 3.5 Flash
 * M3 (Specialized Multimodal / Live): Gemini 3.8 Live, 3.5 Transcribe Live
 */
export const MODEL_POOLS = {
  M1: [
    'gemini-3.7-flash',
    'gemini-3.6-flash',
    'gemini-3.5-flash',
    'gemini-3.5-flash-lite',
    'gemini-3.1-flash-lite'
  ],
  M2: [
    'gemini-3.8-flash',
    'gemini-3.7-flash',
    'gemini-3.5-flash'
  ],
  M3: [
    'gemini-3.8-live',
    'gemini-3.5-transcribe'
  ]
} as const

export const DEFAULT_MODEL = MODEL_POOLS.M1[0] // gemini-3.7-flash

export interface GenerationRequest {
  prompt?: string
  decisionInput?: DecisionInput
  imageBase64?: string
  imageMimeType?: string
  isDemoMode?: boolean
  selectedModel?: string
}

const SOCRATIC_SYSTEM_INSTRUCTION =
  'You are ReasonLens, a Socratic Thinking Companion. Your objective is to help users examine their reasoning without making decisions for them. Identify unstated assumptions, hidden blind-spot risks, simulate a 12-month pre-mortem failure scenario, and ask 3 piercing Socratic questions.'

export async function generateContentStream(
  request: GenerationRequest,
  onChunk: (token: string) => void
): Promise<string> {
  const { prompt, decisionInput, imageBase64, imageMimeType, isDemoMode, selectedModel } = request

  const reqContext = decisionInput?.context || prompt || ''

  if (isDemoMode) {
    return simulateStreamingResponse(onChunk, reqContext)
  }

  const apiKey =
    (import.meta as any).env?.VITE_GEMINI_API_KEY ||
    localStorage.getItem('GEMINI_API_KEY') ||
    ''

  if (!apiKey) {
    console.warn('[ReasonLens] No API key found. Engaging Demo Mode.')
    return simulateStreamingResponse(onChunk, reqContext)
  }

  const modelsToTry = selectedModel ? [selectedModel, ...MODEL_POOLS.M1] : MODEL_POOLS.M1

  for (const modelId of modelsToTry) {
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
        onChunk(chunkText)
      }

      return fullText
    } catch (error: any) {
      console.warn(`[ReasonLens] Model ${modelId} failed, trying next model in pool...`, error)
      // Continue to next model in pool
    }
  }

  console.error('[ReasonLens] All M1 models exhausted or rate-limited. Activating fail-safe simulation.')
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

export function parseDecisionAnalysis(raw: string): DecisionAnalysis | null {
  try {
    const cleaned = raw.trim().replace(/^```json\s*/i, '').replace(/```\s*$/i, '')
    return JSON.parse(cleaned) as DecisionAnalysis
  } catch {
    return null
  }
}

export { MOCK_REASONLENS_ANALYSIS }
