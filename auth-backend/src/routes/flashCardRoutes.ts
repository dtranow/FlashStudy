import express, { Response } from "express";
import authMiddleWare, { AuthRequest } from "../middleware";
import Flashcard from "../models/flashcardModel";
import { useParams } from "react-router-dom";
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

export default router