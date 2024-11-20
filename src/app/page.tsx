// src/app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Lodi Platform</h1>
      <p className="text-xl mb-8">Your unlimited music library</p>
      <a 
        href="/login"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get Started
      </a>
    </main>
  )
}

// src/app/login/page.tsx
'use client'
import AuthForm from '@/components/auth/AuthForm'

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-8 text-center">Login to Lodi</h2>
        <AuthForm />
      </div>
    </div>
  )
}

// src/app/dashboard/page.tsx
'use client'
import { useEffect } from 'react'
import { useAuthStore } from '@/lib/store'
import { supabase } from '@/lib/supabase'

export default function Dashboard() {
  const { profile, setProfile } = useAuthStore()

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        
        setProfile(data)
      }
    }
    
    fetchProfile()
  }, [setProfile])

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      {profile && (
        <div>
          <p>Welcome, {profile.username}!</p>
        </div>
      )}
    </div>
  )
}