import { NextRequest } from 'next/server'

declare module 'next/server' {
  interface NextRequest {
    ip?: string
    geo?: {
      city?: string
      country?: string
      region?: string
      latitude?: string
      longitude?: string
    }
  }
}
