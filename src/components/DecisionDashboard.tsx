import React, { useState } from 'react'
import { DecisionAnalysis, VulnerabilityLevel } from '../types/decision.types'
import { ShieldCheck, AlertTriangle, Download, Copy, Check, Printer, Zap, Sparkles, TrendingUp } from 'lucide-react'
import { exportDecisionMemo, generateMemoText } from '../utils/exportMemo'
import { ReflectionSection } from './ReflectionSection'

interface Props {
  analysis: DecisionAnalysis; context?: string; rationale?: string
  reflections: Record<number, string>; onChangeReflection: (idx: number, val: string) => void
  onReEvaluate: () => void; isReevaluating?: boolean
}

export const DecisionDashboard: React.FC<Props> = ({
  analysis, context, rationale, reflections, onChangeReflection, onReEvaluate, isReevaluating
}) => {
  const [challengedIdx, setChallengedIdx] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const isType1 = analysis.clarityScore < 65, score = analysis.clarityScore, circ = 2 * Math.PI * 26
  const strokeDashoffset = circ - (circ * score) / 100
  const handleCopy = () => { navigator.clipboard.writeText(generateMemoText(analysis, context, rationale)); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  const badgeStyle: Record<VulnerabilityLevel, string> = {
    HIGH: 'bg-rose-500/15 text-rose-300 border-rose-500/30', MED: 'bg-amber-500/15 text-amber-300 border-amber-500/30', LOW: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
  }

  const verdict = score >= 75 ? 'Strong conviction with resilient assumptions.' : score >= 55 ? 'Good foundation, but key assumptions carry risk.' : 'Fragile foundation: several untested blind spots present.'

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fade-in">
      {/* Overview & Promise */}
      <div className="md:col-span-8 rounded-3xl p-6 sm:p-8 bg-[#161922]/85 border border-white/10 shadow-2xl flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
        <div>
          <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2 text-xs">
            <span className="font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-indigo-400" /> Decision Breakdown
            </span>
            <span className="text-xs text-emerald-400 font-semibold">● Analysis Complete</span>
          </div>
          <p className="text-sm sm:text-base text-slate-100 leading-relaxed">{analysis.summary}</p>
        </div>
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-xs">
          <ShieldCheck className="h-4 w-4 shrink-0 text-indigo-400" />
          <span>Our Promise: ReasonLens never decides for you. We stress-test your logic so you decide with conviction.</span>
        </div>
      </div>

      {/* Clarity Meter & Action Bar */}
      <div className="md:col-span-4 rounded-3xl p-6 sm:p-8 bg-[#161922]/85 border border-white/10 shadow-2xl flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
        <div className="flex items-center justify-between">
          <div className="relative flex items-center justify-center">
            <svg className="w-18 h-18 transform -rotate-90">
              <circle cx="36" cy="36" r="30" stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="transparent" />
              <circle cx="36" cy="36" r="30" stroke={score >= 70 ? '#10B981' : score >= 50 ? '#F59E0B' : '#F43F5E'} strokeWidth="6" strokeDasharray={circ} strokeDashoffset={strokeDashoffset} strokeLinecap="round" fill="transparent" className="transition-all duration-700 ease-out" />
            </svg>
            <span className="absolute font-extrabold text-base text-white">{score}%</span>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center justify-end gap-1.5">
              <span className="text-xs text-slate-400 font-medium">Clarity Score</span>
              {analysis.clarityBoost && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-0.5 animate-pulse">
                  <TrendingUp className="h-2.5 w-2.5" /> +{analysis.clarityBoost}%
                </span>
              )}
            </div>
            <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border ${isType1 ? 'bg-rose-500/15 text-rose-300 border-rose-500/40' : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'}`}>
              {isType1 ? 'Type 1: Hard to Reverse' : 'Type 2: Easy to Reverse'}
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-snug">{verdict}</p>
        <div className="flex gap-2 pt-2 border-t border-white/5">
          <button onClick={handleCopy} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 active:scale-[0.97] transition">
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Memo'}</span>
          </button>
          <button onClick={() => window.print()} className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 active:scale-[0.97] transition" title="Print / PDF"><Printer className="h-3.5 w-3.5" /></button>
          <button onClick={() => exportDecisionMemo(analysis, context, rationale)} className="px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 active:scale-[0.97] transition" title="Download Markdown"><Download className="h-3.5 w-3.5" /></button>
        </div>
      </div>

      {/* Assumptions Matrix */}
      <div className="col-span-12 rounded-3xl p-6 sm:p-8 bg-[#161922]/85 border border-white/10 shadow-2xl space-y-4 hover:border-white/20 transition-all">
        <div className="flex items-center justify-between border-b border-white/5 pb-3 text-xs">
          <span className="font-bold uppercase tracking-wider text-slate-200">Things You Might Be Taking For Granted ({analysis.unstatedAssumptions.length})</span>
          <span className="text-slate-400 text-xs">Click to stress-test</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analysis.unstatedAssumptions.map((item, idx) => (
            <div key={idx} className="rounded-2xl p-4 sm:p-5 bg-[#0B0E14]/85 border border-white/10 hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between space-y-3 shadow-md">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold">Assumption #{idx + 1}</span>
                  <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${badgeStyle[item.vulnerability]}`}>
                    {item.vulnerability === 'HIGH' ? '🔴 High Risk' : item.vulnerability === 'MED' ? '🟡 Medium' : '🟢 Minor'}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-100">{item.assumption}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{item.reasoning}</p>
              </div>
              <div className="pt-2 border-t border-white/5">
                <button onClick={() => setChallengedIdx(challengedIdx === idx ? null : idx)} className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 active:scale-[0.97] transition font-semibold">
                  <Zap className="h-3.5 w-3.5" />
                  <span>{challengedIdx === idx ? 'Close stress-test' : '⚡ Stress-test this'}</span>
                </button>
                {challengedIdx === idx && (
                  <div className="mt-2.5 p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 animate-fade-in space-y-2">
                    <div><span className="font-bold text-amber-400 text-[11px]">Real-World 48h Test:</span><p className="text-slate-300 text-xs leading-snug mt-0.5">Test this assumption with 3 actual customers or teammates before investing more time.</p></div>
                    <div><span className="font-bold text-rose-400 text-[11px]">Tripwire Warning Sign:</span><p className="text-slate-300 text-xs leading-snug mt-0.5">If validation metrics stall for 2 consecutive weeks, pause and adjust course.</p></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 12-Month Reality Check Timeline */}
      <div className="col-span-12 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-rose-950/20 to-[#161922]/85 border border-rose-500/25 shadow-2xl space-y-4 hover:border-rose-500/40 transition-all">
        <div className="flex items-center justify-between border-b border-rose-500/20 pb-3 text-xs text-rose-300">
          <span className="font-bold uppercase tracking-wider flex items-center gap-1.5"><AlertTriangle className="h-4 w-4" /> 12-Month Reality Check Timeline</span>
          <span className="text-xs text-rose-400">Worst-case forecast</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.preMortemScenarios.map((scenario, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#0B0E14]/85 border border-rose-500/20 hover:-translate-y-0.5 transition-all space-y-1.5 shadow-md">
              <div className="text-xs font-bold text-rose-200">Stage {idx + 1}: {scenario.whatWentWrong}</div>
              <div className="text-xs text-slate-400"><span className="text-rose-400 font-semibold">Root Catalyst: </span>{scenario.catalyst}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Continuous Reflection Loop with Great Sage */}
      <ReflectionSection
        questions={analysis.socraticQuestions}
        reflections={reflections}
        onChangeReflection={onChangeReflection}
        onReEvaluate={onReEvaluate}
        isReevaluating={isReevaluating}
      />
    </div>
  )
}
