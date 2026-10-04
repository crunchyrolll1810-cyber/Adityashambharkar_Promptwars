import { useState, useMemo } from 'react'
import { Navbar } from './components/Navbar'
import { QuickScenarioChips } from './components/QuickScenarioChips'
import { MultimodalInput } from './components/MultimodalInput'
import { StreamingCard } from './components/StreamingCard'
import { DecisionDashboard } from './components/DecisionDashboard'
import { generateContentStream, parseDecisionAnalysis } from './services/geminiService'
import { Sparkles, Eye, Code } from 'lucide-react'

export function App() {
  const [context, setContext] = useState('')
  const [rationale, setRationale] = useState('')
  const [imageBase64, setImageBase64] = useState<string | undefined>()
  const [imageMimeType, setImageMimeType] = useState<string | undefined>()
  const [outputContent, setOutputContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'stream'>('dashboard')

  const parsedAnalysis = useMemo(() => parseDecisionAnalysis(outputContent), [outputContent])

  const handleSelectScenario = (selectedContext: string, selectedRationale: string) => {
    setContext(selectedContext)
    setRationale(selectedRationale)
    handleExecute(selectedContext, selectedRationale)
  }

  const handleExecute = async (overrideContext?: string, overrideRationale?: string) => {
    const activeContext = overrideContext !== undefined ? overrideContext : context
    const activeRationale = overrideRationale !== undefined ? overrideRationale : rationale
    if ((!activeContext.trim() && !activeRationale.trim()) || isGenerating) return

    setOutputContent('')
    setIsGenerating(true)

    try {
      await generateContentStream(
        {
          decisionInput: { context: activeContext, rationale: activeRationale },
          imageBase64,
          imageMimeType,
          isDemoMode
        },
        (token) => {
          setOutputContent((prev) => prev + token)
        }
      )
    } catch (err) {
      console.error('Execution error:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#090D16] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-violet-500/30 selection:text-violet-100">
      {/* Ambient Radial Background Accents */}
      <div className="fixed top-0 left-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Navbar */}
      <Navbar isDemoMode={isDemoMode} onToggleDemoMode={setIsDemoMode} />

      {/* Main Bento Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Dynamic Header */}
        <div className="mb-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 text-xs font-mono font-medium border border-violet-500/20 mb-3 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            <span className="tracking-wide">LABS // AI THINKING PARTNER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            ReasonLens
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Spot what you might be missing, test your assumptions, and make confident decisions.
          </p>
        </div>

        {/* 1-Tap Presets */}
        <QuickScenarioChips onSelectScenario={handleSelectScenario} />

        {/* Multimodal Interrogation Input */}
        <MultimodalInput
          context={context}
          onChangeContext={setContext}
          rationale={rationale}
          onChangeRationale={setRationale}
          onSubmit={() => handleExecute()}
          isLoading={isGenerating}
          onImageSelected={(b64, mime) => {
            setImageBase64(b64)
            setImageMimeType(mime)
          }}
        />

        {/* Tab Controls */}
        {parsedAnalysis && (
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold active:scale-[0.98] transition-all duration-150 ${
                activeTab === 'dashboard'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/25 border border-violet-500/40'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>DECISION BREAKDOWN</span>
            </button>
            <button
              onClick={() => setActiveTab('stream')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold active:scale-[0.98] transition-all duration-150 ${
                activeTab === 'stream'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/25 border border-violet-500/40'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              <Code className="h-3.5 w-3.5" />
              <span>RAW JSON</span>
            </button>
          </div>
        )}

        {/* Content View */}
        {parsedAnalysis && activeTab === 'dashboard' ? (
          <DecisionDashboard
            analysis={parsedAnalysis}
            context={context}
            rationale={rationale}
          />
        ) : (
          <StreamingCard
            content={outputContent}
            isStreaming={isGenerating}
            isDemoMode={isDemoMode}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs font-mono text-slate-500 border-t border-white/5">
        PromptWars 2026 • SVPCET Nagpur • Engineering India x Hack2Skill x Google for Developers
      </footer>
    </div>
  )
}

export default App
