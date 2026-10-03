import React, { useRef, useState } from 'react'
import { Image as ImageIcon, Send, X, Mic, Paperclip } from 'lucide-react'

interface MultimodalInputProps {
  prompt: string
  onChangePrompt: (val: string) => void
  onSubmit: () => void
  isLoading: boolean
  onImageSelected: (base64: string | undefined, mimeType: string | undefined) => void
}

export const MultimodalInput: React.FC<MultimodalInputProps> = ({
  prompt,
  onChangePrompt,
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
      const result = reader.result as string
      setImagePreview(result)
      const base64Data = result.split(',')[1]
      onImageSelected(base64Data, file.type)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    onImageSelected(undefined, undefined)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      if (!isLoading && prompt.trim()) {
        onSubmit()
      }
    }
  }

  return (
    <div className="glass-panel rounded-2xl p-3 sm:p-4 mb-6 border border-slate-800 focus-within:border-brand-500/50 shadow-xl transition-all">
      {/* Image Preview Thumbnail */}
      {imagePreview && (
        <div className="relative inline-block mb-3">
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            className="h-20 w-20 object-cover rounded-xl border border-slate-700 shadow-md"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 p-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Textarea */}
      <textarea
        value={prompt}
        onChange={(e) => onChangePrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe the problem, ask Gemini to analyze, or select a scenario above... (Ctrl+Enter to run)"
        rows={3}
        className="w-full bg-transparent resize-none text-slate-100 placeholder-slate-500 text-sm focus:outline-none leading-relaxed"
      />

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 mt-2">
        <div className="flex items-center gap-1.5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
            title="Attach multimodal image"
          >
            <ImageIcon className="h-4 w-4 text-brand-400" />
            <span className="hidden sm:inline">Attach Image</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition opacity-60 cursor-not-allowed"
            title="Audio dictation (Multimodal)"
          >
            <Mic className="h-4 w-4 text-slate-500" />
          </button>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading || !prompt.trim()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-brand-500/25 disabled:opacity-40 disabled:cursor-not-allowed transition transform active:scale-95"
        >
          {isLoading ? (
            <>
              <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span>Execute</span>
              <Send className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
