import React from 'react'
import { Sparkles, Terminal, FileCode, CheckCircle2 } from 'lucide-react'

interface QuickScenarioChipsProps {
  onSelectScenario: (prompt: string) => void
}

export const QuickScenarioChips: React.FC<QuickScenarioChipsProps> = ({ onSelectScenario }) => {
  const defaultChips = [
    {
      label: 'Sample Query A',
      icon: <Sparkles className="h-3.5 w-3.5 text-brand-400" />,
      prompt: 'Execute default analysis on sample input data.'
    },
    {
      label: 'Sample Query B',
      icon: <Terminal className="h-3.5 w-3.5 text-emerald-400" />,
      prompt: 'Synthesize structured recommendations for edge-case evaluation.'
    },
    {
      label: 'Detailed Audit',
      icon: <FileCode className="h-3.5 w-3.5 text-amber-400" />,
      prompt: 'Extract key performance indicators and generate a remediation checklist.'
    },
    {
      label: 'System Health Check',
      icon: <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />,
      prompt: 'Verify inference pipeline status, confidence score, and latency metrics.'
    }
  ]

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
          Quick Demo Inputs (Customizable)
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {defaultChips.map((c, i) => (
          <button
            key={i}
            onClick={() => onSelectScenario(c.prompt)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl glass-card hover:bg-slate-800/60 border border-slate-800 hover:border-slate-700 text-left transition duration-150 group"
          >
            <div className="p-1 rounded-lg bg-slate-900 border border-slate-800 group-hover:scale-105 transition-transform">
              {c.icon}
            </div>
            <span className="text-xs font-medium text-slate-300 group-hover:text-white truncate">
              {c.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
