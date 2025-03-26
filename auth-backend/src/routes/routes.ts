import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"
import authMiddleWare, { AuthRequest } from '../middleware'
import User from '../models/userModel'

const router = express.Router()

router.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, password, email, name } = req.body;
        if (!username || !password || !email || !name) {
          res.status(400).json({ message: "All fields are required" });
          return;
        }
        const users = await User.findOne({ username });
        if (users) {
          res.status(400).json({ message: "Username is already taken" });
          return;
        }
        const emails = await User.findOne({ email });
        if (emails) {
          res.status(400).json({ message: "Email is already in use" });
          return;
        }
        const hashedpw = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedpw, name });
        await newUser.save();
        res.status(201).json({ message: "User successfully registered" });
      } catch (error) {
        res.status(400).json({ message: error });
      }
    }
)

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ message: "Username does not exist" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Password is incorrect" });
      return;
    }
    const token = jwt.sign(
      { userID: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
})

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