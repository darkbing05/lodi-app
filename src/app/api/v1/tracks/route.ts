import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { TrackService } from '@/services/track.service'
import { TrackData } from '@/types/dtos/track.dto'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    
    const trackService = new TrackService()
    const tracks: TrackData[] = await trackService.getTracks({ page, limit })
    
    return NextResponse.json(tracks)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    )
  }
}
