import { NextRequest, NextResponse } from 'next/server'
import * as jose from 'jose'
import { routes } from '@/config/routes'

// Secret key for JWT signing (must match the one in auth.ts)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

// List of paths that should not redirect to login
const publicPaths = [
  routes.admin.signin,
  routes.home,
  routes.products,
  routes.categories,
  routes.about,
  routes.contact,
  // Add other public paths
]

// Check if the path is public
const isPublicPath = (path: string) => {
  return publicPaths.some(
    (publicPath) =>
      path === publicPath ||
      path.startsWith(publicPath + '/') ||
      path.startsWith('/_next/') ||
      path.startsWith('/api/') ||
      path.startsWith('/favicon.ico'),
  )
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for public routes
  if (isPublicPath(pathname)) {
    return NextResponse.next()
  }

  // Check for session cookie
  const sessionCookie = request.cookies.get('session')?.value

  // If no session, redirect based on the route type
  if (!sessionCookie) {
    console.log('No session cookie found')

    // For admin routes, redirect to admin signin
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL(routes.admin.signin, request.url))
    }

    // For website routes that need auth, we don't redirect - the AuthContext will handle showing the modal
    return NextResponse.next()
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

    // For admin routes, check if the user is an admin directly from JWT claim
    if (pathname.startsWith('/admin')) {
      if (!payload.isAdmin) {
        console.log('User is not an admin, redirecting to homepage')
        return NextResponse.redirect(new URL(routes.home, request.url))
      }

      console.log('Admin access verified from JWT claim')
    }

    // Inject user ID into request headers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', payload.userId as string)

    return NextResponse.next({
      request: { headers: requestHeaders },
    })
  } catch (error) {
    console.error('JWT verification failed:', error)

    // For admin routes, redirect to admin signin
    if (pathname.startsWith('/admin')) {
      const response = NextResponse.redirect(
        new URL(routes.admin.signin, request.url),
      )
      response.cookies.delete('session')
      return response
    }

    // For other routes, just clear the cookie and proceed
    const response = NextResponse.next()
    response.cookies.delete('session')
    return response
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/account/:path*',
    '/checkout/:path*',
    // Add other protected paths that should trigger middleware
  ],
}
