import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import FeatureCards from '../components/FeatureCards';
import '../DeckPage.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

interface Deck {
  _id: string;
  name: string;
}

interface Flashcard {
  question: string;
  answer: string;
}

interface props {
  isOpen: boolean;
  toggleSidebar: () => void;
  handleLogout: () => void;
}

const DeckPage: React.FC<props> = ({ isOpen, toggleSidebar, handleLogout }) => {
  const [deck, setDeck] = useState<Deck>({_id: "", name: ""})
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [mode, setMode] = useState<'default' | 'add' | 'study'>('default')
  const [cardName, setCardName] = useState<string>('')
  const [flashcardDescription, setFlashcardDescription] = useState<string>('')

  const nav = useNavigate()
  const { deckId } = useParams<{ deckId: string}>()

  const fetchDeck = async () => {
    try {
      const jwt = localStorage.getItem('token')
      const res = await axios.get(`http://localhost:5000/api/decks/${deckId}`, {
        headers: { Authorization: `Bearer ${jwt}`}
      })
      setDeck(res.data)
    }
    catch(error) {
      console.error("Failed to fetch deck", error)
    }
  }

  const fetchFlashcards = async () => {
    try{
      const jwt = localStorage.getItem('token')
      const res = await axios.get(`http://localhost:5000/api/decks/${deckId}`, {
        headers: { Authorization: `Bearer ${jwt}`}
      })
      setFlashcards(res.data.flashcards)
    }
    catch(error) {
      console.error("Failed to fetch flashcards", error)
    }
  }

  useEffect(() => {
    setMode('default')
    fetchDeck()
  }, [deckId])

  useEffect(() => {
    if(mode === 'study'){
      fetchFlashcards()
    }
  }, [mode, deckId])

  const handleHome = () => {
    nav('/dashboard')
  }

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!cardName) return
    if(!flashcardDescription) return

    const jwt = localStorage.getItem('token')
    const res = await fetch(`http://localhost:5000/api/flashcards/${deckId}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({question: cardName, answer: flashcardDescription})
    })
    if(res.ok){
      setCardName('')
      setFlashcardDescription('')
    }
    else{
      console.error("Failed to create flashcard")
    }
  }

  const handleSidebarClick = () => {
    setMode('default')
    nav(`/deckpage/${deckId}`)
  }


  return (
    <div className='dashboard-container'>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout} onDeckClick={handleSidebarClick}/>
      <div className='main-content'>
        <button onClick={handleHome}>Home</button>
        {mode === 'default' && (
          <>
            <h2>Add cards to {deck.name} or start studying!</h2>
            <div className='deck-options'>
              <FeatureCards title="Add Flashcards" className='deckpage-cards' onClick={() => setMode('add')}/>
              <FeatureCards title="Study Flashcards" className='deckpage-cards' onClick={() => setMode('study')}/>
            </div>
          </>
        )}
        {mode === 'add' && (
          <>
            <div>
              <form className='flashcard-form' onSubmit={handleCardSubmit}>
              <p>{deck.name}</p>
                <input className="deck-input" type="text" placeholder='Enter Card Title' maxLength={50} value={cardName} onChange={(e) => setCardName(e.target.value)} />
                <p>Description</p>
                <div className='input-wrapper'>
                  <textarea className='deck-description' value={flashcardDescription} maxLength={200} onChange={(e) => setFlashcardDescription(e.target.value)} />
                  <span className='char-count'>{flashcardDescription.length}/200</span>
                </div>
                <button>Create Flashcard</button>
              </form>
            </div>
          </>
        )}
        {mode === 'study' && (
          <>
            <div>
              {flashcards.map((flashcard, index) => (
                <div key={index}>{flashcard.question} {flashcard.answer} {index}</div>
              ))}
            </div>
          </>
        )}
        <div className='btn-container'>
          <button className='back-btn' onClick={() => setMode('default')}>
            <ArrowBackIcon />
          </button>
          <button className='del-btn'>
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>  
    )
}

export default DeckPage