import { GoogleGenerativeAI } from '@google/generative-ai'
import { ChatMessage } from '../types/decision.types'
import { MODEL_POOLS } from './geminiService'

const SAGE_SYSTEM_INSTRUCTION = `You are the Great Sage, a calm, profoundly insightful elder guide and thinking partner.
- You are NOT an adversary. You never judge, argue, or decide for the user.
- Your role is to guide their self-awareness like a zen master. Respect their ambition and courage.
- Your goal is to help them walk into their decision with open eyes and full awareness of trade-offs.
- Speak in warm, conversational everyday English (like a wise elder mentor).
- Keep responses concise: 2 to 4 sentences maximum. Always conclude with one gentle, grounding question.`

const MOCK_SAGE_REPLIES = [
  "I respect that ambition. But walk me through the hardest week: if customer signups take 6 months longer than you hope, what keeps food on your table in month 7?",
  "That makes sense on paper. But real users often say they love an idea, yet hesitate to actually pay. What is one small test you can run this Friday to verify genuine commitment?",
  "A bold leap usually carries quiet sacrifices. Looking two years into the future, what is the single trade-off you might regret not preparing for today?",
  "I admire the courage to take this bet. Tell me, who is the one person whose honest feedback would make you rethink your assumptions, and have you spoken to them yet?"
]

export interface DebateRequest {
  history: ChatMessage[]
  userMessage: string
  context?: string
  rationale?: string
  highestRiskAssumption?: string
  isDemoMode?: boolean
}

export async function streamSageMessage(
  request: DebateRequest,
  onChunk: (token: string) => void
): Promise<string> {
  const { history, userMessage, context, rationale, highestRiskAssumption, isDemoMode } = request

  if (isDemoMode) {
    return simulateDebateStream(history.length, onChunk)
  }

  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || localStorage.getItem('GEMINI_API_KEY') || ''
  if (!apiKey) {
    return simulateDebateStream(history.length, onChunk)
  }

  for (const modelId of MODEL_POOLS.M1) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({
        model: modelId,
        systemInstruction: SAGE_SYSTEM_INSTRUCTION
      })

      const contextPreamble = `Context: User is weighing: "${context || 'a critical decision'}" because: "${rationale || 'of their rationale'}". Key assumption carrying risk: "${highestRiskAssumption || 'untested market demand'}".`

      const conversationHistory = history.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }))

      const chat = model.startChat({
        history: [
          { role: 'user', parts: [{ text: `Here is the background of my decision:\n${contextPreamble}` }] },
          { role: 'model', parts: [{ text: 'I understand your decision and rationale. I am here to help you reflect with clarity.' }] },
          ...conversationHistory
        ]
      })

      const result = await chat.sendMessageStream(userMessage)
      let fullResponse = ''

      for await (const chunk of result.stream) {
        const text = chunk.text()
        fullResponse += text
        onChunk(text)
      }

      return fullResponse
    } catch (err) {
      console.warn(`[GreatSage] Model ${modelId} failed, trying fallback...`, err)
    }
  }

  return simulateDebateStream(history.length, onChunk)
}

export const streamDebateMessage = streamSageMessage

async function simulateDebateStream(turn: number, onChunk: (token: string) => void): Promise<string> {
  const reply = MOCK_SAGE_REPLIES[turn % MOCK_SAGE_REPLIES.length]
  const words = reply.split(' ')
  let text = ''

  for (let i = 0; i < words.length; i++) {
    const chunk = (i === 0 ? '' : ' ') + words[i]
    text += chunk
    onChunk(chunk)
    await new Promise((resolve) => setTimeout(resolve, 40))
  }

  return text
}
