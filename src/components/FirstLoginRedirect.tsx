'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const FirstLoginRedirect = () => {
  const router = useRouter()

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')

    if (!firstLogin) {
      localStorage.setItem('firstLogin', 'false')
      router.push('/dashboard')
    }
  }, [router])

  return null
}

export default FirstLoginRedirect
