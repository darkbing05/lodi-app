'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/lib/store'

export default function TrackUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [uploading, setUploading] = useState(false)
  const { profile } = useAuthStore()

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !title || !profile) return

    setUploading(true)
    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${profile.id}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('tracks')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('tracks')
        .getPublicUrl(filePath)

      // Create track record
      const { error: dbError } = await supabase
        .from('tracks')
        .insert({
          title,
          category,
          file_url: publicUrl,
        })

      if (dbError) throw dbError

      // Reset form
      setFile(null)
      setTitle('')
      setCategory('')
    } catch (error) {
      console.error('Error uploading track:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleUpload} className="max-w-md mx-auto p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Audio File</label>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full"
          required
        />
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload Track'}
      </button>
    </form>
  )
}