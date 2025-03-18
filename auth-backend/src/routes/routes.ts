import express, { Response } from 'express'
import { register, login } from '../authController'
import authMiddleWare, { AuthRequest } from '../middleware'

const router = express.Router()
router.post('/register', register)
router.post('/login', login)

router.get('/profile', authMiddleWare, (req: AuthRequest, res: Response) => {
    res.json({ message: "Authorization accessed", user: req.user })
})

export default router;