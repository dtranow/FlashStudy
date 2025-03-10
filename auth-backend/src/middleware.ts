import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request {
    user?: any;
}

const authMiddleWare = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization")

    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.status(400).json({ message: "Json web token is not provided" })
        return
    }

    const token = authHeader.split(" ")[1]
    try{
        const check = jwt.verify(token, process.env.JWT_SECRET as string)
        req.user = check
        next()
    }
    catch(error) {
        res.status(401).json({ message: "invalid token" })
    }
}

export default authMiddleWare;