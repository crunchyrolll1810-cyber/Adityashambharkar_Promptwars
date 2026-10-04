import React, { useState } from 'react'
import { Sparkles, Key, ShieldCheck, FlaskConical } from 'lucide-react'

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
      {/* Google 4-Color Top Ribbon */}
      <div className="w-full h-[2.5px] google-ribbon sticky top-0 z-50 shadow-sm" />

      <header className="sticky top-[2.5px] z-40 px-4 sm:px-6 py-3 backdrop-blur-2xl bg-[#0B0E14]/85 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-white/15">
            <FlaskConical className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans font-bold tracking-tight text-white text-base sm:text-lg">ReasonLens</span>
              <span className="font-sans text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/25">
                Google Labs • Decision Experiment #01
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Test assumptions and spot blind spots before committing</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onToggleDemoMode(!isDemoMode)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border active:scale-[0.98] transition-all duration-150 ${
              isDemoMode
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20 shadow-sm'
            }`}
            title="Toggle between Live API and offline demo scenarios"
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDemoMode ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isDemoMode ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
            </span>
            <span>{isDemoMode ? 'Demo Mode' : 'Gemini 2.5 Flash • Live Inference'}</span>
          </button>

          <button
            onClick={() => setShowKeyModal(true)}
            className="p-2 rounded-xl bg-slate-900/90 border border-white/10 text-slate-400 hover:text-white hover:border-indigo-500/40 active:scale-[0.98] transition-all duration-150"
            title="Configure Gemini API Key"
          >
            <Key className="h-4 w-4" />
          </button>
        </div>
      </header>

      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="backdrop-blur-2xl bg-slate-900/90 max-w-md w-full p-6 rounded-2xl border border-white/10 shadow-2xl animate-fade-in">
            <div className="flex items-center gap-2 mb-3 text-white">
              <Sparkles className="h-5 w-5 text-violet-400" />
              <h3 className="font-sans font-bold text-lg">Google AI Studio Credentials</h3>
            </div>
            <p className="font-sans text-xs text-slate-400 mb-4 leading-relaxed">
              Enter your Gemini API key from <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="text-violet-400 underline">aistudio.google.com</a>. Stored locally in your browser session.
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500 font-mono mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="font-mono px-4 py-2 text-xs text-slate-400 hover:text-white active:scale-[0.98] transition"
              >
                CANCEL
              </button>
              <button
                onClick={handleSaveKey}
                className="font-mono px-4 py-2 text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white rounded-xl shadow-md shadow-violet-500/25 active:scale-[0.98] transition"
              >
                SAVE KEY
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
