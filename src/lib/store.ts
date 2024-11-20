import { create } from 'zustand'
import { Profile, Track } from '@/types'

interface AuthState {
  user: Profile | null
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  logout: () => set({ user: null }),
}))

interface PlayerState {
  currentTrack: Track | null
  setCurrentTrack: (track: Track) => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrack: null,
  setCurrentTrack: (track: Track) => set({ currentTrack: track }),
}))
