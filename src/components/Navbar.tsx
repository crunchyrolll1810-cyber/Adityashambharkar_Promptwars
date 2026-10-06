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
      {/* High-Contrast F1 Racing Ribbon (Volt + Papaya + Cyan) */}
      <div className="w-full h-[2.5px] bg-gradient-to-r from-volt via-papaya to-blue-500 sticky top-0 z-50 shadow-sm shadow-volt/20" />

      <header className="sticky top-[2.5px] z-40 px-4 sm:px-6 py-3 backdrop-blur-2xl bg-[#090D16]/95 border-b border-volt/20 shadow-[0_4px_25px_rgba(210,255,0,0.05)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-volt via-papaya to-purple-600 flex items-center justify-center shadow-lg shadow-volt/20 border border-volt/40 group cursor-pointer hover:rotate-6 active:scale-95 transition-all duration-300">
            <span className="font-mono font-black text-black text-xs tracking-tighter">LN04</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans font-black tracking-tight text-white text-base sm:text-lg">REASON<span className="text-volt">LENS</span></span>
              <span className="font-mono text-[10px] tracking-widest font-bold px-2 py-0.5 rounded-full bg-volt/10 text-volt border border-volt/30 shadow-[0_0_12px_rgba(210,255,0,0.2)]">
                F1 · TELEMETRY
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Interrogate your racing line & assumptions before committing</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onToggleDemoMode(!isDemoMode)}
            aria-label={`Current mode: ${isDemoMode ? 'Demo Mode' : 'Live Gemini'}. Click to toggle mode.`}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-xs font-semibold border active:scale-[0.97] transition-all duration-150 ${
              isDemoMode
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/40 hover:bg-amber-500/20 shadow-sm'
                : 'bg-volt/10 text-volt border-volt/40 hover:bg-volt/20 shadow-[0_0_15px_rgba(210,255,0,0.2)]'
            }`}
            title="Toggle between Live API and offline demo scenarios"
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDemoMode ? 'bg-amber-400' : 'bg-volt'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isDemoMode ? 'bg-amber-500' : 'bg-volt'}`}></span>
            </span>
            <span>{isDemoMode ? '[PIT: DEMO ● READY]' : '[TRACK: GEMINI ● LIVE]'}</span>
          </button>

          <button
            onClick={() => setShowKeyModal(true)}
            aria-label="Configure Gemini API Key"
            className="p-2 rounded-xl bg-slate-900/90 border border-volt/25 text-slate-300 hover:text-volt hover:border-volt/60 active:scale-[0.97] transition-all duration-150 shadow-sm"
            title="Configure Gemini API Key"
          >
            <Key className="h-4 w-4" />
          </button>
        </div>
      </header>

      {showKeyModal && (
        <div role="dialog" aria-modal="true" aria-labelledby="api-key-modal-title" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="backdrop-blur-2xl bg-slate-900/90 max-w-md w-full p-6 rounded-2xl border border-white/10 shadow-2xl animate-fade-in">
            <div className="flex items-center gap-2 mb-3 text-white">
              <Sparkles className="h-5 w-5 text-violet-400" />
              <h3 id="api-key-modal-title" className="font-sans font-bold text-lg">Google AI Studio Credentials</h3>
            </div>
            <p className="font-sans text-xs text-slate-400 mb-4 leading-relaxed">
              Enter your Gemini API key from <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="text-violet-400 underline">aistudio.google.com</a>. Stored locally in your browser session.
            </p>
            <label htmlFor="gemini-api-key" className="sr-only">Gemini API Key</label>
            <input
              id="gemini-api-key"
              name="geminiApiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500 font-mono mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                aria-label="Cancel API key configuration"
                className="font-mono px-4 py-2 text-xs text-slate-400 hover:text-white active:scale-[0.98] transition"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={handleSaveKey}
                aria-label="Save Gemini API key"
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
