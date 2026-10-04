import React, { useState } from 'react'
import { CalibrationAnswer } from '../types/decision.types'
import { CALIBRATION_QUESTIONS } from '../data/calibrationQuestions'
import { Sparkles, Sliders, ArrowRight, CheckCircle2 } from 'lucide-react'

interface CalibrationCardProps {
  context: string
  onConfirm: (answers: CalibrationAnswer[]) => void
  onSkip: () => void
  isLoading: boolean
}

export const CalibrationCard: React.FC<CalibrationCardProps> = ({
  context,
  onConfirm,
  onSkip,
  isLoading
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({
    reversibility: 'moderate',
    evidence: 'conversations',
    runway: 'moderate'
  })

  const handleSelect = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  const handleProceed = () => {
    const answers: CalibrationAnswer[] = CALIBRATION_QUESTIONS.map((q) => {
      const chosenId = selectedAnswers[q.id]
      const chosenOpt = q.options.find((o) => o.id === chosenId) || q.options[0]
      return {
        questionId: q.id,
        question: q.subtitle,
        selectedOption: `${chosenOpt.icon} ${chosenOpt.label}: ${chosenOpt.hint}`
      }
    })
    onConfirm(answers)
  }

  return (
    <div className="spotlight-card rounded-3xl p-6 sm:p-7 bg-[#161922]/90 border border-white/10 shadow-2xl space-y-6 mb-8 animate-fade-in hover:border-violet-500/30 hover:shadow-[0_20px_50px_-10px_rgba(139,92,246,0.15)] transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-medium border border-indigo-500/20 mb-2">
            <Sliders className="h-3.5 w-3.5 text-indigo-400" />
            <span>Step 1 of 2 • Reality Calibration</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Calibrate Your Real-World Constraints
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Answer 3 quick questions about your situation: <span className="text-slate-300 font-medium italic">"{context || 'your decision'}"</span>. This allows Great Sage and Gemini to grade your clarity with surgical precision.
          </p>
        </div>

        <button
          onClick={onSkip}
          disabled={isLoading}
          className="self-start sm:self-center text-xs text-slate-400 hover:text-slate-200 underline decoration-slate-600 underline-offset-4 active:scale-[0.98] transition"
        >
          Skip to Instant Analysis ➔
        </button>
      </div>

      {/* Questions Grid */}
      <div className="space-y-6">
        {CALIBRATION_QUESTIONS.map((q) => (
          <div key={q.id} className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">{q.title}</span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">{q.subtitle}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {q.options.map((opt) => {
                const isSelected = selectedAnswers[q.id] === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect(q.id, opt.id)}
                    className={`relative p-3.5 rounded-xl border text-left transition-all duration-200 active:scale-[0.98] flex flex-col justify-between ${
                      isSelected
                        ? 'bg-indigo-600/15 border-indigo-500/60 ring-1 ring-indigo-500/40 shadow-lg shadow-indigo-500/10'
                        : 'bg-[#0B0E14]/80 border-white/10 hover:border-white/20 hover:bg-[#0B0E14]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-lg">{opt.icon}</span>
                      {isSelected ? (
                        <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-white/20 shrink-0 mt-0.5" />
                      )}
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                        {opt.label}
                      </div>
                      <div className="text-[11px] text-slate-400 leading-snug mt-1">
                        {opt.hint}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/5">
        <span className="text-[11px] text-slate-400 text-center sm:text-left">
          ✨ Calibration updates both your <span className="text-indigo-300 font-semibold">Clarity Score</span> and <span className="text-indigo-300 font-semibold">Great Sage</span> dialogue.
        </span>

        <button
          onClick={handleProceed}
          disabled={isLoading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4 text-indigo-200" />
          )}
          <span>{isLoading ? 'Calibrating Intelligence...' : 'Generate Calibrated Analysis ✨'}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
