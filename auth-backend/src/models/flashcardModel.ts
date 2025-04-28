import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
    question: { type: String, maxLength: 75 ,required: true},
    answer: { type: String, maxLength: 300, required: true},
    deck: { type: mongoose.Schema.Types.ObjectId, ref: "Deck", required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    complete: { type: Boolean, default: false},
    image: { type: String }
}, {timestamps: true})

const Flashcard = mongoose.model('Flashcard', flashcardSchema)

export default Flashcard;
