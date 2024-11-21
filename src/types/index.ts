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
  url: string
  user_id: string
  format: string
  size: number
  description?: string
  category: string
  plays: number
  downloads: number
  created_at: string
}

export type Subscription = {
  id: string
  user_id: string
  plan: 'monthly' | 'yearly' | 'lifetime'
  status: string
  created_at: string
}
