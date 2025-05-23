import React, { useState, useEffect } from 'react'
import '../DeckPage.css'

interface props {
  ID: string;
  question: string;
  answer: string;
  flipped: boolean;
  setFlipped: (flipped: boolean) => void
  onSave: (updatedQuestion: string, updatedAnswer: string) => void
  hideAnswer: boolean;
  isComplete: boolean;
  imageUrl?: string;
}

const Flashcard: React.FC<props> = ({ID, question, answer, flipped, setFlipped, onSave, hideAnswer, isComplete, imageUrl}) => {
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


  useEffect(() => {
    setNewQuestion(question);
    setNewAnswer(answer);
  }, [ID]);

  return (
    <div className='flashcard-container'>
      <button className="edit-btn" onClick={handleSave}>{edit ? "Save" : "Edit"}</button>
      <div className={`flashcard ${flipped? 'flipped' : ''}`} onClick={handleFlip}>
        <div className='flashcard-inner'>
          {edit ? (
            <>
              <div className='flashcard-front'>
                <input className='edit-input' value={newQuestion} maxLength={75} onChange={(e) => setNewQuestion(e.target.value)}/>
                {isComplete && <span className='checkmark'>✔️</span>}
              </div>
              <div className='flashcard-back'>
                <input className='edit-input' value={newAnswer} maxLength={300} onChange={(e) => setNewAnswer(e.target.value)}/>
                {isComplete && <span className='checkmark'>✔️</span>}
              </div>
            </>
          ): (
            <>
              <div className='flashcard-front'>
                <p>{question}</p>
                {isComplete && <span className='checkmark'>✔️</span>}
              </div>
              <div className='flashcard-back'>
                <p style={{ visibility: hideAnswer ? 'hidden' : 'visible'}}>{answer}</p>
                <img src={imageUrl} alt={'flashcard-image'} style={{ visibility: hideAnswer ? 'hidden' : 'visible', maxWidth: '80%', maxHeight: '80%', objectFit: 'cover'}}/>
                {isComplete && <span className='checkmark'>✔️</span>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Flashcard