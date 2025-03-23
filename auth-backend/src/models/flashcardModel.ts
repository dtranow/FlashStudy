import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
    question: { type: String, maxLength: 160 ,required: true},
    answer: { type: String, maxLength: 250, required: true},
    deck: { type: mongoose.Schema.Types.ObjectId, ref: "Deck", required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
}, {timestamps: true})

const Flashcard = mongoose.model('Flashcard', flashcardSchema)

export default Flashcard;