import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/types_db'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const { pathname, origin } = req.nextUrl

  if (!user && pathname === '/dashboard') {
    return NextResponse.redirect(`${origin}/signin`)
  }

  console.log('USER: ', user);
  return res
}