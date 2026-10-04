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
      <div className="backdrop-blur-2xl bg-slate-900/60 rounded-2xl p-10 text-center border border-white/10 mb-6 shadow-xl">
        <div className="inline-flex p-3 rounded-2xl bg-violet-500/10 text-violet-400 mb-3 border border-violet-500/20">
          <Terminal className="h-6 w-6" />
        </div>
        <h4 className="font-sans text-slate-200 font-semibold text-sm mb-1">Ready to Review Your Decision</h4>
        <p className="font-sans text-xs text-slate-400 max-w-sm mx-auto">
          Type what you are deciding above, or pick one of the sample test vectors to start the interrogation.
        </p>
      </div>
    )
  }

  return (
    <div className="backdrop-blur-2xl bg-slate-900/60 rounded-2xl p-5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] relative animate-fade-in mb-6">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5 font-mono text-[10px]">
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded bg-violet-500/20 border border-violet-500/30 text-violet-300 font-bold">STREAM</span>
          <span className="uppercase text-slate-300 font-semibold">LIVE REASONING TELEMETRY</span>
          {isDemoMode && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
              OFFLINE DEMO
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-slate-300 hover:text-white bg-slate-950 border border-white/10 hover:border-violet-500/30 active:scale-[0.98] transition"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? 'COPIED' : 'COPY JSON'}</span>
        </button>
      </div>

      <div className="text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap selection:bg-violet-500/30 max-h-96 overflow-y-auto">
        {content}
        {isStreaming && (
          <span className="inline-block w-2 h-4 ml-1 bg-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.9)] animate-pulse align-middle rounded-sm" />
        )}
      </div>

      {isStreaming && (
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-violet-300">
          <Activity className="h-3.5 w-3.5 animate-spin" />
          <span>Interrogating latent decision graph...</span>
        </div>
      )}
    </div>
  )
}
