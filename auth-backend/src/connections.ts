import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { S3Client } from '@aws-sdk/client-s3'

dotenv.config()

export async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("MongoDB has been connected")
    } catch(err){
        console.error(err, + " MongoDB failed to connect")
    }
}

export const s3 = new S3Client({
    region: 'us-east-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
})