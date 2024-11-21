import { useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/login')
      } else if (event === 'SIGNED_IN') {
        const firstLogin = session?.user?.user_metadata?.first_login
        if (firstLogin === undefined) {
          router.push('/dashboard')
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase, router])

  return { supabase }
}