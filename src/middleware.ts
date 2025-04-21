import { NextRequest, NextResponse } from 'next/server'
import * as jose from 'jose'

// Secret key for JWT signing (must match the one in auth.ts)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for public and signin routes
  if (pathname.startsWith('/admin/signin')) {
    return NextResponse.next()
  }

  // Check for session cookie
  const sessionCookie = request.cookies.get('session')?.value

  // If no session, redirect to signin (except for signin page)
  if (!sessionCookie) {
    console.log('No session cookie found, redirecting to signin')
    return NextResponse.redirect(new URL('/admin/signin', request.url))
  }

  try {
    // Verify the JWT token
    console.log('Verifying JWT token')
    const { payload } = await jose.jwtVerify(sessionCookie, JWT_SECRET)

    if (!payload || !payload.userId) {
      console.log('Invalid token payload')
      throw new Error('Invalid token')
    }

    console.log('JWT verified successfully')

    // Inject user ID into request headers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', payload.userId as string)

    return NextResponse.next({
      request: { headers: requestHeaders },
    })
  } catch (error) {
    console.error('JWT verification failed:', error)
    const response = NextResponse.redirect(
      new URL('/admin/signin', request.url),
    )
    response.cookies.delete('session')
    return response
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
