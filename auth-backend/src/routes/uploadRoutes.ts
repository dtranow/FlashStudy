import express, { Request, Response } from 'express'
import upload from '../upload'
import { s3 } from '../connections'
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'

const router = express.Router()

router.post('/', upload.single('image'), async (req: Request, res: Response) => {
    try{
        const file = req.file
        if(!file){
            res.status(400).json({ error: 'no file uploaded'})
            return
        }
        const time = Date.now()
        const fileName = `flashcard/${time}-${file.originalname}`
        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        })
        await s3.send(command)
        const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
        res.json({ imageUrl, Key: fileName })
    }
    catch(error){
        console.error('s3 upload error??', error)
        res.status(500).json({ error: error})
    }
})

router.delete('/deleteImage', async (req: Request, res: Response) => {
    const { key } = req.body
    try{
        const command = new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key
        })
        await s3.send(command)
        res.status(200).json({message: 'Deleted image'})
    }
    catch(error){
        res.status(500).json({ error: 'failed to delete image'})
    }
})

export default router;