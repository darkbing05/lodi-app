import { useEffect } from 'react'
import { useRouter } from 'next/router'

const useFirstLoginRedirect = () => {
  const router = useRouter()

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')

    if (!firstLogin) {
      localStorage.setItem('firstLogin', 'false')
      router.push('/dashboard')
    }
  }, [router])
}

export default useFirstLoginRedirect
