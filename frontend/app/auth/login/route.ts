import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { Database } from '@/lib/database.types'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const email = String(formData.get('email'))
    const password = String(formData.get('password'))
    
    console.log('Auth attempt:', { email }) // Log auth attempt
    
    const cookieStore = await cookies()
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore
    })

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    console.log('Supabase response:', { data, error }) // Log response

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Auth error:', err)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}