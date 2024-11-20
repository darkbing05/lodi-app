//'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect } from 'react'

export default function Home() {
  const supabase = createClientComponentClient()

  // useEffect(() => {
  //   const getSession = async () => {
  //     const { data: { session } } = await supabase.auth.getSession()
  //     console.log('Session on Home Page:', session)
  //   }

  //   getSession()
  // }, [supabase])

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
