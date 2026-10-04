import React, { useState } from 'react'
import { DecisionAnalysis, VulnerabilityLevel } from '../types/decision.types'
import { ShieldCheck, Skull, HelpCircle, AlertOctagon, Download, Flame, Zap } from 'lucide-react'
import { exportDecisionMemo } from '../utils/exportMemo'

interface DecisionDashboardProps {
  analysis: DecisionAnalysis
  context?: string
  rationale?: string
}

export const DecisionDashboard: React.FC<DecisionDashboardProps> = ({ analysis, context, rationale }) => {
  const [challengedIdx, setChallengedIdx] = useState<number | null>(null)

  const getBadgeStyle = (level: VulnerabilityLevel) => {
    switch (level) {
      case 'HIGH':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30'
      case 'MED':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30'
      case 'LOW':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
    if (score >= 50) return 'text-amber-400 border-amber-500/30 bg-amber-500/10'
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10'
  }

  return (
    <div className="space-y-5 animate-fade-in mb-6">
      {/* 1. Clarity Score Header & Export Memo */}
      <div className="backdrop-blur-xl bg-slate-900/60 rounded-2xl p-5 border border-white/10 shadow-2xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">Executive Synopsis</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-white/5">LABS-EXP</span>
            </div>
            <p className="text-sm font-medium text-slate-200 mt-1">{analysis.summary}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportDecisionMemo(analysis, context, rationale)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-brand-500/15 text-brand-300 hover:bg-brand-500/25 border border-brand-500/30 active:scale-[0.98] transition shadow-sm"
              title="Download formatted Markdown Decision Memo"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export Memo</span>
            </button>
            <div className={`px-3.5 py-1.5 rounded-xl border font-mono font-bold text-xs flex items-center gap-1.5 ${getScoreColor(analysis.clarityScore)}`}>
              <span>Clarity:</span>
              <span className="text-sm">{analysis.clarityScore}/100</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs">
          <ShieldCheck className="h-4 w-4 shrink-0 text-brand-400" />
          <span className="italic">"ReasonLens never decides for you. We stress-test your logic so you decide with conviction."</span>
        </div>
      </div>

      {/* 2. Unstated Assumptions Grid with Interactive Stress-Testing */}
      <div className="space-y-2">
        <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <AlertOctagon className="h-4 w-4 text-amber-400" />
          <span>Unmasked Fragile Assumptions ({analysis.unstatedAssumptions.length})</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {analysis.unstatedAssumptions.map((item, idx) => (
            <div key={idx} className="backdrop-blur-xl bg-slate-900/50 rounded-xl p-3.5 border border-white/10 shadow flex flex-col justify-between space-y-2.5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">Assumption #{idx + 1}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getBadgeStyle(item.vulnerability)}`}>
                    {item.vulnerability === 'HIGH' ? '🔴 HIGH' : item.vulnerability === 'MED' ? '🟡 MED' : '🟢 LOW'}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-100">{item.assumption}</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">{item.reasoning}</p>
              </div>

              {/* Interactive Inverted Stress-Testing */}
              <div className="pt-2 border-t border-white/5">
                <button
                  onClick={() => setChallengedIdx(challengedIdx === idx ? null : idx)}
                  className="flex items-center gap-1.5 text-[11px] font-mono text-brand-400 hover:text-brand-300 active:scale-[0.98] transition"
                >
                  <Flame className="h-3 w-3" />
                  <span>{challengedIdx === idx ? 'Hide Stress-Test' : 'Challenge Assumption'}</span>
                </button>
                {challengedIdx === idx && (
                  <div className="mt-2 p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/20 text-[11px] text-rose-200 animate-fade-in space-y-1">
                    <span className="font-mono text-[10px] font-bold text-rose-400 flex items-center gap-1">
                      <Zap className="h-3 w-3" /> INVERTED FAILURE VECTOR:
                    </span>
                    <p className="italic leading-snug">
                      "If this assumption collapses immediately, what single milestone or cash runway fails first?"
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 12-Month Pre-Mortem Failure Simulation */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-rose-950/40 to-slate-900/60 rounded-2xl p-4 border border-rose-500/20 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Skull className="h-4 w-4" />
          <span>12-Month Pre-Mortem: Prospective Failure Simulation</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {analysis.preMortemScenarios.map((scenario, idx) => (
            <div key={idx} className="bg-slate-950/60 rounded-xl p-3 border border-rose-500/10 space-y-1.5">
              <div className="text-xs font-semibold text-rose-200">{scenario.whatWentWrong}</div>
              <div className="text-[11px] text-slate-400">
                <span className="text-rose-400/80 font-medium">Root Catalyst: </span>
                {scenario.catalyst}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Socratic Probing Questions */}
      <div className="space-y-2">
        <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-indigo-400" />
          <span>Piercing Socratic Inquiries ({analysis.socraticQuestions.length})</span>
        </h4>
        <div className="space-y-2">
          {analysis.socraticQuestions.map((q, idx) => (
            <div key={idx} className="backdrop-blur-xl bg-slate-900/50 rounded-xl p-3.5 border border-white/10 hover:border-indigo-500/40 transition shadow space-y-1.5 group">
              <div className="flex items-center justify-between text-[10px] text-indigo-300 font-mono">
                <span>Inquiry #{idx + 1}</span>
                <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20">{q.reasoningAngle}</span>
              </div>
              <p className="text-xs font-medium text-slate-100 group-hover:text-indigo-200 transition">"{q.question}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
