import { useState, useMemo } from 'react'
import { Navbar } from './components/Navbar'
import { InteractiveDotGrid } from './components/InteractiveDotGrid'
import { QuickScenarioChips } from './components/QuickScenarioChips'
import { MultimodalInput } from './components/MultimodalInput'
import { CalibrationCard } from './components/CalibrationCard'
import { StreamingCard } from './components/StreamingCard'
import { DecisionDashboard } from './components/DecisionDashboard'
import { generateContentStream, parseDecisionAnalysis, reEvaluateDecision } from './services/geminiService'
import { CalibrationAnswer } from './types/decision.types'
import { GreatSageWidget } from './components/GreatSageWidget'
import { HeroHeader } from './components/HeroHeader'
import { Eye, Code } from 'lucide-react'

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
      <div className="fixed -top-[12vh] left-[15vw] w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-radial-pulse" />
      <div className="fixed top-[20vh] -right-[8vw] w-[42vw] h-[42vw] max-w-[600px] max-h-[600px] bg-violet-600/12 rounded-full blur-[150px] pointer-events-none -z-10 animate-radial-pulse" />
      <div className="fixed -bottom-[12vh] left-[25vw] w-[42vw] h-[42vw] max-w-[600px] max-h-[600px] bg-rose-600/[0.06] rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed inset-0 vignette-overlay -z-10" />
      <div className="fixed inset-0 scanline-overlay opacity-30 -z-10" />

      <Navbar isDemoMode={isDemoMode} onToggleDemoMode={setIsDemoMode} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-7">
        <HeroHeader />

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

        {isGenerating && (
          <div className="w-full h-1.5 bg-[#161922] rounded-full overflow-hidden border border-white/5 shadow-inner animate-fade-in">
            <div className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 animate-shimmer rounded-full w-full" />
          </div>
        )}

        {parsedAnalysis && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold active:scale-[0.97] transition-all ${
                  activeTab === 'dashboard' ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md' : 'bg-[#161922] text-slate-300 hover:text-white border border-white/10'
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

            <div className="flex items-center gap-3 py-1.5 px-3.5 rounded-xl bg-[#161922]/80 border border-white/10 text-[11px] text-slate-300 font-mono shadow-sm">
              <span className="text-amber-300 font-semibold">⚡ {parsedAnalysis.unstatedAssumptions.length} Assumptions</span>
              <span className="text-slate-600">·</span>
              <span className="text-rose-300 font-semibold">🔴 {parsedAnalysis.preMortemScenarios.length} Failure Modes</span>
              <span className="text-slate-600">·</span>
              <span className="text-violet-300 font-semibold">💡 {parsedAnalysis.socraticQuestions.length} Questions</span>
            </div>
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

      <footer className="relative py-6 text-center text-xs text-slate-500 font-mono">
        <div className="absolute top-0 left-0 right-0 h-[1.5px] google-ribbon opacity-70" />
        <p className="flex items-center justify-center gap-2 flex-wrap">
          <span>Google Labs Experiment</span><span className="text-violet-400">◆</span><span>PromptWars 2026</span><span className="text-violet-400">◆</span><span>SVPCET Nagpur</span><span className="text-violet-400">◆</span><span>Hack2Skill x Google for Developers</span>
        </p>
      </footer>
    </div>
  )
}

export default App
