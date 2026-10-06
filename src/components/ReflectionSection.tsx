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
    <div data-reveal className="spotlight-card col-span-12 rounded-3xl p-6 sm:p-8 bg-[#12141C]/90 border border-white/10 shadow-2xl space-y-5 hover:border-volt/30 transition-all duration-300">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2 text-volt">
          <HelpCircle className="h-4 w-4 text-volt" />
          <h3 className="text-xs font-black uppercase tracking-wider text-white accent-bar-volt">Reflection Questions</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-volt/10 border border-volt/30 text-volt font-bold flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5 text-volt" />
            <span>{answeredCount} of {questions.length} Answered</span>
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">Answer to earn +15% Clarity Boost</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {questions.map((q, idx) => {
          const currentAnswer = reflections[idx] || ''
          return (
            <div key={idx} className="rounded-2xl p-4 sm:p-5 bg-[#090A0F] border border-white/10 hover:border-volt/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between space-y-3.5 shadow-md">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-volt">
                  <span className="font-bold font-mono">#{idx + 1}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-volt/10 border border-volt/30 text-[10px] font-bold">{q.reasoningAngle}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-100 font-bold leading-relaxed">"{q.question}"</p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-white/5">
                <label htmlFor={`reflection-${idx}`} className="sr-only">Reflection answer for question {idx + 1}</label>
                <textarea
                  id={`reflection-${idx}`}
                  name={`reflection-${idx}`}
                  value={currentAnswer}
                  onChange={(e) => onChangeReflection(idx, e.target.value)}
                  placeholder="Type your honest response or contingency plan..."
                  rows={3}
                  className="w-full bg-[#12141C] border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-volt focus:outline-none resize-none transition"
                />

                <div className="flex flex-wrap gap-1.5">
                  {thoughtStarters.map((starter, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      aria-label={`Insert starter: ${starter}`}
                      onClick={() => onChangeReflection(idx, starter)}
                      className="text-[10px] font-medium px-2.5 py-1 rounded-xl bg-white/5 hover:bg-volt/15 hover:text-volt text-slate-300 border border-white/5 active:scale-[0.97] transition"
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
          Addressing blind spots earns an immediate <span className="text-volt font-bold">+15% Clarity Delta Boost</span> from Great Sage.
        </p>

        <button
          onClick={onReEvaluate}
          aria-label="Re-evaluate situation with Great Sage"
          aria-busy={isReevaluating}
          disabled={answeredCount === 0 || isReevaluating}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-volt hover:bg-[#E2FF4D] text-black text-xs font-black shadow-lg shadow-volt/20 active:scale-[0.97] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isReevaluating ? (
            <div className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 text-black" />
          )}
          <span>{isReevaluating ? 'Re-evaluating with Great Sage...' : '🔄 Re-evaluate Situation with Great Sage'}</span>
        </button>
      </div>
    </div>
  )
}
