import React from 'react'
import { Sparkles } from 'lucide-react'

export const HeroHeader: React.FC = () => {
  return (
    <div className="text-center sm:text-left">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 text-violet-300 font-mono text-xs font-semibold border border-violet-500/30 mb-4 shadow-sm shadow-violet-500/10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
        </span>
        <Sparkles className="h-3.5 w-3.5 text-violet-400" />
        <span>[EXP · LABS #01] • Thinking Partner</span>
      </div>
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 leading-[1.08]">
        INTERROGATE<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400">
          YOUR THINKING.
        </span>
      </h1>
      <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
        Spot what you might be missing, test your assumptions, and make confident decisions.
      </p>
      <div className="flex items-center gap-3 pt-3">
        <div className="h-px flex-1 bg-gradient-to-r from-violet-500/25 via-white/10 to-transparent" />
        <span className="font-mono text-[10px] text-slate-500 flex items-center gap-1 font-medium">
          <span>EXPLORE</span><span className="animate-bounce text-violet-400">↓</span>
        </span>
        <div className="h-px w-10 bg-white/5" />
      </div>
    </div>
  )
}
