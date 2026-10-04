import React, { useState } from 'react'
import { Copy, Check, Terminal, Activity } from 'lucide-react'

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
      <div className="backdrop-blur-2xl bg-[#161922]/80 rounded-2xl p-10 text-center border border-white/10 mb-6 shadow-xl">
        <div className="inline-flex p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-3 border border-indigo-500/20">
          <Terminal className="h-6 w-6" />
        </div>
        <h4 className="font-sans text-slate-200 font-semibold text-sm mb-1">Ready to explore your decision</h4>
        <p className="font-sans text-xs text-slate-400 max-w-sm mx-auto">
          Type what you're thinking through above, or pick one of the example scenarios to test your assumptions.
        </p>
      </div>
    )
  }

  return (
    <div className="backdrop-blur-2xl bg-[#161922]/80 rounded-2xl p-5 border border-white/10 shadow-xl relative animate-fade-in mb-6">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-medium text-[11px]">Live Stream</span>
          <span className="text-slate-300 font-medium">Gemini Thinking Output</span>
          {isDemoMode && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px]">
              Offline Demo
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-white/10 hover:border-indigo-500/30 active:scale-[0.98] transition text-xs"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Output'}</span>
        </button>
      </div>

      <div className="text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap selection:bg-indigo-500/30 max-h-96 overflow-y-auto">
        {content}
        {isStreaming && (
          <span className="inline-block w-2 h-4 ml-1 bg-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.9)] animate-pulse align-middle rounded-sm" />
        )}
      </div>

      {isStreaming && (
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5 text-xs text-indigo-300 font-medium">
          <Activity className="h-3.5 w-3.5 animate-spin text-indigo-400" />
          <span>Gemini is analyzing your assumptions in real time...</span>
        </div>
      )}
    </div>
  )
}
