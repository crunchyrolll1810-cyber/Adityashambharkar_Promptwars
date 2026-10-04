import React, { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

const DECISION_PHRASES = [
  'leaving a steady job for a high-risk AI startup.',
  'rewriting your core codebase from scratch in Rust.',
  'raising pricing by 40% before product-market fit.',
  'taking external VC funding vs bootstrapping.',
  'pivoting your entire product from B2C to enterprise B2B.'
]

export const HeroHeader: React.FC = () => {
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState<'in' | 'out'>('in')

  useEffect(() => {
    const timer = setInterval(() => {
      setFade('out')
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % DECISION_PHRASES.length)
        setFade('in')
      }, 450)
    }, 3600)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-center sm:text-left select-none">
      {/* EXP Tag Badge with Entrance Fade */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 text-violet-300 font-mono text-xs font-semibold border border-violet-500/30 mb-4 shadow-sm shadow-violet-500/10 animate-blur-fade">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
        </span>
        <Sparkles className="h-3.5 w-3.5 text-violet-400" />
        <span>[EXP · LABS #01] • Thinking Partner</span>
      </div>

      {/* Main Headline with Staggered Antigravity Blur-Fade Words */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 leading-[1.08]">
        <span
          className="inline-block animate-blur-fade opacity-0 fill-mode-forwards"
          style={{ animationDelay: '120ms', animationFillMode: 'forwards' }}
        >
          INTERROGATE
        </span>
        <br />
        <span
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 animate-blur-fade opacity-0"
          style={{ animationDelay: '280ms', animationFillMode: 'forwards' }}
        >
          YOUR&nbsp;
        </span>
        <span
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 animate-blur-fade opacity-0"
          style={{ animationDelay: '420ms', animationFillMode: 'forwards' }}
        >
          THINKING.
        </span>
      </h1>

      {/* Dynamic Tagline with Antigravity Cycling Fading Text */}
      <div
        className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed animate-blur-fade opacity-0 min-h-[52px] sm:min-h-[48px]"
        style={{ animationDelay: '580ms', animationFillMode: 'forwards' }}
      >
        <span>Spot what you might be missing when&nbsp;</span>
        <span
          className={`inline-block font-medium text-violet-300 transition-all duration-500 transform ${
            fade === 'in'
              ? 'opacity-100 blur-none translate-y-0'
              : 'opacity-0 blur-[6px] -translate-y-1.5'
          }`}
        >
          {DECISION_PHRASES[index]}
        </span>
        <span className="inline-block w-1.5 h-4 ml-1 bg-gradient-to-b from-blue-400 via-violet-400 to-purple-400 rounded-sm animate-pulse align-middle" />
      </div>

      {/* Explore Divider */}
      <div
        className="flex items-center gap-3 pt-3 animate-blur-fade opacity-0"
        style={{ animationDelay: '720ms', animationFillMode: 'forwards' }}
      >
        <div className="h-px flex-1 bg-gradient-to-r from-violet-500/25 via-white/10 to-transparent" />
        <span className="font-mono text-[10px] text-slate-500 flex items-center gap-1 font-medium">
          <span>EXPLORE</span><span className="animate-bounce text-violet-400">↓</span>
        </span>
        <div className="h-px w-10 bg-white/5" />
      </div>
    </div>
  )
}
