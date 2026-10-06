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
    HIGH: 'bg-rose-500/15 text-rose-300 border-rose-500/40',
    MED: 'bg-papaya/15 text-papaya border-papaya/40',
    LOW: 'bg-volt/15 text-volt border-volt/40'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fade-in">
      {/* Race Debrief & Promise [EXP 01] */}
      <div className="spotlight-card md:col-span-8 rounded-3xl p-6 sm:p-8 bg-[#12141C]/90 border border-white/10 shadow-2xl flex flex-col justify-between space-y-4 hover:border-volt/40 hover:shadow-[0_20px_50px_-10px_rgba(210,255,0,0.12)] hover:-translate-y-1 transition-all duration-300">
        <div>
          <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2 text-xs">
            <span className="font-black text-slate-200 flex items-center gap-1.5 uppercase tracking-wider accent-bar-volt">
              <Sparkles className="h-4 w-4 text-volt" /> Decision Breakdown
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-volt font-bold">[EXP 01]</span>
              <span className="text-xs text-volt font-mono font-bold shadow-[0_0_8px_rgba(210,255,0,0.3)]">● LIVE TELEMETRY</span>
            </div>
          </div>
          <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans">{analysis.summary}</p>
        </div>
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-volt/10 border border-volt/25 text-volt text-xs font-medium">
          <ShieldCheck className="h-4 w-4 shrink-0 text-volt" />
          <span>Our Promise: ReasonLens never decides for you. We stress-test your racing line so you decide with conviction.</span>
        </div>
      </div>

      <ClarityGauge score={analysis.clarityScore} isType1={isType1} clarityBoost={analysis.clarityBoost} analysis={analysis} context={context} rationale={rationale} />

      {/* Blind Spot Risk Alert Chips */}
      {analysis.blindSpotRisks && analysis.blindSpotRisks.length > 0 && (
        <div className="col-span-12 flex flex-wrap items-center gap-2 px-1 py-0.5">
          <span className="font-mono text-[11px] text-papaya font-bold uppercase tracking-wider flex items-center gap-1.5 mr-1">
            <span>⚡ Blind Spot Alerts:</span>
          </span>
          {analysis.blindSpotRisks.map((bs, i) => (
            <div key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-papaya/10 border border-papaya/30 text-papaya text-xs font-semibold shadow-sm">
              <span className="font-mono text-[10px] text-papaya font-bold uppercase">{bs.impactArea}:</span>
              <span className="text-slate-100">{bs.risk}</span>
            </div>
          ))}
        </div>
      )}

      {/* Assumptions Matrix [EXP 02] */}
      <div className="spotlight-card col-span-12 rounded-3xl p-6 sm:p-8 bg-[#12141C]/90 border border-white/10 shadow-2xl space-y-4 hover:border-volt/30 transition-all duration-300">
        <div className="flex items-center justify-between border-b border-white/5 pb-3 text-xs">
          <span className="font-black uppercase tracking-wider text-slate-200 accent-bar-volt">
            Things You Might Be Taking For Granted ({analysis.unstatedAssumptions.length})
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-volt font-bold">[EXP 02]</span>
            <span className="text-slate-400 text-xs font-mono font-semibold">[STRESS-TEST]</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analysis.unstatedAssumptions.map((item, idx) => (
            <div key={idx} className="rounded-2xl p-4 sm:p-5 bg-[#090A0F] border border-white/10 hover:border-volt/50 hover:shadow-[0_0_25px_-5px_rgba(210,255,0,0.25)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between space-y-3 shadow-md">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold font-mono">#{idx + 1}</span>
                  <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${badgeStyle[item.vulnerability]}`}>
                    {item.vulnerability === 'HIGH' ? '🔴 High Risk' : item.vulnerability === 'MED' ? '🟡 Medium' : '🟢 Minor'}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-100">{item.assumption}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{item.reasoning}</p>
              </div>
              <div className="pt-2 border-t border-white/5">
                <button type="button" aria-expanded={challengedIdx === idx} aria-label={`Stress-test assumption ${idx + 1}: ${item.assumption}`} onClick={() => setChallengedIdx(challengedIdx === idx ? null : idx)} className="flex items-center gap-1.5 text-xs text-volt hover:text-[#E2FF4D] active:scale-[0.97] transition font-bold">
                  <Zap className="h-3.5 w-3.5 text-volt" />
                  <span>{challengedIdx === idx ? 'Close stress-test' : '⚡ Stress-test this'}</span>
                </button>
                {challengedIdx === idx && (
                  <div className="mt-2.5 p-3 rounded-xl bg-volt/10 border border-volt/30 text-xs text-slate-200 animate-fade-in space-y-2">
                    <div><span className="font-bold text-volt text-[11px]">Real-World 48h Test:</span><p className="text-slate-300 text-xs leading-snug mt-0.5">Test this assumption with 3 actual customers or teammates before investing more time.</p></div>
                    <div><span className="font-bold text-rose-400 text-[11px]">Tripwire Warning Sign:</span><p className="text-slate-300 text-xs leading-snug mt-0.5">If validation metrics stall for 2 consecutive weeks, pause and adjust course.</p></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 12-Month Pre-Mortem Timeline [EXP 03] */}
      <div className="spotlight-card col-span-12 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-rose-950/20 to-[#12141C]/95 border border-rose-500/25 shadow-2xl space-y-4 hover:border-rose-500/50 transition-all duration-300">
        <div className="flex items-center justify-between border-b border-rose-500/20 pb-3 text-xs text-rose-300">
          <span className="font-black uppercase tracking-wider flex items-center gap-1.5 border-l-2 border-rose-500 pl-3">
            <AlertTriangle className="h-4 w-4" /> 12-Month Reality Check Timeline
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-rose-400/80 font-bold">[EXP 03]</span>
            <span className="text-xs text-rose-400 font-mono font-bold">[PRE-MORTEM]</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.preMortemScenarios.map((scenario, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#090A0F] border border-rose-500/25 hover:border-rose-500/40 hover:-translate-y-0.5 transition-all space-y-1.5 shadow-md">
              <div className="text-xs font-bold text-rose-200">Stage {idx + 1}: {scenario.whatWentWrong}</div>
              <div className="text-xs text-slate-400"><span className="text-rose-400 font-semibold">Root Catalyst: </span>{scenario.catalyst}</div>
            </div>
          ))}
        </div>
      </div>

      <ReflectionSection questions={analysis.socraticQuestions} reflections={reflections} onChangeReflection={onChangeReflection} onReEvaluate={onReEvaluate} isReevaluating={isReevaluating} />
    </div>
  )
}
