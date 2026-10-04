import React from 'react'
import { DecisionAnalysis, VulnerabilityLevel } from '../types/decision.types'
import { ShieldCheck, AlertTriangle, HelpCircle, Eye } from 'lucide-react'

interface DecisionDashboardProps {
  analysis: DecisionAnalysis
}

export const DecisionDashboard: React.FC<DecisionDashboardProps> = ({ analysis }) => {
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
      {/* 1. Summary & Promise */}
      <div className="backdrop-blur-xl bg-slate-900/60 rounded-2xl p-5 border border-white/10 shadow-2xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Your Decision Summary</span>
            <p className="text-sm font-medium text-slate-200 mt-0.5">{analysis.summary}</p>
          </div>
          <div className={`px-4 py-2 rounded-xl border font-mono font-bold text-sm flex items-center gap-2 ${getScoreColor(analysis.clarityScore)}`}>
            <span>Clarity:</span>
            <span className="text-base">{analysis.clarityScore}/100</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs">
          <ShieldCheck className="h-4 w-4 shrink-0 text-brand-400" />
          <span className="italic font-medium">"We won't make the decision for you. We just help you spot what might be missing."</span>
        </div>
      </div>

      {/* 2. Hidden Assumptions Grid */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Eye className="h-4 w-4 text-amber-400" />
          <span>Things You Might Be Assuming ({analysis.unstatedAssumptions.length})</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {analysis.unstatedAssumptions.map((item, idx) => (
            <div key={idx} className="backdrop-blur-xl bg-slate-900/50 rounded-xl p-3.5 border border-white/10 shadow space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">Assumption #{idx + 1}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getBadgeStyle(item.vulnerability)}`}>
                  {item.vulnerability === 'HIGH' ? '🔴 Big Risk' : item.vulnerability === 'MED' ? '🟡 Medium' : '🟢 Minor'}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-100">{item.assumption}</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">{item.reasoning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 12-Month Check: What Could Go Wrong */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-rose-950/40 to-slate-900/60 rounded-2xl p-4 border border-rose-500/20 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
          <AlertTriangle className="h-4 w-4" />
          <span>What Could Go Wrong? (12-Month Worst-Case Check)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {analysis.preMortemScenarios.map((scenario, idx) => (
            <div key={idx} className="bg-slate-950/60 rounded-xl p-3 border border-rose-500/10 space-y-1.5">
              <div className="text-xs font-semibold text-rose-200">{scenario.whatWentWrong}</div>
              <div className="text-[11px] text-slate-400">
                <span className="text-rose-400/80 font-medium">Main Cause: </span>
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
            <div key={idx} className="backdrop-blur-xl bg-slate-900/50 rounded-xl p-3.5 border border-white/10 hover:border-indigo-500/40 transition shadow space-y-1.5 group">
              <div className="flex items-center justify-between text-[10px] text-indigo-300 font-mono">
                <span>Question #{idx + 1}</span>
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
