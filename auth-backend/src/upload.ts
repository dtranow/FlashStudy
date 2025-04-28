import multer from 'multer'
import { Request } from 'express'

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (
        req: Request,
        file: Express.Multer.File,
        cb: multer.FileFilterCallback
    ) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp') {
            cb(null, true)
        }
        else {
            cb(new Error('only jpq, png or webp files allowed'))
        }
    }
})

export default upload;