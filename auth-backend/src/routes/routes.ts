import express, { Response } from 'express'
import { register, login } from '../authController'
import authMiddleWare, { AuthRequest } from '../middleware'
import User from '../models/userModel'

const router = express.Router()
router.post('/register', register)
router.post('/login', login)

router.get('/profile', authMiddleWare, async (req: AuthRequest, res: Response) => {
    try{
        const user = await User.findById(req.user.userID).select('name')
        if(!user){
            res.status(400).json({ message: "User's name is not found"})
            return
        }
        res.json({ message: "Authorization accessed", user})
    }
    catch(error){
        res.json(500).json({ message: "failed to fetch name:", error})
    }
})

export default router;