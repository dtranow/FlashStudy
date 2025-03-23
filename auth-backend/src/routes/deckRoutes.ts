import express, { Response } from "express"
import authMiddleware, { AuthRequest } from '../middleware'
import Deck from "../models/deckModel"

const router = express.Router()

router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
    const { name, description } = req.body

    if(!req.user){
        res.status(401).json({ message: "unauthorized user" })
        return
    }
    try {
        const count = await Deck.countDocuments({ user: req.user.userID })
        if(count >= 10){
            res.status(400).json({ message: "You have reached the limit of 10 decks"})
            return
        }

        const newDeck = new Deck({ name, description, user: req.user.userID})
        console.log("req.user", req.user)
        await newDeck.save()
        res.status(201).json(newDeck)
    }
    catch(error) {
        res.status(500).json({ message: "Failed to create deck" })
    }
})

router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
    if(!req.user){
        res.status(401).json({ message: "unauthorized user" })
        return
    }

    try {
        const decks = await Deck.find({ user: req.user.userID })
        res.json(decks)
    }
    catch(error){
        res.status(500).json({ message: "Failed to fetch decks" })
    }
})

router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
    const { id } = req.params
    try {
        const deck = await Deck.findOne({ _id: id, user: req.user.userID }).populate('flashcards')
        if(!deck){
            res.status(404).json({ message: "Deck not found" })
            return
        }
        if(deck?.user?.toString() !== req.user.userID){
            res.status(403).json({ message: "Unauthorized access to this deck"})
            return
        }
        res.json(deck)
    }
    catch(error) {
        res.status(500).json({ message: "Failed to fetch deck" })
    }
})

router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
    const { id } = req.params
    const { name, description } = req.body
    
    try{
        const updatedDeck = await Deck.findOneAndUpdate(
            { _id: id, user: req.user.userID },
            { name, description },
            { new: true }
        )
        if(!updatedDeck){
            res.status(404).json({ message: "Deck not found"})
            return
        }
        res.json(updatedDeck)
    }
    catch(error) {
        res.status(500).json({ message: "Failed to update the deck's name" })
    }
})

router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
    const { id } = req.params
    try {
        const deck = await Deck.findOneAndDelete({ _id: id, user: req.user.userID })
        if(!deck){
            res.status(404).json({ message: "Deck not found" })
            return
        }
        res.json({ message: "Successfully deleted deck", deck })
    }
    catch(error){
        res.status(500).json({ message: "Failed to delete deck" })
    }
})


export default router