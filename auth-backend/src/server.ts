import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoutes from './routes/routes'
import deckRoutes from './routes/deckRoutes'
import cardRoutes from './routes/flashCardRoutes'
import rateLimit from 'express-rate-limit'

const authLimit = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 6,
    message: "Too many login attempts try again later"
})

const generalLimit = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
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

dotenv.config()

mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log("MongoDB has been connected"))
    .catch((err) => console.error(err, + " MongoDB failed to connect"))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`connected on port ${PORT}`))


