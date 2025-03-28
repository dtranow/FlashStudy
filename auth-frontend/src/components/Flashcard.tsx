import React, { useState, useEffect } from 'react'
import '../DeckPage.css'

interface props {
  ID: string;
  question: string;
  answer: string;
  flipped: boolean;
  setFlipped: (flipped: boolean) => void
  onSave: (updatedQuestion: string, updatedAnswer: string) => void
}

const Flashcard: React.FC<props> = ({ID, question, answer, flipped, setFlipped, onSave}) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [newQuestion ,setNewQuestion] = useState<string>(question)
  const [newAnswer, setNewAnswer] = useState<string>(answer)

  const handleFlip = () => {
    if(!edit){
      setFlipped(!flipped)
    }
  } 

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if(edit){
      onSave(newQuestion, newAnswer)
    }
    setEdit(!edit)
  }

  const handleTransitionEnd = () => {
    if(!edit){
      setNewQuestion(question)
      setNewAnswer(answer)
    }
  }

  useEffect(() => {
    setNewQuestion(question);
    setNewAnswer(answer);
  }, [ID]);

  return (
    <div className='flashcard-container'>
      <button className="edit-btn" onClick={handleSave}>{edit ? "Save" : "Edit"}</button>
      <div className={`flashcard ${flipped? 'flipped' : ''}`} onClick={handleFlip} onTransitionEnd={handleTransitionEnd}>
        <div className='flashcard-inner'>
          {edit ? (
            <>
              <div className='flashcard-front'>
                <input value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)}/>
              </div>
              <div className='flashcard-back'>
                <input value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)}/>
              </div>
            </>
          ): (
            <>
              <div className='flashcard-front'>
                <p>{question}</p>
              </div>
              <div className='flashcard-back' onTimeUpdate={() => {300}}>
                <p>{answer}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Flashcard