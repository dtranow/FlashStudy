import mongoose from "mongoose";

const deckSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, default: ""},
    completeCount: { type: Number, default: 0},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    flashcards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard'}] 
},{ timestamps: true })

const Deck = mongoose.model('Deck', deckSchema)

export default Deck;