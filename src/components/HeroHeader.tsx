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
      }, 400)
    }, 3600)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-center sm:text-left select-none space-y-3">
      {/* LN-04 Telemetry Status Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-volt/10 text-volt font-mono text-xs font-bold border border-volt/30 shadow-[0_0_15px_rgba(210,255,0,0.18)] blur-fade-in">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-volt opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-volt" />
        </span>
        <Sparkles className="h-3.5 w-3.5 text-volt" />
        <span>[LN-04 · TELEMETRY HUD] • MAX ATTACK THINKING</span>
      </div>

      {/* Main Headline with High-Voltage Editorial Typography */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[1.05]">
        <span className="inline-block blur-fade-in" style={{ animationDelay: '80ms' }}>
          INTERROGATE
        </span>
        <br />
        <span className="inline-block text-white blur-fade-in" style={{ animationDelay: '200ms' }}>
          YOUR&nbsp;
        </span>
        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-volt via-lime-300 to-papaya blur-fade-in drop-shadow-[0_0_25px_rgba(210,255,0,0.25)]" style={{ animationDelay: '320ms' }}>
          THINKING.
        </span>
      </h1>

      {/* Dynamic Telemetry Cycling Tagline */}
      <div className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed blur-fade-in min-h-[44px]" style={{ animationDelay: '440ms' }}>
        <span>Stress-test your racing line & blind spots when&nbsp;</span>
        <span className={`inline-block font-mono font-bold text-volt transition-all duration-300 transform ${fade === 'in' ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-[5px] -translate-y-1'}`}>
          {DECISION_PHRASES[index]}
        </span>
        <span className="inline-block w-1.5 h-4 ml-1 bg-volt rounded-sm animate-pulse align-middle" />
      </div>

      {/* Telemetry Telemetry Strip */}
      <div className="flex items-center gap-3 pt-1 blur-fade-in" style={{ animationDelay: '560ms' }}>
        <div className="h-px flex-1 bg-gradient-to-r from-volt/40 via-papaya/30 to-transparent" />
        <span className="font-mono text-[10px] text-volt/90 flex items-center gap-1.5 font-bold tracking-widest">
          <span>SECTOR 1 PURPLE</span><span className="text-papaya">●</span><span>FASTEST LAP</span><span className="animate-bounce text-volt">↓</span>
        </span>
        <div className="h-px w-12 bg-white/10" />
      </div>
    </div>
  )
}
