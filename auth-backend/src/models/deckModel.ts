import mongoose from "mongoose";

const deckSchema = new mongoose.Schema({
    name: { type: String, require},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require},
    flashcards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard'}] 
},{ timestamps: true })

const Deck = mongoose.model('Deck', deckSchema)

export default Deck;