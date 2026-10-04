import React, { useRef, useState } from 'react'
import { Image as ImageIcon, Send, X, Layers, Compass } from 'lucide-react'

interface MultimodalInputProps {
  context: string
  onChangeContext: (val: string) => void
  rationale: string
  onChangeRationale: (val: string) => void
  onSubmit: () => void
  isLoading: boolean
  onImageSelected: (base64: string | undefined, mimeType: string | undefined) => void
}

export const MultimodalInput: React.FC<MultimodalInputProps> = ({
  context,
  onChangeContext,
  rationale,
  onChangeRationale,
  onSubmit,
  isLoading,
  onImageSelected,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const res = reader.result as string
      setImagePreview(res)
      onImageSelected(res.split(',')[1], file.type)
    }
    reader.readAsDataURL(file)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && !isLoading && (context.trim() || rationale.trim())) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className="backdrop-blur-xl bg-slate-900/60 rounded-2xl p-4 mb-6 border border-white/10 shadow-2xl space-y-3">
      {imagePreview && (
        <div className="relative inline-block">
          <img src={imagePreview} alt="Preview" className="h-16 w-16 object-cover rounded-xl border border-white/10 shadow" />
          <button
            onClick={() => { setImagePreview(null); onImageSelected(undefined, undefined) }}
            className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
          <Compass className="h-3.5 w-3.5 text-brand-400" />
          <span>What are you deciding?</span>
        </div>
        <textarea
          value={context}
          onChange={(e) => onChangeContext(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Thinking of quitting my job to build a startup..."
          rows={2}
          className="w-full bg-slate-950/60 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-500 text-xs border border-white/5 focus:border-brand-500/50 focus:outline-none resize-none"
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
          <Layers className="h-3.5 w-3.5 text-indigo-400" />
          <span>Why do you think it's a good idea?</span>
        </div>
        <textarea
          value={rationale}
          onChange={(e) => onChangeRationale(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. I have 6 months of savings and strong coding skills..."
          rows={2}
          className="w-full bg-slate-950/60 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-500 text-xs border border-white/5 focus:border-brand-500/50 focus:outline-none resize-none"
        />
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <div className="flex items-center gap-2">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 active:scale-[0.97] transition-all"
          >
            <ImageIcon className="h-3.5 w-3.5 text-brand-400" />
            <span className="text-[11px]">Attach Image / Note</span>
          </button>
          <span className="text-[10px] text-slate-500 hidden sm:inline">Ctrl+Enter to submit</span>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading || (!context.trim() && !rationale.trim())}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-brand-500/20 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] transition-all"
        >
          {isLoading ? (
            <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
          <span>{isLoading ? 'Reviewing...' : 'Review My Decision'}</span>
        </button>
      </div>
    </div>
  )
}
