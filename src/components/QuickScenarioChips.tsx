import React from 'react'
import { Rocket, RefreshCw, CreditCard, Compass } from 'lucide-react'

interface QuickScenarioChipsProps {
  onSelectScenario: (context: string, rationale: string) => void
}

export const QuickScenarioChips: React.FC<QuickScenarioChipsProps> = ({ onSelectScenario }) => {
  const scenarios = [
    {
      code: 'VEC-01',
      label: 'Startup Leap',
      icon: <Rocket className="h-3.5 w-3.5 text-rose-400" />,
      border: 'hover:border-rose-500/40',
      context: 'Quitting my job to launch an AI startup full-time.',
      rationale: 'I have 6 months of savings and strong coding skills.'
    },
    {
      code: 'VEC-02',
      label: 'Codebase Rewrite',
      icon: <RefreshCw className="h-3.5 w-3.5 text-amber-400" />,
      border: 'hover:border-amber-500/40',
      context: 'Rewriting our entire web app from scratch in a new stack.',
      rationale: 'Old codebase is messy and slowing down new features.'
    },
    {
      code: 'VEC-03',
      label: 'Pricing Pivot',
      icon: <CreditCard className="h-3.5 w-3.5 text-emerald-400" />,
      border: 'hover:border-emerald-500/40',
      context: 'Killing our free tier and switching to an upfront paid-only model.',
      rationale: 'Free users rarely convert and our server costs are rising.'
    },
    {
      code: 'VEC-04',
      label: 'Career Bet',
      icon: <Compass className="h-3.5 w-3.5 text-cyan-400" />,
      border: 'hover:border-cyan-500/40',
      context: 'Skipping campus placement interviews to focus solely on open-source projects.',
      rationale: 'Top tech companies hire directly from GitHub PRs.'
    }
  ]

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-slate-400 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
          <span>Select Test Vector (1-Tap Interrogation)</span>
        </div>
        <span className="font-mono text-[10px] text-slate-500">READY</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {scenarios.map((s, i) => (
          <button
            key={i}
            onClick={() => onSelectScenario(s.context, s.rationale)}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl backdrop-blur-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 ${s.border} text-left transition duration-150 active:scale-[0.98] group shadow-sm overflow-hidden`}
          >
            <div className="p-1.5 rounded-lg bg-slate-950 border border-white/5 group-hover:scale-105 transition-transform">
              {s.icon}
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-mono text-[9px] text-slate-400 tracking-wider block">{s.code}</span>
              <span className="block text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                {s.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
