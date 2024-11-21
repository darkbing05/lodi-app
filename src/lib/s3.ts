// lib/config.ts
export const config = {
    s3: {
      endpoint: process.env.NEXT_PUBLIC_S3_ENDPOINT || 'http://192.168.20.249:9000',
      region: process.env.NEXT_PUBLIC_S3_REGION || 'us-east-1',
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY || 'minioadmin',
      secretKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY || 'minioadmin',
      bucketName: process.env.NEXT_PUBLIC_S3_BUCKET || 'tracks'
    }
  }
  
  // lib/s3.ts
  import { S3Client } from '@aws-sdk/client-s3'
  import { Upload } from '@aws-sdk/lib-storage'
  import { config } from './config'
  
  export const s3Client = new S3Client({
    endpoint: config.s3.endpoint,
    region: config.s3.region,
    credentials: {
      accessKeyId: config.s3.accessKeyId,
      secretKey: config.s3.secretKey
    },
    forcePathStyle: true
  })
  
  export const uploadToS3 = async (
    file: File,
    userId: string,
    onProgress?: (progress: number) => void
  ) => {
    const key = `${userId}/${Date.now()}-${file.name}`
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
      if (onProgress) {
        const percentage = (progress.loaded || 0) / (progress.total || 1) * 100
        onProgress(percentage)
      }
    })
  
    await upload.done()
    return `${config.s3.endpoint}/${config.s3.bucketName}/${key}`
  }