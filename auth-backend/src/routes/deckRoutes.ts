import express, { Response } from "express"
import authMiddleware, { AuthRequest } from '../middleware'
import Deck from "../models/deckModel"

const router = express.Router()

router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
    const { name } = req.body

    if(!req.user){
        res.status(401).json({ message: "unauthorized user" })
    }
    try {
        const newDeck = new Deck({ name, user: req.user})
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
    }

    try {
        const decks = await Deck.find({ user: req.user })
        res.json(decks)
    }
    catch(error){
        res.status(500).json({ message: "Failed to fetch decks" })
    }
})

router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
    const { id } = req.params
    try {
        const deck = await Deck.findOne({ _id: id, user: req.user._id })
        if(!deck){
            res.status(404).json({ message: "Deck not found" })
        }
        res.json(deck)
    }
    catch(error) {
        res.status(500).json({ message: "Failed to fetch deck" })
    }
})

router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
    const { id } = req.params
    const { name } = req.body
    
    try{
        const updatedDeck = await Deck.findOneAndUpdate(
            { _id: id, user: req.body._id },
            { name },
            { new: true }
        )
        if(!updatedDeck){
            res.status(404).json({ message: "Deck not found"})
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
        const deck = await Deck.findOneAndDelete({ _id: id, user: req.user._id })
        if(!deck){
            res.status(404).json({ message: "Deck not found" })
        }
        res.json({ message: "Successfully deleted deck", deck })
    }
    catch(error){
        res.status(500).json({ message: "Failed to delete deck" })
    }
})


export default router