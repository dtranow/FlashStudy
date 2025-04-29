import { connectDB, s3 } from '../connections'
import { ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3'
import Flashcard from '../models/flashcardModel'

async function cleanupOrphans() {
    await connectDB()
    const list = await s3.send(new ListObjectsV2Command({Bucket: process.env.S3_BUCKET_NAME}))
    const keys = (list.Contents || []).map(obj => obj.Key!).filter(Boolean)

    const cards = await Flashcard.find({ image: {$exists: true}}).lean()
    const used = new Set(cards.map(c => c.image))

    const orphanKeys = keys.filter(k => !used.has(k))
    if(orphanKeys.length === 0){
        console.log('no keys to delete')
        return
    }

    let totalDeleted = 0

    for(let i = 0; i < orphanKeys.length; i += 1000){
        let orphan = orphanKeys.slice(i,i+1000).map(Key => ({ Key }))
        await s3.send(new DeleteObjectsCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Delete: {Objects: orphan}
        }))
        totalDeleted += orphan.length
    }
    console.log(`Cleanup complete total deleted: ${totalDeleted} image(s).`)
}

cleanupOrphans()
    .then(() => process.exit(0))
    .catch(error => {
        console.log(error)
        process.exit(1)
    })