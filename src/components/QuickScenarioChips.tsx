import React from 'react'
import { Rocket, RefreshCw, CreditCard, Compass } from 'lucide-react'

interface QuickScenarioChipsProps {
  onSelectScenario: (context: string, rationale: string) => void
}

export const QuickScenarioChips: React.FC<QuickScenarioChipsProps> = ({ onSelectScenario }) => {
  const scenarios = [
    {
      idx: 'GP 01', track: 'MONACO GP', emoji: '🏎️', title: 'Startup Leap',
      subtitle: 'Quitting job for an AI startup', badge: 'High Downforce',
      badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/40',
      borderStyle: 'border-white/10 hover:border-volt hover:shadow-[0_0_30px_-5px_rgba(210,255,0,0.35)]',
      context: 'Quitting my job to launch an AI startup full-time.',
      rationale: 'I have 6 months of savings and strong coding skills.'
    },
    {
      idx: 'GP 02', track: 'SILVERSTONE', emoji: '⚡', title: 'Code Rewrite',
      subtitle: 'Rebuilding app from scratch', badge: 'Full Throttle',
      badgeColor: 'bg-volt/15 text-volt border-volt/40',
      borderStyle: 'border-white/10 hover:border-volt hover:shadow-[0_0_30px_-5px_rgba(210,255,0,0.35)]',
      context: 'Scrapping our legacy app to rebuild from scratch in a modern stack.',
      rationale: 'Old codebase is messy and slowing down new features.'
    },
    {
      idx: 'GP 03', track: 'MONZA GP', emoji: '🔥', title: 'Pricing Pivot',
      subtitle: 'Killing the free tier model', badge: 'Straight Line',
      badgeColor: 'bg-papaya/15 text-papaya border-papaya/40',
      borderStyle: 'border-white/10 hover:border-papaya hover:shadow-[0_0_30px_-5px_rgba(255,128,0,0.35)]',
      context: 'Ending our free tier and going paid-only tomorrow.',
      rationale: 'Free users rarely convert and our server costs are rising.'
    },
    {
      idx: 'GP 04', track: 'SUZUKA GP', emoji: '🎯', title: 'Career Bet',
      subtitle: 'Skipping campus placements', badge: 'High Grip',
      badgeColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40',
      borderStyle: 'border-white/10 hover:border-cyan-400 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.35)]',
      context: 'Skipping campus placement interviews to focus solely on open-source projects.',
      rationale: 'Top tech companies hire directly from GitHub PRs.'
    }
  ]

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-black uppercase tracking-wider text-slate-200 accent-bar-volt flex items-center gap-1.5">
          <span>GRAND PRIX SPEC SCENARIOS:</span>
        </span>
        <span className="font-mono text-[11px] text-volt font-bold">[1-TAP TELEMETRY]</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {scenarios.map((s, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Load Grand Prix scenario ${s.track}: ${s.title}`}
            onClick={() => onSelectScenario(s.context, s.rationale)}
            className={`spotlight-card flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#12141C]/90 hover:bg-[#181B26] border ${s.borderStyle} text-left transition-all duration-200 hover:-translate-y-1 active:scale-[0.97] shadow-xl group`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{s.emoji}</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] text-slate-400 font-bold">{s.idx}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${s.badgeColor}`}>
                  {s.badge}
                </span>
              </div>
            </div>
            <div>
              <span className="block font-mono text-[10px] text-slate-400 tracking-wider uppercase mb-0.5">{s.track}</span>
              <span className="block text-xs font-black text-white group-hover:text-volt transition-colors">
                {s.title}
              </span>
              <span className="block text-xs text-slate-400 group-hover:text-slate-300 truncate mt-0.5">
                {s.subtitle}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
