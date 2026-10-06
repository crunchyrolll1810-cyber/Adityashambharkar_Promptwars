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
      <div className="backdrop-blur-2xl bg-[#0D0E12]/95 rounded-3xl p-10 text-center border border-white/10 shadow-2xl">
        <div className="inline-flex p-3.5 rounded-2xl bg-volt/10 text-volt mb-3 border border-volt/30 shadow-[0_0_15px_rgba(210,255,0,0.15)]">
          <Terminal className="h-6 w-6 text-volt" />
        </div>
        <h4 className="font-sans text-white font-black text-sm mb-1 uppercase tracking-wider">Ready to Run Decision Telemetry</h4>
        <p className="font-sans text-xs text-slate-400 max-w-sm mx-auto">
          Type your decision context above, or select a Grand Prix scenario to initiate full throttle telemetry.
        </p>
      </div>
    )
  }

  return (
    <div className="backdrop-blur-2xl bg-[#0D0E12]/95 rounded-3xl p-6 border border-white/10 shadow-2xl relative animate-fade-in hover:border-volt/30 transition-all">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-volt/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono text-[10px] text-volt font-bold">[TELEMETRY STREAM]</span>
          <span className="font-mono text-slate-300 font-medium text-[11px]">gemini-telemetry-feed.json</span>
          {isDemoMode && (
            <span className="font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px]">
              OFFLINE
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-slate-300 hover:text-volt bg-white/5 border border-white/10 hover:border-volt/40 active:scale-[0.97] transition text-xs font-bold"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-volt" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Output'}</span>
        </button>
      </div>

      <div className="text-xs text-volt/90 leading-relaxed font-mono whitespace-pre-wrap selection:bg-volt/30 max-h-96 overflow-y-auto p-4 rounded-2xl bg-[#050608] border border-white/5">
        {content}
        {isStreaming && (
          <span className="inline-block w-2.5 h-4 ml-1 bg-volt shadow-[0_0_14px_rgba(210,255,0,0.9)] animate-pulse align-middle rounded-sm" />
        )}
      </div>

      {isStreaming && (
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5 text-xs text-volt font-mono font-bold">
          <Activity className="h-3.5 w-3.5 animate-spin text-volt" />
          <span>[TELEMETRY: Gemini reasoning engine running full throttle...]</span>
        </div>
      )}
    </div>
  )
}
