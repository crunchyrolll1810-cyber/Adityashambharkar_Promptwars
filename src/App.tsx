import { useState, useMemo } from 'react'
import { Navbar } from './components/Navbar'
import { InteractiveDotGrid } from './components/InteractiveDotGrid'
import { QuickScenarioChips } from './components/QuickScenarioChips'
import { MultimodalInput } from './components/MultimodalInput'
import { StreamingCard } from './components/StreamingCard'
import { DecisionDashboard } from './components/DecisionDashboard'
import { GreatSageWidget } from './components/GreatSageWidget'
import { generateContentStream, parseDecisionAnalysis, reEvaluateDecision } from './services/geminiService'
import { Sparkles, Eye, Code } from 'lucide-react'

export function App() {
  const [context, setContext] = useState(''); const [rationale, setRationale] = useState('')
  const [imageBase64, setImageBase64] = useState<string | undefined>(); const [imageMimeType, setImageMimeType] = useState<string | undefined>()
  const [outputContent, setOutputContent] = useState(''); const [isGenerating, setIsGenerating] = useState(false)
  const [isDemoMode, setIsDemoMode] = useState(false); const [activeTab, setActiveTab] = useState<'dashboard' | 'stream'>('dashboard')
  const [reflections, setReflections] = useState<Record<number, string>>({}); const [isReevaluating, setIsReevaluating] = useState(false)

  const parsedAnalysis = useMemo(() => parseDecisionAnalysis(outputContent, context), [outputContent, context])

  const handleSelectScenario = (c: string, r: string) => { setContext(c); setRationale(r); handleExecute(c, r) }

  const handleExecute = async (overrideContext?: string, overrideRationale?: string) => {
    const activeContext = overrideContext !== undefined ? overrideContext : context
    const activeRationale = overrideRationale !== undefined ? overrideRationale : rationale
    if ((!activeContext.trim() && !activeRationale.trim()) || isGenerating) return

    setOutputContent(''); setReflections({}); setIsGenerating(true); setActiveTab('dashboard')
    try {
      await generateContentStream(
        { decisionInput: { context: activeContext, rationale: activeRationale }, imageBase64, imageMimeType, isDemoMode, onReset: () => setOutputContent('') },
        (token) => setOutputContent((prev) => prev + token)
      )
    } catch (err) { console.error(err) } finally { setIsGenerating(false) }
  }

  const handleReEvaluate = async () => {
    if (!parsedAnalysis || isReevaluating) return
    setIsReevaluating(true)
    try {
      const { updatedAnalysis } = await reEvaluateDecision(parsedAnalysis, reflections, context, rationale)
      setOutputContent(JSON.stringify(updatedAnalysis, null, 2))
    } catch (err) { console.error(err) } finally { setIsReevaluating(false) }
  }

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-100">
      <InteractiveDotGrid />
      <div className="fixed -top-24 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 -right-20 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="fixed -bottom-24 left-1/3 w-[500px] h-[500px] bg-rose-600/[0.06] rounded-full blur-[140px] pointer-events-none -z-10" />

      <Navbar isDemoMode={isDemoMode} onToggleDemoMode={setIsDemoMode} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-medium border border-blue-500/20 mb-3 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Google Labs • AI Thinking Partner</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">ReasonLens</h1>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            Spot what you might be missing, test your assumptions, and make confident decisions.
          </p>
        </div>

        <QuickScenarioChips onSelectScenario={handleSelectScenario} />

        <MultimodalInput
          context={context}
          onChangeContext={setContext}
          rationale={rationale}
          onChangeRationale={setRationale}
          onSubmit={() => handleExecute()}
          isLoading={isGenerating}
          onImageSelected={(b64, mime) => { setImageBase64(b64); setImageMimeType(mime) }}
        />

        {parsedAnalysis && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold active:scale-[0.98] transition-all duration-150 ${
                  activeTab === 'dashboard'
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                    : 'bg-[#161922] text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <Eye className="h-4 w-4" />
                <span>Decision Breakdown</span>
              </button>
            </div>
            <button
              onClick={() => setActiveTab('stream')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-medium transition-all ${
                activeTab === 'stream' ? 'bg-white/10 text-white border border-white/20' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Code className="h-3 w-3" />
              <span>Raw JSON</span>
            </button>
          </div>
        )}

        {parsedAnalysis && activeTab === 'dashboard' ? (
          <DecisionDashboard
            analysis={parsedAnalysis}
            context={context}
            rationale={rationale}
            reflections={reflections}
            onChangeReflection={(idx, val) => setReflections(prev => ({ ...prev, [idx]: val }))}
            onReEvaluate={handleReEvaluate}
            isReevaluating={isReevaluating}
          />
        ) : (
          <StreamingCard content={outputContent} isStreaming={isGenerating} isDemoMode={isDemoMode} />
        )}

        {parsedAnalysis && (
          <GreatSageWidget
            analysis={parsedAnalysis}
            context={context}
            rationale={rationale}
            isDemoMode={isDemoMode}
          />
        )}
      </main>

      <footer className="py-4 text-center text-xs text-slate-500 border-t border-white/5">
        Google Labs Experiment • PromptWars 2026 • SVPCET Nagpur • Engineering India x Hack2Skill x Google for Developers
      </footer>
    </div>
  )
}

export default App
