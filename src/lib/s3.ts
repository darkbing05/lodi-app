// lib/s3.ts
import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { config } from './config'

export const s3Client = new S3Client({
  endpoint: config.s3.endpoint,
  region: config.s3.region,
  credentials: {
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretKey // Corrected property name
  },
  forcePathStyle: true
})

export const uploadToS3 = async (
  file: File,
  userId: string,
  onProgress?: (progress: number) => void
) => {
  const key = `${userId}/${Date.now()}-${file.name}`
  console.log(`Uploading file with key: ${key}`) // Debug log for file key

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: config.s3.bucketName,
      Key: key,
      Body: file,
      ContentType: file.type
    }
  })

  upload.on('httpUploadProgress', (progress) => {
    const percentage = (progress.loaded || 0) / (progress.total || 1) * 100
    if (onProgress) {
      onProgress(percentage)
    }
    console.log(`Upload progress: ${percentage.toFixed(2)}%`) // Debug log for upload progress
  })

  await upload.done()
  const fileUrl = `${config.s3.endpoint}/${config.s3.bucketName}/${key}`
  console.log(`File uploaded successfully. URL: ${fileUrl}`) // Debug log for final URL
  return fileUrl
}
