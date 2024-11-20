'use client'

import CategoryCard from '@/components/dashboard/CategoryCard'
import Sidebar from '@/app/dashboard/Sidebar'
import { Track } from '@/types/index'
import MusicPlayer from '@/components/player/MusicPlayer'
import TrackCard from '@/components/player/TrackCard'

export default function Dashboard() {
  const tracks: Track[] = [
    {
      id: '1',
      title: 'Song Title 1',
      file_url: '/public/globe.svg',
      preview_url: 'https://picsum.photos/200',
      category: 'Pop',
      user_id: 'user1',
      downloads: 1234,
      created_at: '2023-10-01T12:00:00Z',
      playCount: 1234,
      artist: 'Artist Name 1',
      artwork: 'https://picsum.photos/200',
    },
    {
      id: '2',
      title: 'Song Title 2',
      file_url: '/public/next.svg',
      preview_url: 'https://picsum.photos/200',
      category: 'Rock',
      user_id: 'user2',
      downloads: 5678,
      created_at: '2023-10-02T12:00:00Z',
      playCount: 5678,
      artist: 'Artist Name 2',
      artwork: 'https://picsum.photos/200',
    },
    {
      id: '3',
      title: 'Song Title 3',
      file_url: '/public/vercel.svg',
      preview_url: 'https://picsum.photos/200',
      category: 'Hip Hop',
      user_id: 'user3',
      downloads: 91011,
      created_at: '2023-10-03T12:00:00Z',
      playCount: 91011,
      artist: 'Artist Name 3',
      artwork: 'https://picsum.photos/200',
    },
    {
      id: '4',
      title: 'Song Title 4',
      file_url: '/public/window.svg',
      preview_url: 'https://picsum.photos/200',
      category: 'Country',
      user_id: 'user4',
      downloads: 121314,
      created_at: '2023-10-04T12:00:00Z',
      playCount: 121314,
      artist: 'Artist Name 4',
      artwork: 'https://picsum.photos/200',
    },
  ]

  return (
    <div className="p-6 flex">
      <Sidebar />
      <div className="flex-1">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Charts: Top 50</h2>
          <div className="grid grid-cols-6 gap-4">
            <CategoryCard genre="All Music" />
            <CategoryCard genre="Pop" />
            <CategoryCard genre="Hip Hop" />
            <CategoryCard genre="Rock" />
            <CategoryCard genre="R&B/Soul" />
            <CategoryCard genre="Country" />
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Listening History</h2>
          <div className="grid grid-cols-4 gap-4">
            {tracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
          <a href="#" className="text-primary hover:underline">See All</a>
        </section>
        <section>
          <MusicPlayer track={tracks[0]} />
        </section>
      </div>
    </div>
  )
}
