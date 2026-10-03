import React, { useState } from 'react'
import { Copy, Check, Sparkles, Terminal } from 'lucide-react'

interface StreamingCardProps {
  content: string
  isStreaming: boolean
  isDemoMode: boolean
}

export const StreamingCard: React.FC<StreamingCardProps> = ({
  content,
  isStreaming,
  isDemoMode
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!content && !isStreaming) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center border border-slate-800/80">
        <div className="inline-flex p-3 rounded-2xl bg-brand-500/10 text-brand-400 mb-3 border border-brand-500/20">
          <Sparkles className="h-6 w-6" />
        </div>
        <h4 className="text-slate-200 font-semibold text-sm mb-1">Awaiting Generation</h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Choose a scenario above or enter a custom prompt to synthesize real-time insights with Gemini.
        </p>
      </div>
    )
  }

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 shadow-2xl relative animate-fade-in">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-brand-400" />
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Synthesized Intelligence Output
          </span>
          {isDemoMode && (
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              MOCK FAIL-SAFE
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Content Rendering */}
      <div className="text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap selection:bg-brand-500/30">
        {content}
        {isStreaming && (
          <span className="inline-block w-2 h-4 ml-1 bg-brand-400 animate-pulse-slow align-middle rounded-sm" />
        )}
      </div>
    </div>
  )
}
