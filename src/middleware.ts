import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from '@/types/supabase';

declare module '@supabase/auth-helpers-nextjs' {
  interface User {
    user_metadata: {
      first_login?: boolean;
      provider?: string;
      role?: Database['public']['Enums']['user_role'];
      avatar_url?: string;
    };
  }
}

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  if (session?.user) {
    const currentPath = req.nextUrl.pathname;
    const userRole = session.user.user_metadata?.role || 'user';
    const firstLogin = session.user.user_metadata?.first_login;

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (profile && profile.role !== userRole) {
      await supabase.auth.updateUser({
        data: {
          role: profile.role
        }
      });
    }

    if (firstLogin === undefined && currentPath !== '/dashboard') {
      try {
        await supabase.auth.updateUser({
          data: {
            first_login: false,
            last_seen: new Date().toISOString()
          }
        });
        return NextResponse.redirect(new URL('/dashboard', req.url));
      } catch (error) {
        console.error('Error updating user metadata:', error);
      }
    }

    if (currentPath === '/login') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return res;
};

export const config = {
  matcher: ['/login', '/dashboard/:path*', '/library/:path*']
};

export default middleware;