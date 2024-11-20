'use client'

import { useState } from 'react'
import ReactPlayer from 'react-player'
import { Track } from '@/types/index'

export default function MusicPlayer({ track }: { track: Track }) {
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setPlaying(!playing)}
            className="p-2 hover:bg-gray-700 rounded"
          >
            {playing ? '⏸️' : '▶️'}
          </button>
          <div>
            <p className="font-medium">{track.title}</p>
            <p className="text-sm text-gray-400">{track.category}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => console.log('Skip Back')}
            className="p-2 hover:bg-gray-700 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-skip-back">
              <polygon points="19 20 9 12 19 4 19 20"></polygon>
              <line x1="5" x2="5" y1="19" y2="5"></line>
            </svg>
          </button>
          <button 
            onClick={() => console.log('Skip Forward')}
            className="p-2 hover:bg-gray-700 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-skip-forward">
              <polygon points="5 4 15 12 5 20 5 4"></polygon>
              <line x1="19" x2="19" y1="5" y2="19"></line>
            </svg>
          </button>
          <input 
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24"
          />
          <ReactPlayer 
            url={track.file_url}
            playing={playing}
            volume={volume}
            width="0"
            height="0"
          />
        </div>
      </div>
    </div>
  )
}
