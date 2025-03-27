import express, { Response } from "express";
import authMiddleWare, { AuthRequest } from "../middleware";
import Flashcard from "../models/flashcardModel";
import Deck from "../models/deckModel";

const router = express.Router()

router.post('/:deckId', authMiddleWare, async (req: AuthRequest, res: Response) => {
    try {
        const { question, answer } = req.body
        const { deckId } = req.params
        const userId = req.user.userID; 

        const deck = await Deck.findById(deckId)
        if(!deck){
            res.status(404).json({ message: "deck does not exist" })
            return
        }
        const flashcard = new Flashcard({
            question,
            answer,
            deck: deckId,
            user: userId
        })
        await flashcard.save()
        deck.flashcards.push(flashcard._id)
        await deck.save()
        res.status(201).json(flashcard)
    }
    catch(error){
        res.status(500).json({ message: "Failed to create flashcard", error})
    }
})

router.get('/:deckId', authMiddleWare, async (req: AuthRequest, res: Response) => {
    try{
        const deckId = req.params
        const flashcards = await Flashcard.find({ deck: deckId })
        res.json(flashcards)
    }
    catch(error) {
        res.status(500).json({ message: "Failed to fetch flashcards", error})
    }
})

router.put('/:deckId/:flashcardId', authMiddleWare, async (req: AuthRequest, res: Response) => {
    try{
        const { flashcardId } = req.params
        const {question, answer} = req.body
        const updatedflashcard = await Flashcard.findByIdAndUpdate(flashcardId, 
            { question, answer},
            { new: true})
        res.status(200).json(updatedflashcard)
    }
    catch(error){
        res.status(500).json({ message: "Failed to update flashcard"})
    }
})

router.delete('/:deckId/:flashcardId', authMiddleWare, async (req: AuthRequest, res: Response) => {
    try{
        const { deckId, flashcardId } = req.params
        await Flashcard.findByIdAndDelete(flashcardId)

        await Deck.findByIdAndUpdate(deckId, {
            $pull: {flashcards: flashcardId}
        })
        res.status(200).json({ message: "Flashcard deleted"})
    }
    catch(error){
        res.status(500).json({ message: "Failed to delete flashcard"})
    }
}) 

export default router