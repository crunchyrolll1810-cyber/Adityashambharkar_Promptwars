import React from 'react'
import { SocraticQuestion } from '../types/decision.types'
import { HelpCircle, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react'

interface Props {
  questions: SocraticQuestion[]
  reflections: Record<number, string>
  onChangeReflection: (idx: number, val: string) => void
  onReEvaluate: () => void
  isReevaluating?: boolean
}

export const ReflectionSection: React.FC<Props> = ({
  questions,
  reflections,
  onChangeReflection,
  onReEvaluate,
  isReevaluating
}) => {
  const answeredCount = Object.values(reflections).filter(t => t.trim().length > 0).length

  const thoughtStarters = [
    'I will validate this with 5 users first',
    'I have an emergency fund for this',
    'I need to discuss this with my co-founder'
  ]

  return (
    <div className="spotlight-card col-span-12 rounded-3xl p-6 sm:p-8 bg-[#161922]/85 border border-white/10 shadow-2xl space-y-5 hover:border-violet-500/30 hover:shadow-[0_20px_50px_-10px_rgba(139,92,246,0.15)] transition-all duration-300">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2 text-violet-300">
          <HelpCircle className="h-4 w-4" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-white accent-bar-violet">Tough Questions from Great Sage</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-semibold flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>{answeredCount} of {questions.length} Answered</span>
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">Answer to boost clarity</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {questions.map((q, idx) => {
          const currentAnswer = reflections[idx] || ''
          return (
            <div key={idx} className="rounded-2xl p-4 sm:p-5 bg-[#0B0E14]/85 border border-white/10 hover:border-violet-500/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between space-y-3.5 shadow-md">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-violet-300">
                  <span className="font-bold font-mono">#{idx + 1}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-[10px] font-semibold">{q.reasoningAngle}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-100 font-semibold leading-relaxed">"{q.question}"</p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-white/5">
                <textarea
                  value={currentAnswer}
                  onChange={(e) => onChangeReflection(idx, e.target.value)}
                  placeholder="Type your honest response or plan..."
                  rows={3}
                  className="w-full bg-[#161922] border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus-glow focus:outline-none resize-none transition"
                />

                <div className="flex flex-wrap gap-1.5">
                  {thoughtStarters.map((starter, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => onChangeReflection(idx, starter)}
                      className="text-[10px] font-medium px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 active:scale-[0.97] transition"
                    >
                      +{starter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/5">
        <p className="text-xs text-slate-400">
          Addressing blind spots earns an immediate <span className="text-emerald-400 font-bold">+15% Clarity Boost</span> from Great Sage.
        </p>

        <button
          onClick={onReEvaluate}
          disabled={answeredCount === 0 || isReevaluating}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 active:scale-[0.97] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isReevaluating ? (
            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          <span>{isReevaluating ? 'Re-evaluating with Great Sage...' : '🔄 Re-evaluate Situation with Great Sage'}</span>
        </button>
      </div>
    </div>
  )
}
