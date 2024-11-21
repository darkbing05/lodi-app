import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { uploadToS3 } from '@/lib/s3'
import type { Profile } from '@/types'

export function useUpload(profile: Profile | null, onSuccess: () => void) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleUpload = async (file: File) => {
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
      onSuccess()
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  return {
    isUploading,
    uploadProgress,
    handleUpload
  }
}