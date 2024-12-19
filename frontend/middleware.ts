import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/database.types'

const publicPaths = ['/login', '/register', '/forgot-password', '/reset-password']

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req: request, res })
  
  const { data: { session } } = await supabase.auth.getSession()
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/auth/')) return res

  if (publicPaths.includes(pathname)) {
    if (session) return NextResponse.redirect(new URL('/', request.url))
    return res
  }

  if (!session) return NextResponse.redirect(new URL('/login', request.url))

  return res
}