import React, { useState, useEffect, useRef } from 'react'
import { DecisionAnalysis, ChatMessage } from '../types/decision.types'
import { streamDebateMessage } from '../services/debateService'
import { Send, Mic, Sparkles } from 'lucide-react'

interface Props {
  analysis: DecisionAnalysis
  context?: string
  rationale?: string
  isDemoMode?: boolean
}

export const WiseDebatePanel: React.FC<Props> = ({ analysis, context, rationale, isDemoMode }) => {
  const topAssumption = analysis.unstatedAssumptions.find(a => a.vulnerability === 'HIGH') || analysis.unstatedAssumptions[0]
  
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'init-1',
      sender: 'mentor',
      text: `I've reviewed your plan for "${context || 'this decision'}". It is an ambitious move. But let's look at one key assumption: you're counting on "${topAssumption?.assumption || 'everything going according to plan'}". If customer signups take 6 months longer than you hope, what keeps food on your table in month 7?`
    }
  ])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const chatBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isStreaming])

  const quickChips = [
    "I hadn't thought about that angle",
    "Here is my backup plan if that happens...",
    "What blind spot worries you most?"
  ]

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input
    if (!textToSend.trim() || isStreaming) return

    const userMsg: ChatMessage = { id: `user-${Date.now()}`, sender: 'user', text: textToSend.trim() }
    const mentorMsgId = `mentor-${Date.now()}`
    
    setMessages(prev => [...prev, userMsg, { id: mentorMsgId, sender: 'mentor', text: '' }])
    setInput('')
    setIsStreaming(true)

    try {
      await streamDebateMessage(
        {
          history: [...messages, userMsg],
          userMessage: textToSend.trim(),
          context,
          rationale,
          highestRiskAssumption: topAssumption?.assumption,
          isDemoMode
        },
        (chunk) => {
          setMessages(prev => prev.map(m => m.id === mentorMsgId ? { ...m, text: m.text + chunk } : m))
        }
      )
    } catch (err) {
      console.error('Debate error:', err)
    } finally {
      setIsStreaming(false)
    }
  }

  return (
    <div className="rounded-2xl p-5 bg-[#161922]/90 border border-white/10 shadow-2xl space-y-4 mb-6 animate-fade-in">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-500/30">
            <Sparkles className="h-4 w-4 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              Wise Thinking Partner <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">Multi-Turn Live</span>
            </h3>
            <p className="text-[11px] text-slate-400">Respects your choice, but asks grounding questions so you walk into it prepared.</p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.sender === 'mentor' && (
              <div className="h-6 w-6 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-xs shrink-0 mt-0.5">
                🧭
              </div>
            )}
            <div className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
              m.sender === 'user'
                ? 'bg-gradient-to-r from-blue-600/30 to-indigo-600/40 border border-blue-500/30 text-white rounded-tr-none'
                : 'bg-[#0B0E14]/90 border border-white/10 text-slate-100 rounded-tl-none shadow-sm'
            }`}>
              {m.text || (isStreaming ? <span className="inline-block w-2 h-3.5 bg-indigo-400 animate-pulse rounded-sm" /> : '')}
            </div>
          </div>
        ))}
        <div ref={chatBottomRef} />
      </div>

      {/* Quick Starter Chips */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {quickChips.map((chip, i) => (
          <button
            key={i}
            disabled={isStreaming}
            onClick={() => handleSend(chip)}
            className="text-[11px] px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 hover:border-indigo-500/30 active:scale-[0.98] transition disabled:opacity-50"
          >
            "{chip}"
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2 pt-2 border-t border-white/5">
        <button type="button" className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white border border-white/5" title="Voice Input (Voice-Ready)">
          <Mic className="h-4 w-4" />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); handleSend() } }}
          placeholder="Answer or push back... (Ctrl+Enter to send)"
          disabled={isStreaming}
          className="flex-1 bg-[#0B0E14] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
        />
        <button
          onClick={() => handleSend()}
          disabled={isStreaming || !input.trim()}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-500/20 active:scale-[0.98] transition disabled:opacity-40"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
