import React from 'react'
import { Rocket, RefreshCw, CreditCard, Compass } from 'lucide-react'

interface QuickScenarioChipsProps {
  onSelectScenario: (context: string, rationale: string) => void
}

export const QuickScenarioChips: React.FC<QuickScenarioChipsProps> = ({ onSelectScenario }) => {
  const scenarios = [
    {
      label: 'Startup Leap',
      icon: <Rocket className="h-3.5 w-3.5 text-rose-400" />,
      context: 'Quitting my job to launch an AI startup full-time.',
      rationale: 'I have 6 months of savings and strong coding skills.'
    },
    {
      label: 'Codebase Rewrite',
      icon: <RefreshCw className="h-3.5 w-3.5 text-amber-400" />,
      context: 'Rewriting our entire web app from scratch in a new stack.',
      rationale: 'Old codebase is messy and slowing down new features.'
    },
    {
      label: 'Pricing Pivot',
      icon: <CreditCard className="h-3.5 w-3.5 text-emerald-400" />,
      context: 'Killing our free tier and switching to an upfront paid-only model.',
      rationale: 'Free users rarely convert and our server costs are rising.'
    },
    {
      label: 'Career Bet',
      icon: <Compass className="h-3.5 w-3.5 text-indigo-400" />,
      context: 'Skipping campus placement interviews to focus solely on open-source projects.',
      rationale: 'Top tech companies hire directly from GitHub PRs.'
    }
  ]

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
          High-Stakes Decision Presets (1-Tap Analysis)
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {scenarios.map((s, i) => (
          <button
            key={i}
            onClick={() => onSelectScenario(s.context, s.rationale)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl backdrop-blur-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 hover:border-brand-500/40 text-left transition duration-150 active:scale-[0.97] group shadow-sm"
          >
            <div className="p-1 rounded-lg bg-slate-950 border border-white/5 group-hover:scale-105 transition-transform">
              {s.icon}
            </div>
            <div className="min-w-0 flex-1">
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
