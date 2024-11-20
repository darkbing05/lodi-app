'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Track } from '@/types'

export default function Library() {
  const [tracks, setTracks] = useState<Track[]>([])

  useEffect(() => {
    const fetchTracks = async () => {
      const { data } = await supabase
        .from('tracks')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) setTracks(data)
    }

    fetchTracks()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Music Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map((track) => (
          <div 
            key={track.id}
            className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
          >
            <h3 className="font-bold">{track.title}</h3>
            <p className="text-gray-600">{track.category}</p>
          </div>
        ))}
      </div>
    </div>
  )
}