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
      <div className="backdrop-blur-xl bg-slate-900/60 rounded-2xl p-10 text-center border border-white/10 mb-6">
        <div className="inline-flex p-3 rounded-2xl bg-brand-500/10 text-brand-400 mb-3 border border-brand-500/20">
          <Sparkles className="h-6 w-6" />
        </div>
        <h4 className="text-slate-200 font-semibold text-sm mb-1">Ready to Review Your Decision</h4>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Type what you are deciding above, or pick one of the sample scenarios to see what you might be missing.
        </p>
      </div>
    )
  }

  return (
    <div className="backdrop-blur-xl bg-slate-900/60 rounded-2xl p-5 border border-white/10 shadow-2xl relative animate-fade-in mb-6">
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-brand-400" />
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Live Analysis
          </span>
          {isDemoMode && (
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              OFFLINE DEMO MODE
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-950 border border-slate-800 hover:border-slate-700 transition"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied' : 'Copy JSON'}</span>
        </button>
      </div>

      <div className="text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap selection:bg-brand-500/30 max-h-96 overflow-y-auto">
        {content}
        {isStreaming && (
          <span className="inline-block w-2 h-4 ml-1 bg-brand-400 animate-pulse align-middle rounded-sm" />
        )}
      </div>

      {isStreaming && (
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-brand-400">
          <div className="h-2 w-2 rounded-full bg-brand-400 animate-ping" />
          <span>Spotting hidden assumptions and edge cases...</span>
        </div>
      )}
    </div>
  )
}
