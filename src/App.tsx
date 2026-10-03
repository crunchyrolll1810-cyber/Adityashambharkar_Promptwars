import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { QuickScenarioChips } from './components/QuickScenarioChips'
import { MultimodalInput } from './components/MultimodalInput'
import { StreamingCard } from './components/StreamingCard'
import { generateContentStream } from './services/geminiService'
import { Sparkles } from 'lucide-react'

export function App() {
  const [prompt, setPrompt] = useState('')
  const [imageBase64, setImageBase64] = useState<string | undefined>()
  const [imageMimeType, setImageMimeType] = useState<string | undefined>()
  const [outputContent, setOutputContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDemoMode, setIsDemoMode] = useState(false)

  const handleSelectScenario = (selectedPrompt: string) => {
    setPrompt(selectedPrompt)
    handleExecute(selectedPrompt)
  }

  const handleExecute = async (overridePrompt?: string) => {
    const activePrompt = overridePrompt || prompt
    if (!activePrompt.trim() || isGenerating) return

    setOutputContent('')
    setIsGenerating(true)

    try {
      await generateContentStream(
        {
          prompt: activePrompt,
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-brand-500/30 selection:text-brand-100">
      {/* Ambient Radial Background Accents */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Navbar */}
      <Navbar isDemoMode={isDemoMode} onToggleDemoMode={setIsDemoMode} />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        {/* Dynamic Header */}
        <div className="mb-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 text-xs font-semibold border border-brand-500/20 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Solution Canvas</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Intelligence Engine
          </h1>
          <p className="text-xs text-slate-400 max-w-xl">
            Clean, modular interface powered by Gemini 2.5 Flash. Ready to be shaped into any hackathon solution.
          </p>
        </div>

        {/* Customizable Chips */}
        <QuickScenarioChips onSelectScenario={handleSelectScenario} />

        {/* Multimodal Prompt Input */}
        <MultimodalInput
          prompt={prompt}
          onChangePrompt={setPrompt}
          onSubmit={() => handleExecute()}
          isLoading={isGenerating}
          onImageSelected={(b64, mime) => {
            setImageBase64(b64)
            setImageMimeType(mime)
          }}
        />

        {/* Streaming Intelligence Card */}
        <StreamingCard
          content={outputContent}
          isStreaming={isGenerating}
          isDemoMode={isDemoMode}
        />
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-600 border-t border-slate-900">
        PromptWars 2026 • SVPCET Nagpur
      </footer>
    </div>
  )
}

export default App
