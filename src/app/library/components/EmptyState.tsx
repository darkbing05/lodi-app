// components/EmptyState.tsx
import { PlusCircle, AudioWaveform, Info } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="h-[calc(100vh-200px)] flex flex-col items-center justify-center">
      <div className="max-w-md text-center space-y-6">
        <div className="w-24 h-24 bg-gradient-to-br from-[#00BCD4] to-[#0D47A1] rounded-full flex items-center justify-center mx-auto">
          <AudioWaveform className="w-12 h-12 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2">Your Library is Empty</h3>
          <p className="text-gray-500 mb-8">Start creating your music collection by uploading your first track</p>
        </div>
        <div className="space-y-4">
          <label
            htmlFor="track-upload"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#EBFF00] hover:bg-[#EBFF00]/90 cursor-pointer transition-colors font-medium"
          >
            <PlusCircle className="w-5 h-5" />
            Upload Your First Track
          </label>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Info className="w-4 h-4" />
            <span>Supported formats: MP3, WAV, FLAC</span>
          </div>
        </div>
      </div>
      {/* Features Grid */}
    </div>
  )
}