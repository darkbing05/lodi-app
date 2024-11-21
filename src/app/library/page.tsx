'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/sidebar'
import { useRouter } from 'next/navigation'
import AnalyticsDialog from './components/AnalyticsDialog'
import EditDialog from './components/EditDialog'
import UploadButton from './components/UploadButton'
import TrackCard from './components/TrackCard'
import { Home, Music, Settings, User } from 'lucide-react'
import { Progress } from '@radix-ui/react-progress'
import { Profile, Track } from 'types/index'
import { uploadToS3 } from 'lib/s3'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Library', href: '/library', icon: Music },
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Settings', href: '/settings', icon: Settings }
]

export default function Library() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const router = useRouter()
  const [tracks, setTracks] = useState<Track[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const [editTrack, setEditTrack] = useState<Track | null>(null)
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)

  useEffect(() => {
    fetchTracks()
  }, [])

  const handleEdit = async (track: Track) => {
    try {
      const { error } = await supabase
        .from('tracks')
        .update({
          title: track.title,
          description: track.description,
          category: track.category
        })
        .eq('id', track.id)
  
      if (error) throw error
      
      fetchTracks()
      setEditTrack(null)
    } catch (error) {
      console.error('Edit error:', error)
      alert('Failed to update track')
    }
  }

  const fetchTracks = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return router.push('/login')

    const { data } = await supabase
      .from('tracks')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
    
    if (data) setTracks(data)

    // Map the User object to the Profile type
    const userProfile: Profile = {
      id: session.user.id,
      username: session.user.email || '',
      name: session.user.name || '', // Added null check
      email: session.user.email || '',
      avatar_url: session.user.avatar_url || '', // Added null check
      updated_at: session.user.updated_at || '',
      role: 'user' // Default role, adjust as necessary
    }
    setProfile(userProfile)
  }

  const handleDelete = async (trackId: string) => {
    if (!confirm('Are you sure you want to delete this track?')) return

    const { error } = await supabase.from('tracks').delete().eq('id', trackId)
    if (error) {
      console.error('Delete error:', error)
      alert('Failed to delete track')
    } else {
      fetchTracks()
    }
  }

  const openFilePicker = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*';
    input.onchange = handleFileChange;
    input.click();
  };
  
  const handleFileChange = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && profile) await uploadFile(file);
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
  };
  
  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file && profile) await uploadFile(file);
  };
  
  const uploadFile = async (file: File) => {
    setIsUploading(true);
    try {
      const fileUrl = await uploadToS3(file, profile?.id, setUploadProgress); // Added null check
      await supabase.from('tracks').insert({
        title: file.name.split('.')[0],
        url: fileUrl, // Corrected column name from 'file_url' to 'url'
        user_id: profile?.id, // Added null check
        downloads: 0,
        playCount: 0,
        artist: profile?.username // Added null check
      });
      await fetchTracks();
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar 
        navItems={navItems}
        logo="LODI"
        logoutAction={() => supabase.auth.signOut()}
      />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Music</h1>
            {profile && (
              <UploadButton 
                isUploading={isUploading} 
                setIsUploading={setIsUploading} 
                setUploadProgress={setUploadProgress} 
                fetchTracks={fetchTracks}
                profile={profile}
              />
            )}
          </div>

          <div 
            className="border-2 border-dashed border-gray-300 p-4 rounded-md text-center mb-8"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <p className="text-gray-500">Drag and drop your tracks here or click the button above</p>
          </div>

          {isUploading && (
            <div className="mb-6">
              <Progress value={uploadProgress} className="mb-2" />
              <p className="text-sm text-gray-600">
                Uploading... {uploadProgress.toFixed(0)}%
              </p>
            </div>
          )}

          {tracks.length === 0 ? (
            <div className="text-center text-gray-500">
              <p className="text-xl">No tracks uploaded yet.</p>
              <p className="mt-2">Upload your first track to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tracks.map((track) => (
                <TrackCard 
                  key={track.id} 
                  track={track} 
                  isPlaying={currentlyPlaying === track.id}
                  onPlay={() => setCurrentlyPlaying(currentlyPlaying === track.id ? null : track.id)}
                  onEdit={() => setEditTrack(track)}
                  onAnalytics={() => setSelectedTrack(track)}
                  onDelete={() => handleDelete(track.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Edit Dialog */}
      <EditDialog
        open={!!editTrack}
        onClose={() => setEditTrack(null)}
        track={editTrack}
        onSave={handleEdit}
      />

      {/* Analytics Dialog */}
      <AnalyticsDialog 
        open={!!selectedTrack}
        onClose={() => setSelectedTrack(null)}
        track={selectedTrack}
      />
    </div>
  )
}
