import { NextRequest, NextResponse } from 'next/server'

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export function middleware(request: NextRequest) {
  // Rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.ip || 'anonymous'
    const now = Date.now()
    const windowMs = 15 * 60 * 1000 // 15 minutes
    const maxRequests = 10

    const current = rateLimitStore.get(ip)
    
    if (!current || now > current.resetTime) {
      rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    } else if (current.count >= maxRequests) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    } else {
      current.count++
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*'
}