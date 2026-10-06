import React, { useState, useEffect } from 'react'

const DECISION_PHRASES = [
  'leaving a steady job for a high-risk AI startup.',
  'rewriting your core codebase from scratch in Rust.',
  'raising pricing by 40% before product-market fit.',
  'taking external VC funding vs bootstrapping.',
  'pivoting your entire product from B2C to enterprise B2B.'
]

/**
 * Hero section with OFF+BRAND character-by-character reveal animation.
 * Each word in the headline is wrapped in individual char spans that
 * animate in with a clip-path slide on load.
 */
export const HeroHeader: React.FC = () => {
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState<'in' | 'out'>('in')

  useEffect(() => {
    const timer = setInterval(() => {
      setFade('out')
      setTimeout(() => { setIndex((prev) => (prev + 1) % DECISION_PHRASES.length); setFade('in') }, 380)
    }, 3600)
    return () => clearInterval(timer)
  }, [])

  const headline = ['INTERROGATE', 'YOUR', 'THINKING.']
  const delays = [0, 180, 340]

  return (
    <div className="text-center sm:text-left select-none space-y-4">
      {/* Eyebrow label */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-slate-400 font-mono text-[10px] font-bold border border-white/8 blur-fade-in">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-volt opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-volt" />
        </span>
        REASONLENS &nbsp;·&nbsp; POWERED BY GEMINI
      </div>

      {/* Main headline — char-by-char reveal */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[1.05]">
        {headline.map((word, wi) => (
          <span
            key={word}
            className="inline-block overflow-hidden mr-4 last:mr-0"
            aria-label={word}
          >
            <span
              className="inline-block blur-fade-in"
              style={{ animationDelay: `${delays[wi]}ms` }}
            >
              {wi === 2
                ? <span className="text-transparent bg-clip-text bg-gradient-to-r from-volt via-lime-300 to-papaya drop-shadow-[0_0_20px_rgba(210,255,0,0.2)]">{word}</span>
                : word
              }
            </span>
          </span>
        ))}
      </h1>

      {/* Cycling tagline */}
      <div className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed blur-fade-in min-h-[44px]" style={{ animationDelay: '500ms' }}>
        <span>Stress-test your logic and surface hidden assumptions when&nbsp;</span>
        <span className={`inline-block font-mono font-bold text-volt transition-all duration-300 ${
          fade === 'in' ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-[5px] -translate-y-1'
        }`}>
          {DECISION_PHRASES[index]}
        </span>
        <span className="inline-block w-1.5 h-4 ml-1 bg-volt rounded-sm animate-pulse align-middle" />
      </div>

      {/* Minimal divider */}
      <div className="flex items-center gap-3 pt-1 blur-fade-in" style={{ animationDelay: '640ms' }}>
        <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-volt/30 to-transparent" />
        <span className="font-mono text-[10px] text-slate-500 tracking-widest">GEMINI · AI THINKING PARTNER</span>
        <div className="h-px w-8 bg-white/5" />
      </div>
    </div>
  )
}
