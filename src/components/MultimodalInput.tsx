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
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
      }}
      className="spotlight-card backdrop-blur-2xl bg-[#161922]/85 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-5 focus-within:border-indigo-500/50 transition-all"
    >
      {imagePreview && (
        <div className="relative inline-block">
          <img src={imagePreview} alt="Preview" className="h-20 w-20 object-cover rounded-2xl border border-indigo-500/30 shadow-md" />
          <button
            onClick={() => { setImagePreview(null); onImageSelected(undefined, undefined) }}
            className="absolute -top-2 -right-2 p-1 rounded-full bg-slate-800 text-slate-300 hover:text-white border border-white/10"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-indigo-300">
          What decision are you thinking through?
        </label>
        <textarea
          value={context}
          onChange={(e) => onChangeContext(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., Thinking of quitting my job to build an AI startup full-time..."
          rows={3}
          className="w-full bg-[#0B0E14]/90 rounded-2xl px-4 py-3 text-slate-100 placeholder-slate-500 text-sm border border-white/5 focus:border-indigo-500/60 focus:outline-none resize-none leading-relaxed transition"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-indigo-300">
          Why do you feel this is the right move?
        </label>
        <textarea
          value={rationale}
          onChange={(e) => onChangeRationale(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., I have 6 months of runway, strong technical skills, and early user interest..."
          rows={3}
          className="w-full bg-[#0B0E14]/90 rounded-2xl px-4 py-3 text-slate-100 placeholder-slate-500 text-sm border border-white/5 focus:border-indigo-500/60 focus:outline-none resize-none leading-relaxed transition"
        />
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-2.5">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 active:scale-[0.97] transition-all"
          >
            <ImageIcon className="h-4 w-4 text-indigo-400" />
            <span>Add screenshot or sketch</span>
          </button>
          <span className="text-xs text-slate-500 hidden sm:inline">Ctrl+Enter to run</span>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading || (!context.trim() && !rationale.trim())}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] transition-all"
        >
          {isLoading ? (
            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          <span>{isLoading ? 'Exploring with Gemini...' : 'Explore My Assumptions ✨'}</span>
        </button>
      </div>
    </div>
  )
}
