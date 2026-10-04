import React, { useState } from 'react'
import { Sparkles, Key, ShieldCheck, Compass } from 'lucide-react'

interface NavbarProps {
  isDemoMode: boolean
  onToggleDemoMode: (val: boolean) => void
}

export const Navbar: React.FC<NavbarProps> = ({ isDemoMode, onToggleDemoMode }) => {
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [apiKey, setApiKey] = useState(localStorage.getItem('GEMINI_API_KEY') || '')

  const handleSaveKey = () => {
    localStorage.setItem('GEMINI_API_KEY', apiKey.trim())
    setShowKeyModal(false)
  }

  return (
    <>
      <header className="glass-panel sticky top-0 z-50 px-4 sm:px-6 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/25">
            <Compass className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white text-base sm:text-lg">ReasonLens</span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-brand-500/20 text-brand-300 rounded-full border border-brand-500/30">
                Socratic AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden xs:block sm:block">Powered by Google Antigravity & Gemini</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium text-[11px]">Gemini 3.7 Ready</span>
          </div>

          <button
            onClick={() => onToggleDemoMode(!isDemoMode)}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold border active:scale-[0.98] transition-all duration-150 ${
              isDemoMode
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20 shadow-sm'
                : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20 shadow-sm'
            }`}
            title="Toggle between Live Gemini API and fail-safe offline Mock Data"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{isDemoMode ? '🟡 Demo Mode' : '🟢 Live API'}</span>
          </button>

          <button
            onClick={() => setShowKeyModal(true)}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-slate-700 active:scale-[0.98] transition-all duration-150"
            title="Configure Gemini API Key"
          >
            <Key className="h-4 w-4" />
          </button>
        </div>
      </header>

      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="backdrop-blur-xl bg-slate-900/90 max-w-md w-full p-6 rounded-2xl border border-white/10 shadow-2xl animate-fade-in">
            <div className="flex items-center gap-2 mb-3 text-white">
              <Sparkles className="h-5 w-5 text-brand-400" />
              <h3 className="font-bold text-lg">Google AI Studio API Key</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Enter your Gemini API key from <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="text-brand-400 underline">aistudio.google.com</a>. Stored locally in your browser.
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-500 font-mono mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white active:scale-[0.98] transition-all duration-150"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveKey}
                className="px-4 py-2 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-xl shadow-md active:scale-[0.98] transition-all duration-150"
              >
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
