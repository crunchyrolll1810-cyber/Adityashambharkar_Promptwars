import { useState, useMemo } from 'react'
import { Navbar } from './components/Navbar'
import { InteractiveDotGrid } from './components/InteractiveDotGrid'
import { QuickScenarioChips } from './components/QuickScenarioChips'
import { MultimodalInput } from './components/MultimodalInput'
import { CalibrationCard } from './components/CalibrationCard'
import { StreamingCard } from './components/StreamingCard'
import { DecisionDashboard } from './components/DecisionDashboard'
import { GreatSageWidget } from './components/GreatSageWidget'
import { generateContentStream, parseDecisionAnalysis, reEvaluateDecision } from './services/geminiService'
import { CalibrationAnswer } from './types/decision.types'
import { Sparkles, Eye, Code } from 'lucide-react'

export function App() {
  const [context, setContext] = useState(''); const [rationale, setRationale] = useState('')
  const [imageBase64, setImageBase64] = useState<string | undefined>(); const [imageMimeType, setImageMimeType] = useState<string | undefined>()
  const [outputContent, setOutputContent] = useState(''); const [isGenerating, setIsGenerating] = useState(false)
  const [isDemoMode, setIsDemoMode] = useState(false); const [activeTab, setActiveTab] = useState<'dashboard' | 'stream'>('dashboard')
  const [reflections, setReflections] = useState<Record<number, string>>({}); const [isReevaluating, setIsReevaluating] = useState(false)
  const [isCalibrating, setIsCalibrating] = useState(false); const [calibrationAnswers, setCalibrationAnswers] = useState<CalibrationAnswer[]>([])

  const parsedAnalysis = useMemo(() => parseDecisionAnalysis(outputContent, context), [outputContent, context])
  const handleSelectScenario = (c: string, r: string) => { setContext(c); setRationale(r); setIsCalibrating(true) }

  const handleExecute = async (ovCtx?: string, ovRat?: string, ovAns?: CalibrationAnswer[]) => {
    const actCtx = ovCtx ?? context, actRat = ovRat ?? rationale, actAns = ovAns ?? calibrationAnswers
    if ((!actCtx.trim() && !actRat.trim()) || isGenerating) return
    setIsCalibrating(false); setOutputContent(''); setReflections({}); setIsGenerating(true); setActiveTab('dashboard')
    try {
      await generateContentStream(
        { decisionInput: { context: actCtx, rationale: actRat, calibrationAnswers: actAns }, imageBase64, imageMimeType, isDemoMode, onReset: () => setOutputContent('') },
        (tok) => setOutputContent((p) => p + tok)
      )
    } catch (e) { console.error(e) } finally { setIsGenerating(false) }
  }

  const handleReEvaluate = async () => {
    if (!parsedAnalysis || isReevaluating) return
    setIsReevaluating(true)
    try {
      const { updatedAnalysis } = await reEvaluateDecision(parsedAnalysis, reflections, context, rationale)
      setOutputContent(JSON.stringify(updatedAnalysis, null, 2))
    } catch (e) { console.error(e) } finally { setIsReevaluating(false) }
  }

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-violet-500/30 selection:text-violet-100">
      <InteractiveDotGrid />
      <div className="fixed -top-32 left-1/4 w-[650px] h-[650px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-radial-pulse" />
      <div className="fixed top-1/4 -right-24 w-[600px] h-[600px] bg-violet-600/12 rounded-full blur-[150px] pointer-events-none -z-10 animate-radial-pulse" />
      <div className="fixed -bottom-28 left-1/3 w-[600px] h-[600px] bg-rose-600/[0.06] rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed inset-0 vignette-overlay -z-10" />
      <div className="fixed inset-0 scanline-overlay opacity-30 -z-10" />

      <Navbar isDemoMode={isDemoMode} onToggleDemoMode={setIsDemoMode} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 text-violet-300 font-mono text-xs font-semibold border border-violet-500/30 mb-4 shadow-sm shadow-violet-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            <span>[EXP · LABS #01] • Thinking Partner</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 leading-[1.08]">
            INTERROGATE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400">
              YOUR THINKING.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
            Spot what you might be missing, test your assumptions, and make confident decisions.
          </p>
        </div>

        <QuickScenarioChips onSelectScenario={handleSelectScenario} />

        <MultimodalInput
          context={context} onChangeContext={setContext}
          rationale={rationale} onChangeRationale={setRationale}
          onSubmit={() => (context.trim() || rationale.trim()) && setIsCalibrating(true)}
          isLoading={isGenerating}
          onImageSelected={(b64, mime) => { setImageBase64(b64); setImageMimeType(mime) }}
        />

        {isCalibrating && !isGenerating && (
          <CalibrationCard
            context={context}
            onConfirm={(ans) => { setCalibrationAnswers(ans); handleExecute(context, rationale, ans) }}
            onSkip={() => handleExecute(context, rationale, [])}
            isLoading={isGenerating}
          />
        )}

        {parsedAnalysis && (
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold active:scale-[0.97] transition-all duration-150 ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                  : 'bg-[#161922] text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              <Eye className="h-4 w-4" /><span>Decision Breakdown</span>
            </button>
            <button
              onClick={() => setActiveTab('stream')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-[11px] font-medium transition-all ${
                activeTab === 'stream' ? 'bg-white/10 text-white border border-white/20' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Code className="h-3 w-3" /><span>Raw JSON</span>
            </button>
          </div>
        )}

        {parsedAnalysis && activeTab === 'dashboard' ? (
          <DecisionDashboard
            analysis={parsedAnalysis} context={context} rationale={rationale}
            reflections={reflections} onChangeReflection={(idx, val) => setReflections(p => ({ ...p, [idx]: val }))}
            onReEvaluate={handleReEvaluate} isReevaluating={isReevaluating}
          />
        ) : (
          <StreamingCard content={outputContent} isStreaming={isGenerating} isDemoMode={isDemoMode} />
        )}

        {parsedAnalysis && (
          <GreatSageWidget analysis={parsedAnalysis} context={context} rationale={rationale} isDemoMode={isDemoMode} />
        )}
      </main>

      <footer className="py-4 text-center text-xs text-slate-500 border-t border-white/5 font-mono">
        Google Labs Experiment • PromptWars 2026 • SVPCET Nagpur • Engineering India x Hack2Skill x Google for Developers
      </footer>
    </div>
  )
}

export default App
