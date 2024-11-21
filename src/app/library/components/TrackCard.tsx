// components/TrackCard.tsx
import { PlayCircle, Pause, Pencil, Trash2, BarChart2, Download, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Track } from '@/types'
import { format } from 'date-fns'

interface TrackCardProps {
  track: Track
  isPlaying: boolean
  onPlay: () => void
  onEdit: () => void
  onAnalytics: () => void
  onDelete: () => void
}

export default function TrackCard({ track, isPlaying, onPlay, onEdit, onAnalytics, onDelete }: TrackCardProps) {
  return (
    <div className="p-6 rounded-xl bg-white border hover:shadow-lg transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg group-hover:text-[#0D47A1] transition-colors">
            {track.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <Calendar className="w-4 h-4" />
            {format(new Date(track.created_at), 'MMM d, yyyy')}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
              •••
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={onEdit}>
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onAnalytics}>
              <BarChart2 className="w-4 h-4 mr-2" />
              Analytics
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-4 text-gray-600">
          <div>{track.playCount?.toLocaleString() || 0} plays</div>
          <div>{track.downloads?.toLocaleString() || 0} downloads</div>
        </div>
        <button
          onClick={onPlay}
          className="p-2 rounded-full hover:bg-[#EBFF00]/20 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <PlayCircle className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  )
}