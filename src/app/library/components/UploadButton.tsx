// UploadButton.tsx
import { Upload } from 'lucide-react'
import { uploadToS3 } from 'lib/s3'
import { supabase } from '@/lib/supabase'
import { Profile } from 'types/index'

interface UploadButtonProps {
  isUploading: boolean
  setIsUploading: (isUploading: boolean) => void 
  setUploadProgress: (progress: number) => void
  fetchTracks: () => Promise<void>
  profile: Profile | null
}

export default function UploadButton({ 
  isUploading, 
  setIsUploading, 
  setUploadProgress, 
  fetchTracks,
  profile
}: UploadButtonProps) {
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !profile) return
  
    setIsUploading(true)
    try {
      const fileUrl = await uploadToS3(file, profile.id, setUploadProgress)
      
      const { error } = await supabase.from('tracks').insert({
        title: file.name.split('.')[0],
        file_url: fileUrl,
        user_id: profile.id,
        downloads: 0,
        playCount: 0,
        artist: profile.username
      })
      
      if (error) throw error
      await fetchTracks()
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="relative">
      <input
        type="file"
        accept="audio/*"
        onChange={handleUpload}
        className="hidden"
        id="track-upload"
        disabled={isUploading}
      />
      <label
        htmlFor="track-upload"
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#EBFF00] hover:bg-[#EBFF00]/90 cursor-pointer"
      >
        <Upload className="w-5 h-5" />
        Upload Track
      </label>
    </div>
  )
}
