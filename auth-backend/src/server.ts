import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoutes from './routes'

const app = express();
app.use(express.json());
app.use(cors())
app.use('/api/auth', authRoutes)
dotenv.config()

mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log("MongoDB has been connected"))
    .catch((err) => console.error(err, + " MongoDB failed to connect"))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`connected on port ${PORT}`))





