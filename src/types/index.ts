export interface Profile {
  id: string
  username: string
  name: string
  email: string
  avatar_url?: string
  updated_at?: string
  role: 'user' | 'musician' | 'admin'
}

export type Track = {
  id: string
  title: string
  file_url: string
  preview_url?: string
  category?: string
  user_id: string
  downloads: number
  created_at: string
  playCount: number // Added playCount to match the TrackCard component
  artist: string // Added artist property
  artwork: string // Added artwork property
}

export type Subscription = {
  id: string
  user_id: string
  plan: 'monthly' | 'yearly' | 'lifetime'
  status: string
  created_at: string
}
