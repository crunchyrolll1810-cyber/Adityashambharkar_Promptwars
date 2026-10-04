import React, { useState } from 'react'
import { DecisionAnalysis, VulnerabilityLevel } from '../types/decision.types'
import { ShieldCheck, AlertTriangle, Zap, Sparkles } from 'lucide-react'
import { ClarityGauge } from './ClarityGauge'
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
  const isType1 = analysis.clarityScore < 65

  const badgeStyle: Record<VulnerabilityLevel, string> = {
    HIGH: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    MED: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    LOW: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fade-in">
      {/* Overview & Promise [EXP 01] */}
      <div className="md:col-span-8 rounded-3xl p-6 sm:p-8 bg-[#161922]/85 border border-white/10 shadow-2xl flex flex-col justify-between space-y-4 hover:border-violet-500/30 hover:shadow-[0_20px_50px_-10px_rgba(139,92,246,0.15)] hover:-translate-y-1 transition-all duration-300">
        <div>
          <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2 text-xs">
            <span className="font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wider accent-bar-violet">
              <Sparkles className="h-4 w-4 text-violet-400" /> Decision Breakdown
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-slate-500 font-semibold">[EXP 01]</span>
              <span className="text-xs text-emerald-400 font-mono font-semibold">● LIVE</span>
            </div>
          </div>
          <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans">{analysis.summary}</p>
        </div>
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-200 text-xs">
          <ShieldCheck className="h-4 w-4 shrink-0 text-violet-400" />
          <span>Our Promise: ReasonLens never decides for you. We stress-test your logic so you decide with conviction.</span>
        </div>
      </div>

      {/* Animated Clarity Gauge */}
      <ClarityGauge
        score={analysis.clarityScore}
        isType1={isType1}
        clarityBoost={analysis.clarityBoost}
        analysis={analysis}
        context={context}
        rationale={rationale}
      />

      {/* Assumptions Matrix [EXP 02] */}
      <div className="col-span-12 rounded-3xl p-6 sm:p-8 bg-[#161922]/85 border border-white/10 shadow-2xl space-y-4 hover:border-amber-500/30 hover:shadow-[0_20px_50px_-10px_rgba(245,158,11,0.12)] transition-all duration-300">
        <div className="flex items-center justify-between border-b border-white/5 pb-3 text-xs">
          <span className="font-bold uppercase tracking-wider text-slate-200 accent-bar-violet">
            Things You Might Be Taking For Granted ({analysis.unstatedAssumptions.length})
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-slate-500 font-semibold">[EXP 02]</span>
            <span className="text-slate-400 text-xs font-mono">[STRESS-TEST]</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analysis.unstatedAssumptions.map((item, idx) => (
            <div key={idx} className="rounded-2xl p-4 sm:p-5 bg-[#0B0E14]/85 border border-white/10 hover:border-amber-500/50 hover:shadow-[0_0_25px_-5px_rgba(245,158,11,0.25)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between space-y-3 shadow-md">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold font-mono">#{idx + 1}</span>
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

      {/* 12-Month Reality Check Timeline [EXP 03] */}
      <div className="col-span-12 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-rose-950/20 to-[#161922]/85 border border-rose-500/25 shadow-2xl space-y-4 hover:border-rose-500/50 hover:shadow-[0_20px_50px_-10px_rgba(244,63,94,0.15)] transition-all duration-300">
        <div className="flex items-center justify-between border-b border-rose-500/20 pb-3 text-xs text-rose-300">
          <span className="font-bold uppercase tracking-wider flex items-center gap-1.5 border-l-2 border-rose-500 pl-3">
            <AlertTriangle className="h-4 w-4" /> 12-Month Reality Check Timeline
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-rose-400/80 font-semibold">[EXP 03]</span>
            <span className="text-xs text-rose-400 font-mono">[PRE-MORTEM]</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.preMortemScenarios.map((scenario, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#0B0E14]/85 border border-rose-500/20 hover:border-rose-500/40 hover:-translate-y-0.5 transition-all space-y-1.5 shadow-md">
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
