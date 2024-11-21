import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Track } from '@/types'

export function useTracks() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTracks = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return null

    const { data } = await supabase
      .from('tracks')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
    
    setTracks(data || [])
    setIsLoading(false)
    return data
  }

  const deleteTrack = async (trackId: string) => {
    const { error } = await supabase
      .from('tracks')
      .delete()
      .eq('id', trackId)

    if (!error) {
      await fetchTracks()
    }
    return error
  }

  const updateTrack = async (track: Track) => {
    const { error } = await supabase
      .from('tracks')
      .update(track)
      .eq('id', track.id)

    if (!error) {
      await fetchTracks()
    }
    return error
  }

  useEffect(() => {
    fetchTracks()
  }, [])

  return {
    tracks,
    isLoading,
    fetchTracks,
    deleteTrack,
    updateTrack
  }
}