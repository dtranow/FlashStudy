import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoutes from './routes/routes'
import deckRoutes from './routes/deckRoutes'
import cardRoutes from './routes/flashCardRoutes'
import uploadRoutes from './routes/uploadRoutes'
import rateLimit from 'express-rate-limit'
import { S3Client } from '@aws-sdk/client-s3'

const authLimit = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    message: "Too many login attempts try again later"
})

const generalLimit = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 500,
    message: "Too many requests try again later"
})

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    allowedHeaders: "Authorization, Content-Type"
}))
app.use('/api/auth', authLimit, authRoutes)
app.use('/api/decks', generalLimit, deckRoutes)
app.use('/api/flashCards', generalLimit, cardRoutes)
app.use('/api/upload', uploadRoutes)

dotenv.config()

mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log("MongoDB has been connected"))
    .catch((err) => console.error(err, + " MongoDB failed to connect"))


export const s3 = new S3Client({
    region: 'us-east-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`connected on port ${PORT}`))

