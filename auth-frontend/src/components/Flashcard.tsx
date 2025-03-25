import React, { useState } from 'react'
import '../DeckPage.css'

interface props {
  question: string;
  answer: string;
  flipped: boolean;
  setFlipped: (flipped: boolean) => void
}

const Flashcard: React.FC<props> = ({ question, answer, flipped, setFlipped}) => {

  const handleFlip = () => {
    setFlipped(!flipped)
  }  

  return (
    <div className={`flashcard ${flipped? 'flipped' : ''}`} onClick={handleFlip}>
      <div className='flashcard-inner'>
        <div className='flashcard-front'>
          <p>{question}</p>
        </div>
        <div className='flashcard-back'>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default Flashcard