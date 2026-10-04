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
    <div className="col-span-12 rounded-2xl p-5 bg-[#161922]/80 border border-white/10 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2 text-indigo-300">
          <HelpCircle className="h-4 w-4" />
          <h3 className="text-xs font-bold text-white">Tough Questions from Great Sage</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-medium flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>{answeredCount} of {questions.length} Answered</span>
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">Answer to boost clarity</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {questions.map((q, idx) => {
          const currentAnswer = reflections[idx] || ''
          return (
            <div key={idx} className="rounded-xl p-4 bg-[#0B0E14]/80 border border-white/10 hover:border-indigo-500/30 transition flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-indigo-300">
                  <span className="font-semibold">Question #{idx + 1}</span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px]">{q.reasoningAngle}</span>
                </div>
                <p className="text-xs text-slate-100 font-medium leading-relaxed">"{q.question}"</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <textarea
                  value={currentAnswer}
                  onChange={(e) => onChangeReflection(idx, e.target.value)}
                  placeholder="Type your honest response or plan..."
                  rows={2}
                  className="w-full bg-[#161922] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 resize-none transition"
                />

                <div className="flex flex-wrap gap-1">
                  {thoughtStarters.map((starter, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => onChangeReflection(idx, starter)}
                      className="text-[10px] px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 active:scale-[0.98] transition"
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

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/5">
        <p className="text-xs text-slate-400">
          Addressing blind spots earns an immediate <span className="text-emerald-400 font-semibold">+15% Clarity Boost</span> from Great Sage.
        </p>

        <button
          onClick={onReEvaluate}
          disabled={answeredCount === 0 || isReevaluating}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isReevaluating ? (
            <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <RefreshCw className="h-3.5 w-3.5" />
          )}
          <span>{isReevaluating ? 'Re-evaluating with Great Sage...' : '🔄 Re-evaluate Situation with Great Sage'}</span>
        </button>
      </div>
    </div>
  )
}
