'use client'
import { useState, useRef, useEffect } from 'react'
import { usePlayerStore } from '../../lib/store'
import { Play, Pause, SkipBack, SkipForward, Download, Volume2 } from 'lucide-react'

export default function PreviewPlayer() {
  const { currentTrack, setCurrentTrack } = usePlayerStore()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.file_url
      audioRef.current.load()
    }
  }, [currentTrack])

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <audio ref={audioRef} />
      <button onClick={handlePlay}>
        <Play />
      </button>
      <button onClick={handlePause}>
        <Pause />
      </button>
      <button>
        <SkipBack />
      </button>
      <button>
        <SkipForward />
      </button>
      <button>
        <Download />
      </button>
      <button>
        <Volume2 />
      </button>
    </div>
  )
}
