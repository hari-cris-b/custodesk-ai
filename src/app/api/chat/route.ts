import { NextResponse } from 'next/server'
import { getGeminiResponse } from '@/lib/gemini'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    // Rate limiting check (optional)
    const userIP = req.headers.get('x-forwarded-for') || 'unknown'
    const rateLimitKey = `${userIP}:${Date.now()}`
    
    const response = await getGeminiResponse(message)
    
    return new NextResponse(response, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache, no-transform',
      },
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
