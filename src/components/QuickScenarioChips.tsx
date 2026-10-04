import React from 'react'
import { Rocket, RefreshCw, CreditCard, Compass } from 'lucide-react'

interface QuickScenarioChipsProps {
  onSelectScenario: (context: string, rationale: string) => void
}

export const QuickScenarioChips: React.FC<QuickScenarioChipsProps> = ({ onSelectScenario }) => {
  const scenarios = [
    {
      emoji: '🚀',
      title: 'Startup Leap',
      subtitle: 'Quitting job for an AI startup',
      badge: 'High Stakes',
      badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
      borderGlow: 'hover:border-rose-500/40 hover:shadow-rose-500/10',
      context: 'Quitting my job to launch an AI startup full-time.',
      rationale: 'I have 6 months of savings and strong coding skills.'
    },
    {
      emoji: '🔄',
      title: 'Code Rewrite',
      subtitle: 'Rebuilding app from scratch',
      badge: 'Engineering',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
      borderGlow: 'hover:border-amber-500/40 hover:shadow-amber-500/10',
      context: 'Scrapping our legacy app to rebuild from scratch in a modern stack.',
      rationale: 'Old codebase is messy and slowing down new features.'
    },
    {
      emoji: '💰',
      title: 'Pricing Pivot',
      subtitle: 'Killing the free tier model',
      badge: 'Business',
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
      borderGlow: 'hover:border-emerald-500/40 hover:shadow-emerald-500/10',
      context: 'Ending our free tier and going paid-only tomorrow.',
      rationale: 'Free users rarely convert and our server costs are rising.'
    },
    {
      emoji: '🎓',
      title: 'Career Bet',
      subtitle: 'Skipping campus placements',
      badge: 'Personal',
      badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
      borderGlow: 'hover:border-blue-500/40 hover:shadow-blue-500/10',
      context: 'Skipping campus placement interviews to focus solely on open-source projects.',
      rationale: 'Top tech companies hire directly from GitHub PRs.'
    }
  ]

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Or test an example decision with 1 click:
        </span>
        <span className="text-xs text-slate-500">Tap to load</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {scenarios.map((s, i) => (
          <button
            key={i}
            onClick={() => onSelectScenario(s.context, s.rationale)}
            className={`flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#161922]/85 hover:bg-[#1C202C] border border-white/10 ${s.borderGlow} text-left transition-all duration-250 hover:-translate-y-1 active:scale-[0.97] shadow-md group`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{s.emoji}</span>
              <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${s.badgeColor}`}>
                {s.badge}
              </span>
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-100 group-hover:text-white">
                {s.title}
              </span>
              <span className="block text-xs text-slate-400 group-hover:text-slate-300 truncate mt-1">
                {s.subtitle}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
