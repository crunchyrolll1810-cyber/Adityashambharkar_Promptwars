import React, { useState } from 'react'
import { DecisionAnalysis, VulnerabilityLevel } from '../types/decision.types'
import { ShieldCheck, AlertTriangle, HelpCircle, AlertOctagon, Download, Flame, HelpCircle as QuestionIcon } from 'lucide-react'
import { exportDecisionMemo } from '../utils/exportMemo'

interface DecisionDashboardProps {
  analysis: DecisionAnalysis
  context?: string
  rationale?: string
}

export const DecisionDashboard: React.FC<DecisionDashboardProps> = ({ analysis, context, rationale }) => {
  const [challengedIdx, setChallengedIdx] = useState<number | null>(null)

  const getBadgeStyle = (level: VulnerabilityLevel) => {
    if (level === 'HIGH') return 'bg-rose-500/15 text-rose-300 border-rose-500/30'
    if (level === 'MED') return 'bg-amber-500/15 text-amber-300 border-amber-500/30'
    return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
  }

  const getBadgeText = (level: VulnerabilityLevel) => {
    return level === 'HIGH' ? '🔴 Big Risk' : level === 'MED' ? '🟡 Medium' : '🟢 Minor'
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
    if (score >= 50) return 'text-amber-400 border-amber-500/30 bg-amber-500/10'
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10'
  }

  return (
    <div className="space-y-5 animate-fade-in mb-6">
      {/* 1. What You're Deciding & Export */}
      <div className="backdrop-blur-xl bg-slate-900/60 rounded-2xl p-5 border border-white/10 shadow-2xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">What You're Deciding</span>
            <p className="text-sm font-medium text-slate-100 mt-0.5">{analysis.summary}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportDecisionMemo(analysis, context, rationale)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-500/15 text-brand-300 hover:bg-brand-500/25 border border-brand-500/30 active:scale-[0.98] transition shadow-sm"
              title="Download your decision brief"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export Memo</span>
            </button>
            <div className={`px-3 py-1.5 rounded-xl border font-semibold text-xs flex items-center gap-1.5 ${getScoreColor(analysis.clarityScore)}`}>
              <span>Clarity:</span>
              <span className="text-sm">{analysis.clarityScore}/100</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-200 text-xs">
          <ShieldCheck className="h-4 w-4 shrink-0 text-brand-400" />
          <span>Our Promise: You make the final call. We just help you spot what you might have missed.</span>
        </div>
      </div>

      {/* 2. Things You Might Be Assuming */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <AlertOctagon className="h-4 w-4 text-amber-400" />
          <span>Things You Might Be Assuming ({analysis.unstatedAssumptions.length})</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {analysis.unstatedAssumptions.map((item, idx) => (
            <div key={idx} className="backdrop-blur-xl bg-slate-900/50 rounded-xl p-3.5 border border-white/10 shadow flex flex-col justify-between space-y-2.5">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">Assumption #{idx + 1}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getBadgeStyle(item.vulnerability)}`}>
                    {getBadgeText(item.vulnerability)}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-100">{item.assumption}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{item.reasoning}</p>
              </div>

              <div className="pt-2 border-t border-white/5">
                <button
                  onClick={() => setChallengedIdx(challengedIdx === idx ? null : idx)}
                  className="flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 active:scale-[0.98] transition font-medium"
                >
                  <Flame className="h-3 w-3" />
                  <span>{challengedIdx === idx ? 'Hide Question' : 'Test This Assumption'}</span>
                </button>
                {challengedIdx === idx && (
                  <div className="mt-2 p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/20 text-xs text-rose-200 animate-fade-in space-y-1">
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wide flex items-center gap-1">
                      <QuestionIcon className="h-3 w-3" /> What if this is wrong?
                    </span>
                    <p className="leading-snug text-slate-300">
                      "If this turns out to be false, what is your immediate backup plan?"
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. What Could Go Wrong? (12-Month Reality Check) */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-rose-950/30 to-slate-900/60 rounded-2xl p-4 border border-rose-500/20 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-rose-300 text-xs font-bold uppercase tracking-wider">
          <AlertTriangle className="h-4 w-4 text-rose-400" />
          <span>What Could Go Wrong? (12-Month Reality Check)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {analysis.preMortemScenarios.map((scenario, idx) => (
            <div key={idx} className="bg-slate-950/60 rounded-xl p-3 border border-rose-500/10 space-y-1">
              <div className="text-xs font-semibold text-rose-200">{scenario.whatWentWrong}</div>
              <div className="text-xs text-slate-400">
                <span className="text-rose-400/90 font-medium">Main Reason: </span>
                {scenario.catalyst}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Tough Questions to Ask Yourself */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-indigo-400" />
          <span>Tough Questions to Ask Yourself ({analysis.socraticQuestions.length})</span>
        </h4>
        <div className="space-y-2">
          {analysis.socraticQuestions.map((q, idx) => (
            <div key={idx} className="backdrop-blur-xl bg-slate-900/50 rounded-xl p-3.5 border border-white/10 hover:border-indigo-500/40 transition shadow space-y-1 group">
              <div className="flex items-center justify-between text-xs text-indigo-300">
                <span className="font-semibold">Question #{idx + 1}</span>
                <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-[11px]">{q.reasoningAngle}</span>
              </div>
              <p className="text-xs text-slate-200 group-hover:text-white transition leading-relaxed">"{q.question}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
