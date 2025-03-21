import mongoose from "mongoose";

const deckSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, default: ""},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    flashcards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard'}] 
},{ timestamps: true })

const Deck = mongoose.model('Deck', deckSchema)

export default Deck;