import React, { useRef, useState } from 'react'
import { Image as ImageIcon, Send, X } from 'lucide-react'

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
    <div className="backdrop-blur-2xl bg-[#161922]/80 rounded-2xl p-4 sm:p-5 mb-6 border border-white/10 shadow-xl space-y-4 focus-within:border-indigo-500/40 transition-all">
      {imagePreview && (
        <div className="relative inline-block">
          <img src={imagePreview} alt="Preview" className="h-16 w-16 object-cover rounded-xl border border-indigo-500/30 shadow-md" />
          <button
            onClick={() => { setImagePreview(null); onImageSelected(undefined, undefined) }}
            className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-200">
          What decision are you thinking through?
        </label>
        <textarea
          value={context}
          onChange={(e) => onChangeContext(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., Thinking of quitting my job to build an AI startup full-time..."
          rows={2}
          className="w-full bg-[#0B0E14]/90 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-500 text-xs sm:text-sm border border-white/5 focus:border-indigo-500/60 focus:outline-none resize-none leading-relaxed transition"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-200">
          Why do you feel this is the right move?
        </label>
        <textarea
          value={rationale}
          onChange={(e) => onChangeRationale(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., I have 6 months of runway, strong technical skills, and early user interest..."
          rows={2}
          className="w-full bg-[#0B0E14]/90 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-500 text-xs sm:text-sm border border-white/5 focus:border-indigo-500/60 focus:outline-none resize-none leading-relaxed transition"
        />
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <div className="flex items-center gap-2">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 active:scale-[0.98] transition-all"
          >
            <ImageIcon className="h-3.5 w-3.5 text-indigo-400" />
            <span>Add screenshot or sketch</span>
          </button>
          <span className="text-[11px] text-slate-500 hidden sm:inline">Ctrl+Enter to run</span>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading || (!context.trim() && !rationale.trim())}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
        >
          {isLoading ? (
            <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
          <span>{isLoading ? 'Exploring with Gemini...' : 'Explore My Assumptions ✨'}</span>
        </button>
      </div>
    </div>
  )
}
