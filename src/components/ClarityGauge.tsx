import React, { useState, useEffect } from 'react'
import { DecisionAnalysis } from '../types/decision.types'
import { exportDecisionMemo, generateMemoText } from '../utils/exportMemo'
import { TrendingUp, Copy, Check, Printer, Download } from 'lucide-react'

interface Props {
  score: number
  isType1: boolean
  clarityBoost?: number
  analysis: DecisionAnalysis
  context?: string
  rationale?: string
}

export const ClarityGauge: React.FC<Props> = ({
  score, isType1, clarityBoost, analysis, context, rationale
}) => {
  const [displayedScore, setDisplayedScore] = useState(0)
  const [copied, setCopied] = useState(false)
  const circ = 2 * Math.PI * 30

  useEffect(() => {
    const duration = 900
    const startTime = performance.now()
    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      setDisplayedScore(Math.round(easeProgress * score))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [score])

  const strokeColor = displayedScore >= 75 ? '#D2FF00' : displayedScore >= 55 ? '#FF8000' : '#F43F5E'
  const strokeOffset = circ - (circ * displayedScore) / 100
  const verdict = score >= 75 ? 'Strong conviction with resilient assumptions.' : score >= 55 ? 'Good foundation, but key assumptions need validation.' : 'Fragile reasoning: critical untested blind spots present.'

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMemoText(analysis, context, rationale))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="spotlight-card md:col-span-4 rounded-3xl p-6 sm:p-7 bg-[#12141C]/90 border border-white/10 shadow-2xl flex flex-col justify-between space-y-4 hover:border-volt/40 hover:shadow-[0_20px_50px_-10px_rgba(210,255,0,0.15)] hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="font-mono text-[10px] text-volt font-bold">[GAUGE 01]</span>
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold">Confidence Metric</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative flex items-center justify-center">
          <svg className="w-20 h-20 transform -rotate-90">
            <circle cx="40" cy="40" r="30" stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="transparent" />
            <circle cx="40" cy="40" r="30" stroke={strokeColor} strokeWidth="6" strokeDasharray={circ} strokeDashoffset={strokeOffset} strokeLinecap="round" fill="transparent" className="transition-all duration-300 ease-out" />
          </svg>
          <span className="absolute font-black text-lg text-white font-mono">{displayedScore}%</span>
        </div>

        <div className="text-right space-y-1.5">
          <div className="flex items-center justify-end gap-1.5">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Clarity</span>
            {clarityBoost && (
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-volt/20 border border-volt/50 text-volt flex items-center gap-0.5 animate-pulse shadow-[0_0_10px_rgba(210,255,0,0.2)]">
                <TrendingUp className="h-2.5 w-2.5" /> +{clarityBoost}% DELTA
              </span>
            )}
          </div>
          <span className={`inline-block text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${isType1 ? 'bg-rose-500/15 text-rose-300 border-rose-500/40' : 'bg-volt/15 text-volt border-volt/40'}`}>
            {isType1 ? 'Type 1: Hard to Reverse' : 'Type 2: Easy to Reverse'}
          </span>
        </div>
      </div>

      <p className="text-xs text-slate-300 leading-snug">{verdict}</p>

      <div className="flex gap-2 pt-2 border-t border-white/5">
        <button onClick={handleCopy} aria-label="Copy memo" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-volt/20 hover:text-volt hover:border-volt/30 text-slate-200 border border-white/10 active:scale-[0.97] transition">
          {copied ? <Check className="h-3.5 w-3.5 text-volt" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Memo'}</span>
        </button>
        <button onClick={() => window.print()} aria-label="Print or save memo as PDF" className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 active:scale-[0.97] transition" title="Print / PDF"><Printer className="h-3.5 w-3.5" /></button>
        <button onClick={() => exportDecisionMemo(analysis, context, rationale)} aria-label="Download memo as Markdown" className="px-3 py-2 rounded-xl text-xs font-bold bg-volt/15 hover:bg-volt/25 text-volt border border-volt/40 active:scale-[0.97] transition" title="Download Markdown"><Download className="h-3.5 w-3.5" /></button>
      </div>
    </div>
  )
}
