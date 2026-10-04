import { useState, useMemo } from 'react'
import { Navbar } from './components/Navbar'
import { QuickScenarioChips } from './components/QuickScenarioChips'
import { MultimodalInput } from './components/MultimodalInput'
import { StreamingCard } from './components/StreamingCard'
import { DecisionDashboard } from './components/DecisionDashboard'
import { WiseDebatePanel } from './components/WiseDebatePanel'
import { generateContentStream, parseDecisionAnalysis } from './services/geminiService'
import { Sparkles, Eye, Code, MessageCircle } from 'lucide-react'

export function App() {
  const [context, setContext] = useState('')
  const [rationale, setRationale] = useState('')
  const [imageBase64, setImageBase64] = useState<string | undefined>()
  const [imageMimeType, setImageMimeType] = useState<string | undefined>()
  const [outputContent, setOutputContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'debate' | 'stream'>('dashboard')

  const parsedAnalysis = useMemo(() => parseDecisionAnalysis(outputContent), [outputContent])

  const handleSelectScenario = (selContext: string, selRationale: string) => {
    setContext(selContext); setRationale(selRationale); handleExecute(selContext, selRationale)
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
        (token) => setOutputContent((prev) => prev + token)
      )
    } catch (err) {
      console.error('Execution error:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-100">
      {/* Soft Ambient Gemini Aurora Mesh Glows */}
      <div className="fixed -top-24 left-1/4 w-[500px] h-[500px] bg-blue-600/12 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 -right-20 w-[450px] h-[450px] bg-purple-600/12 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="fixed -bottom-24 left-1/3 w-[500px] h-[500px] bg-rose-600/[0.08] rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Navbar */}
      <Navbar isDemoMode={isDemoMode} onToggleDemoMode={setIsDemoMode} />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Dynamic Header */}
        <div className="mb-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-medium border border-blue-500/20 mb-3 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Google Labs • AI Thinking Partner</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">ReasonLens</h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Spot what you might be missing, test your assumptions, and make confident decisions.
          </p>
        </div>

        {/* 1-Tap Presets */}
        <QuickScenarioChips onSelectScenario={handleSelectScenario} />

        {/* Multimodal Input */}
        <MultimodalInput
          context={context}
          onChangeContext={setContext}
          rationale={rationale}
          onChangeRationale={setRationale}
          onSubmit={() => handleExecute()}
          isLoading={isGenerating}
          onImageSelected={(b64, mime) => { setImageBase64(b64); setImageMimeType(mime) }}
        />

        {/* Tab Controls */}
        {parsedAnalysis && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold active:scale-[0.98] transition-all duration-150 ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'bg-[#161922] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Decision Breakdown</span>
            </button>
            <button
              onClick={() => setActiveTab('debate')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold active:scale-[0.98] transition-all duration-150 ${
                activeTab === 'debate'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'bg-[#161922] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              <MessageCircle className="h-3.5 w-3.5 text-indigo-400" />
              <span>Wise Partner Chat ✨</span>
            </button>
            <button
              onClick={() => setActiveTab('stream')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold active:scale-[0.98] transition-all duration-150 ${
                activeTab === 'stream'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'bg-[#161922] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              <Code className="h-3.5 w-3.5" />
              <span>Raw JSON Output</span>
            </button>
          </div>
        )}

        {/* Content View */}
        {parsedAnalysis && activeTab === 'dashboard' && (
          <DecisionDashboard analysis={parsedAnalysis} context={context} rationale={rationale} />
        )}
        {parsedAnalysis && activeTab === 'debate' && (
          <WiseDebatePanel analysis={parsedAnalysis} context={context} rationale={rationale} isDemoMode={isDemoMode} />
        )}
        {(activeTab === 'stream' || (!parsedAnalysis && outputContent)) && (
          <StreamingCard content={outputContent} isStreaming={isGenerating} isDemoMode={isDemoMode} />
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-500 border-t border-white/5">
        Google Labs Experiment • PromptWars 2026 • SVPCET Nagpur • Engineering India x Hack2Skill x Google for Developers
      </footer>
    </div>
  )
}

export default App
