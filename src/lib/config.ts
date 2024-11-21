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