import express from 'express'
import cors from 'cors'
import authRoutes from './routes/routes'
import deckRoutes from './routes/deckRoutes'
import cardRoutes from './routes/flashCardRoutes'
import uploadRoutes from './routes/uploadRoutes'
import rateLimit from 'express-rate-limit'
import { connectDB } from './connections'

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

connectDB().then(() =>{
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
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`connected on port ${PORT}`))
})
.catch(error => {
    console.error('DB connection failed:', error)
    process.exit(1)
})