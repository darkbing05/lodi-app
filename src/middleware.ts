import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const middleware = async (req: NextRequest) => {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })
    const { data: { session } } = await supabase.auth.getSession()
  
    // Redirect to dashboard if logged in and trying to access login page
    if (session && req.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  
    return res
  }
  
  export default middleware
  
  export const config = {
    matcher: ['/login', '/dashboard/:path*', '/library/:path*']
  }