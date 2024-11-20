'use client'

import { Track } from '@/types/index'

interface TrackCardProps {
  track: Track
}

export default function TrackCard({ track }: TrackCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4 relative">
      <img src={track.artwork} alt={track.title} className="w-full h-32 object-cover rounded-t-lg" />
      <div className="mt-2">
        <h3 className="text-lg font-bold text-gray-800">{track.title}</h3>
        <p className="text-gray-600">{track.artist}</p>
        <p className="text-gray-500">Played {track.playCount} times</p>
        <div className="flex justify-between mt-2">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Play</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Download</button>
        </div>
      </div>
    </div>
  )
}
