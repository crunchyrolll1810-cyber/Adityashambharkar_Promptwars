import React from 'react'
import { Rocket, RefreshCw, CreditCard, Compass } from 'lucide-react'

interface QuickScenarioChipsProps {
  onSelectScenario: (context: string, rationale: string) => void
}

export const QuickScenarioChips: React.FC<QuickScenarioChipsProps> = ({ onSelectScenario }) => {
  const scenarios = [
    {
      idx: '01',
      emoji: '🚀',
      title: 'Startup Leap',
      subtitle: 'Quitting job for an AI startup',
      badge: 'High Stakes',
      badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      borderGlow: 'hover:border-rose-500/50 hover:shadow-[0_0_25px_-5px_rgba(244,63,94,0.3)]',
      context: 'Quitting my job to launch an AI startup full-time.',
      rationale: 'I have 6 months of savings and strong coding skills.'
    },
    {
      idx: '02',
      emoji: '🔄',
      title: 'Code Rewrite',
      subtitle: 'Rebuilding app from scratch',
      badge: 'Engineering',
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      borderGlow: 'hover:border-amber-500/50 hover:shadow-[0_0_25px_-5px_rgba(245,158,11,0.3)]',
      context: 'Scrapping our legacy app to rebuild from scratch in a modern stack.',
      rationale: 'Old codebase is messy and slowing down new features.'
    },
    {
      idx: '03',
      emoji: '💰',
      title: 'Pricing Pivot',
      subtitle: 'Killing the free tier model',
      badge: 'Business',
      badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      borderGlow: 'hover:border-emerald-500/50 hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.3)]',
      context: 'Ending our free tier and going paid-only tomorrow.',
      rationale: 'Free users rarely convert and our server costs are rising.'
    },
    {
      idx: '04',
      emoji: '🎓',
      title: 'Career Bet',
      subtitle: 'Skipping campus placements',
      badge: 'Personal',
      badgeColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      borderGlow: 'hover:border-cyan-500/50 hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.3)]',
      context: 'Skipping campus placement interviews to focus solely on open-source projects.',
      rationale: 'Top tech companies hire directly from GitHub PRs.'
    }
  ]

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 accent-bar-violet">
          Or test an example decision with 1 click:
        </span>
        <span className="font-mono text-[11px] text-slate-500">[1-TAP TO RUN]</span>
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
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] text-slate-500 font-semibold">{s.idx}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${s.badgeColor}`}>
                  {s.badge}
                </span>
              </div>
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
