import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    console.log('Callback Data:', data)
    console.log('Callback Error:', error)

    // Clear firstLogin from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('firstLogin')
    }
  }

  return NextResponse.redirect(new URL('/dashboard', request.url))
}
