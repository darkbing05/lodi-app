import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { TrackData } from 'types/dtos/track.dto';

export class TrackService {
  private supabase = createRouteHandlerClient({ cookies })

  async getTracks({ page, limit }: { page: string; limit: string }) {
    const from = (parseInt(page) - 1) * parseInt(limit)
    const to = from + parseInt(limit)

    const { data, error } = await this.supabase
      .from('tracks')
      .select('*', { count: 'exact' })
      .range(from, to)

    if (error) throw error
    return data
  }

  async createTrack(trackData: TrackData) {
    // Implementation
  }
}
