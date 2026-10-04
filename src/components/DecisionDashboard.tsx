import React, { useState } from 'react'
import { DecisionAnalysis, VulnerabilityLevel } from '../types/decision.types'
import { ShieldCheck, AlertTriangle, HelpCircle, Download, Flame, Zap } from 'lucide-react'
import { exportDecisionMemo } from '../utils/exportMemo'

interface DecisionDashboardProps { analysis: DecisionAnalysis; context?: string; rationale?: string }

export const DecisionDashboard: React.FC<DecisionDashboardProps> = ({ analysis, context, rationale }) => {
  const [challengedIdx, setChallengedIdx] = useState<number | null>(null)
  const isType1 = analysis.clarityScore < 65
  const badgeStyle: Record<VulnerabilityLevel, string> = {
    HIGH: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    MED: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    LOW: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 animate-fade-in mb-6">
      {/* EXP 01: Executive Synopsis */}
      <div className="group md:col-span-8 rounded-2xl p-5 backdrop-blur-2xl bg-slate-900/60 border border-white/10 hover:border-violet-500/30 transition-all shadow-xl flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between mb-2.5 border-b border-white/5 pb-2 font-mono text-[10px] tracking-widest text-slate-400">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-violet-300 font-bold">EXP 01</span>
              <span className="uppercase text-slate-300">EXECUTIVE SYNOPSIS</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">● LIVE</span>
          </div>
          <p className="text-sm font-medium text-slate-100 leading-relaxed">{analysis.summary}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-200 text-xs">
          <ShieldCheck className="h-4 w-4 shrink-0 text-violet-400" />
          <span>Our Promise: You make the final call. We just help you spot what you might have missed.</span>
        </div>
      </div>

      {/* EXP 02: Logic Clarity & Decision Matrix */}
      <div className="group md:col-span-4 rounded-2xl p-5 backdrop-blur-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 transition-all shadow-xl flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between mb-2 border-b border-white/5 pb-2 font-mono text-[10px] tracking-widest text-slate-400">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300 font-bold">EXP 02</span>
            <span className="uppercase text-slate-300">DECISION MATRIX</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">EVAL</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">Clarity Score</span>
            <span className="text-2xl font-bold font-mono text-white">{analysis.clarityScore}<span className="text-xs text-slate-500">/100</span></span>
          </div>
          <span className={`font-mono text-[10px] font-bold px-2.5 py-1 rounded-full border ${isType1 ? 'bg-rose-500/15 text-rose-300 border-rose-500/40' : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'}`}>
            {isType1 ? 'DOOR: TYPE 1' : 'DOOR: TYPE 2'}
          </span>
        </div>
        <button
          onClick={() => exportDecisionMemo(analysis, context, rationale)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-mono font-semibold bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/40 active:scale-[0.98] transition shadow-sm"
        >
          <Download className="h-3.5 w-3.5" />
          <span>EXPORT DECISION MEMO</span>
        </button>
      </div>

      {/* EXP 03: Things You Might Be Assuming */}
      <div className="col-span-12 rounded-2xl p-5 backdrop-blur-2xl bg-slate-900/60 border border-white/10 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5 font-mono text-[10px] tracking-widest text-slate-400">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-amber-300 font-bold">EXP 03</span>
            <span className="uppercase text-slate-300">THINGS YOU MIGHT BE ASSUMING ({analysis.unstatedAssumptions.length})</span>
          </div>
          <span className="text-slate-500">INTERACTIVE STRESS-TEST</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {analysis.unstatedAssumptions.map((item, idx) => (
            <div key={idx} className="rounded-xl p-3.5 bg-slate-950/60 border border-white/10 hover:border-amber-500/30 transition flex flex-col justify-between space-y-2.5">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-slate-400 font-semibold">ASSUMPTION #{idx + 1}</span>
                  <span className={`px-2 py-0.5 rounded-full border font-bold ${badgeStyle[item.vulnerability]}`}>
                    {item.vulnerability === 'HIGH' ? '🔴 BIG RISK' : item.vulnerability === 'MED' ? '🟡 MEDIUM' : '🟢 MINOR'}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-100">{item.assumption}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{item.reasoning}</p>
              </div>
              <div className="pt-2 border-t border-white/5">
                <button
                  onClick={() => setChallengedIdx(challengedIdx === idx ? null : idx)}
                  className="font-mono flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 active:scale-[0.98] transition font-medium"
                >
                  <Flame className="h-3 w-3" />
                  <span>{challengedIdx === idx ? 'HIDE TEST' : 'CHALLENGE ASSUMPTION'}</span>
                </button>
                {challengedIdx === idx && (
                  <div className="mt-2 p-2 rounded-lg bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200 animate-fade-in space-y-1">
                    <span className="font-mono text-[10px] font-bold text-rose-400 flex items-center gap-1"><Zap className="h-3 w-3" /> INVERTED FAILURE VECTOR:</span>
                    <p className="leading-snug text-slate-300 italic">"If this collapses tomorrow, what single metric or cash runway fails first?"</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EXP 04: 12-Month Reality Check */}
      <div className="md:col-span-6 rounded-2xl p-5 backdrop-blur-2xl bg-gradient-to-br from-rose-950/30 to-slate-900/60 border border-rose-500/30 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-rose-500/20 pb-2.5 font-mono text-[10px] tracking-widest text-rose-400">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold">EXP 04</span>
            <span className="uppercase">12-MONTH REALITY CHECK</span>
          </div>
          <AlertTriangle className="h-3.5 w-3.5" />
        </div>
        <div className="space-y-2.5">
          {analysis.preMortemScenarios.map((scenario, idx) => (
            <div key={idx} className="bg-slate-950/70 rounded-xl p-3 border border-rose-500/15 space-y-1">
              <div className="text-xs font-semibold text-rose-200">{scenario.whatWentWrong}</div>
              <div className="text-xs text-slate-400"><span className="text-rose-400 font-mono font-semibold">ROOT CAUSE: </span>{scenario.catalyst}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EXP 05: Tough Questions */}
      <div className="md:col-span-6 rounded-2xl p-5 backdrop-blur-2xl bg-slate-900/60 border border-white/10 hover:border-violet-500/30 transition-all shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5 font-mono text-[10px] tracking-widest text-violet-400">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-violet-500/20 border border-violet-500/40 text-violet-300 font-bold">EXP 05</span>
            <span className="uppercase text-slate-300">TOUGH QUESTIONS TO ASK</span>
          </div>
          <HelpCircle className="h-3.5 w-3.5 text-violet-400" />
        </div>
        <div className="space-y-2.5">
          {analysis.socraticQuestions.map((q, idx) => (
            <div key={idx} className="bg-slate-950/60 rounded-xl p-3 border border-white/5 hover:border-violet-500/30 transition space-y-1 group">
              <div className="flex items-center justify-between text-xs text-violet-300 font-mono">
                <span className="font-semibold">INQUIRY #{idx + 1}</span>
                <span className="px-2 py-0.5 rounded-md bg-violet-500/10 border border-violet-500/20 text-[10px]">{q.reasoningAngle}</span>
              </div>
              <p className="text-xs text-slate-200 group-hover:text-white transition leading-relaxed">"{q.question}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
