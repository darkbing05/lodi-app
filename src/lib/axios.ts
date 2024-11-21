import axios from 'axios'
import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const supabase = createClientComponentClient()
  const { data: { session } } = await supabase.auth.getSession()

  // Add auth header if session exists
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const supabase = createClientComponentClient()
      await supabase.auth.signOut()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient