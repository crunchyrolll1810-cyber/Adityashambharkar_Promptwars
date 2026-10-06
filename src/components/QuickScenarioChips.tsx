import React from 'react'
import { Rocket, RefreshCw, CreditCard, Compass } from 'lucide-react'

interface QuickScenarioChipsProps {
  onSelectScenario: (context: string, rationale: string) => void
}

export const QuickScenarioChips: React.FC<QuickScenarioChipsProps> = ({ onSelectScenario }) => {
  const scenarios = [
    {
      num: '01', category: 'CAREER', icon: <Rocket className="h-4 w-4" />, title: 'Startup Leap',
      subtitle: 'Quitting job for an AI startup', badge: 'High Stakes',
      badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      borderStyle: 'border-white/8 hover:border-volt hover:shadow-[0_0_28px_-6px_rgba(210,255,0,0.3)]',
      context: 'Quitting my job to launch an AI startup full-time.',
      rationale: 'I have 6 months of savings and strong coding skills.'
    },
    {
      num: '02', category: 'TECHNICAL', icon: <RefreshCw className="h-4 w-4" />, title: 'Code Rewrite',
      subtitle: 'Rebuilding app from scratch', badge: 'Complexity',
      badgeColor: 'bg-volt/15 text-volt border-volt/30',
      borderStyle: 'border-white/8 hover:border-volt hover:shadow-[0_0_28px_-6px_rgba(210,255,0,0.3)]',
      context: 'Scrapping our legacy app to rebuild from scratch in a modern stack.',
      rationale: 'Old codebase is messy and slowing down new features.'
    },
    {
      num: '03', category: 'FINANCIAL', icon: <CreditCard className="h-4 w-4" />, title: 'Pricing Pivot',
      subtitle: 'Killing the free tier model', badge: 'Revenue',
      badgeColor: 'bg-papaya/15 text-papaya border-papaya/30',
      borderStyle: 'border-white/8 hover:border-papaya hover:shadow-[0_0_28px_-6px_rgba(255,128,0,0.3)]',
      context: 'Ending our free tier and going paid-only tomorrow.',
      rationale: 'Free users rarely convert and our server costs are rising.'
    },
    {
      num: '04', category: 'STRATEGIC', icon: <Compass className="h-4 w-4" />, title: 'Career Bet',
      subtitle: 'Skipping campus placements', badge: 'Commitment',
      badgeColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      borderStyle: 'border-white/8 hover:border-cyan-400 hover:shadow-[0_0_28px_-6px_rgba(6,182,212,0.3)]',
      context: 'Skipping campus placement interviews to focus solely on open-source projects.',
      rationale: 'Top tech companies hire directly from GitHub PRs.'
    }
  ]

  return (
    <div className="w-full" data-reveal>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-black uppercase tracking-wider text-slate-300 accent-bar-volt">
          Explore Scenarios
        </span>
        <span className="font-mono text-[11px] text-slate-500">[QUICK START]</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {scenarios.map((s, i) => (
          <button
            key={i} type="button"
            aria-label={`Load scenario ${s.num}: ${s.title}`}
            onClick={() => onSelectScenario(s.context, s.rationale)}
            className={`spotlight-card flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#0D0E12]/90 hover:bg-[#12141C] border ${s.borderStyle} text-left transition-all duration-200 hover:-translate-y-1 active:scale-[0.97] shadow-xl group`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg bg-white/5 text-slate-400 group-hover:text-volt transition-colors`}>{s.icon}</div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] text-slate-500">{s.num}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${s.badgeColor}`}>{s.badge}</span>
              </div>
            </div>
            <div>
              <span className="block font-mono text-[10px] text-slate-500 tracking-wider uppercase mb-0.5">{s.category}</span>
              <span className="block text-xs font-black text-white group-hover:text-volt transition-colors">{s.title}</span>
              <span className="block text-xs text-slate-500 group-hover:text-slate-400 truncate mt-0.5">{s.subtitle}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
