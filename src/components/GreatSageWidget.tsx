import React, { useState, useEffect, useRef } from 'react'
import { DecisionAnalysis, ChatMessage } from '../types/decision.types'
import { streamSageMessage } from '../services/debateService'
import { Send, Mic, ChevronDown } from 'lucide-react'

interface Props {
  analysis: DecisionAnalysis; context?: string; rationale?: string; isDemoMode?: boolean
}

export const GreatSageWidget: React.FC<Props> = ({ analysis, context, rationale, isDemoMode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const topAssumption = analysis.unstatedAssumptions.find(a => a.vulnerability === 'HIGH') || analysis.unstatedAssumptions[0]
  
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'init-1', sender: 'sage',
      text: `Greetings. I am the Great Sage, your thinking partner. I see you are weighing "${context || 'this decision'}". It is an ambitious path. But let us examine what you may be taking for granted: you count on "${topAssumption?.assumption || 'everything running smoothly'}". If this takes 6 months longer than expected, what keeps food on your table in month 7?`
    }
  ])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const chatBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isStreaming, isOpen])

  const quickChips = ["I hadn't thought about that angle", "Here is my backup plan if that happens...", "What blind spot worries you most?"]

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input
    if (!textToSend.trim() || isStreaming) return
    const userMsg: ChatMessage = { id: `user-${Date.now()}`, sender: 'user', text: textToSend.trim() }
    const sageMsgId = `sage-${Date.now()}`
    setMessages(prev => [...prev, userMsg, { id: sageMsgId, sender: 'sage', text: '' }])
    setInput(''); setIsStreaming(true)
    try {
      await streamSageMessage({
        history: [...messages, userMsg], userMessage: textToSend.trim(),
        context, rationale, highestRiskAssumption: topAssumption?.assumption, isDemoMode
      }, (chunk) => setMessages(prev => prev.map(m => m.id === sageMsgId ? { ...m, text: m.text + chunk } : m)))
    } catch (err) {
      console.error('Great Sage error:', err)
    } finally {
      setIsStreaming(false)
    }
  }

  const hookQuote = topAssumption ? `I see a vulnerability in: "${topAssumption.assumption.slice(0, 42)}..."` : 'I have reviewed your decision. Let us explore trade-offs.'

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open Team Radio Race Engineer chat"
        aria-haspopup="dialog"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-full backdrop-blur-2xl bg-[#12141C]/95 border border-volt/40 hover:border-volt shadow-2xl hover:shadow-[0_0_25px_rgba(210,255,0,0.3)] active:scale-[0.97] transition-all cursor-pointer group animate-slide-up-fade text-left"
      >
        <div className="relative flex items-center justify-center h-8 w-8 rounded-full bg-volt/15 border border-volt/40 text-base shadow-inner">
          <span aria-hidden="true">📻</span>
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-volt opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-volt"></span>
          </span>
        </div>
        <div className="max-w-[240px] hidden sm:block text-left">
          <span className="block text-xs font-black text-white group-hover:text-volt transition">TEAM RADIO • RACE ENGINEER</span>
          <p className="text-[11px] text-slate-300 truncate">{hookQuote}</p>
        </div>
        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-volt/20 text-volt border border-volt/40 font-bold">RADIO</span>
      </button>
    )
  }

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="great-sage-title" className="fixed bottom-5 right-5 z-50 w-[92vw] sm:w-[420px] h-[520px] max-h-[85vh] flex flex-col rounded-3xl backdrop-blur-2xl bg-[#12141C]/95 border border-volt/40 shadow-2xl animate-slide-up-fade overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#08090C]/80">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center h-8 w-8 rounded-full bg-volt/15 border border-volt/40 text-base">
            <span aria-hidden="true">📻</span>
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-volt"></span>
            </span>
          </div>
          <div>
            <h3 id="great-sage-title" className="text-xs font-black text-white flex items-center gap-1.5">TEAM RADIO // RACE ENGINEER</h3>
            <p className="text-[10px] text-volt font-mono font-semibold">Pit-Wall Telemetry • Guiding Conviction</p>
          </div>
        </div>
        <button type="button" onClick={() => setIsOpen(false)} aria-label="Minimize Great Sage chat" className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition active:scale-[0.97]">
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <div role="log" aria-live="polite" className="flex-1 p-3.5 space-y-3 overflow-y-auto">
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.sender !== 'user' && <div aria-hidden="true" className="h-6 w-6 rounded-full bg-volt/20 border border-volt/40 flex items-center justify-center text-xs shrink-0 mt-0.5">📻</div>}
            <div className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] ${m.sender === 'user' ? 'bg-gradient-to-r from-blue-600/30 to-volt/20 border border-volt/30 text-white rounded-tr-none' : 'bg-[#090A0F] border border-white/10 text-slate-100 rounded-tl-none shadow-sm'}`}>
              {m.text || (isStreaming ? <span className="inline-block w-2 h-3.5 bg-volt animate-pulse rounded-sm" /> : '')}
            </div>
          </div>
        ))}
        <div ref={chatBottomRef} />
      </div>

      <div className="px-3 py-1 flex flex-wrap gap-1 bg-[#08090C]/60 border-t border-white/5">
        {quickChips.map((chip, i) => (
          <button key={i} type="button" disabled={isStreaming} onClick={() => handleSend(chip)} className="text-[10px] px-2 py-0.5 rounded-lg bg-white/5 hover:bg-volt/15 hover:text-volt text-slate-300 border border-white/5 active:scale-[0.97] transition disabled:opacity-40">
            "{chip}"
          </button>
        ))}
      </div>

      <div className="p-2.5 border-t border-white/5 bg-[#08090C]/90 flex items-center gap-2">
        <button type="button" aria-label="Voice input mode" className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-volt border border-white/5 active:scale-[0.97]"><Mic className="h-3.5 w-3.5" /></button>
        <label htmlFor="sage-chat-input" className="sr-only">Type message to Great Sage</label>
        <input
          id="sage-chat-input"
          name="sageChatInput"
          type="text"
          value={input}
          maxLength={2000}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
          placeholder="Radio message to Race Engineer... (Press Enter to send)"
          disabled={isStreaming}
          className="flex-1 bg-[#12141C] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-volt/50"
        />
        <button type="button" aria-label="Send message to Great Sage" onClick={() => handleSend()} disabled={isStreaming || !input.trim()} className="p-2 rounded-xl bg-volt hover:bg-[#E2FF4D] text-black shadow-md active:scale-[0.97] transition disabled:opacity-40 font-bold">
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
