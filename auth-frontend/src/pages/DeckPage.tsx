import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import FeatureCards from '../components/FeatureCards';
import '../DeckPage.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import DeleteIcon from '@mui/icons-material/Delete';
import Flashcard from '../components/Flashcard';

interface Deck {
  _id: string;
  name: string;
}

interface Flashcard {
  question: string;
  answer: string;
  _id: string;
}

interface props {
  isOpen: boolean;
  toggleSidebar: () => void;
  handleLogout: () => void;
}

const DeckPage: React.FC<props> = ({ isOpen, toggleSidebar, handleLogout }) => {
  const [deck, setDeck] = useState<Deck>({ _id: "", name: "" })
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [mode, setMode] = useState<'default' | 'add' | 'study'>('default')
  const [cardName, setCardName] = useState<string>('')
  const [flashcardDescription, setFlashcardDescription] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [flipped, setFlipped] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const nav = useNavigate()
  const { deckId } = useParams<{ deckId: string }>()

  const fetchDeck = async () => {
    try {
      const jwt = localStorage.getItem('token')
      const res = await axios.get(`http://localhost:5000/api/decks/${deckId}`, {
        headers: { Authorization: `Bearer ${jwt}` }
      })
      setDeck(res.data)
    }
    catch (error) {
      console.error("Failed to fetch deck", error)
    }
  }

  const fetchFlashcards = async () => {
    try {
      setLoading(true)
      const jwt = localStorage.getItem('token')
      const res = await axios.get(`http://localhost:5000/api/decks/${deckId}`, {
        headers: { Authorization: `Bearer ${jwt}` }
      })
      setFlashcards(res.data.flashcards)
    }
    catch (error) {
      console.error("Failed to fetch flashcards", error)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setMode('default')
    fetchDeck()
  }, [deckId])

  useEffect(() => {
    if (mode === 'study') {
      fetchFlashcards()
      setCurrentIndex(0)
    }
  }, [mode, deckId])

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cardName) return
    if (!flashcardDescription) return

    const jwt = localStorage.getItem('token')
    const res = await fetch(`http://localhost:5000/api/flashcards/${deckId}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: cardName, answer: flashcardDescription })
    })
    if (res.ok) {
      setCardName('')
      setFlashcardDescription('')
    }
    else {
      console.error("Failed to create flashcard")
    }
  }

  const handleSidebarClick = () => {
    setMode('default')
    nav(`/deckpage/${deckId}`)
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setFlipped(false)
    }
  }

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setFlipped(false)
    }
  }

  const handleDeleteFlashcard = async () => {
    try {
      const jwt = localStorage.getItem('token')
      const flashcardId = flashcards[currentIndex]._id
      await axios.delete(`http://localhost:5000/api/flashcards/${deckId}/${flashcardId}`, {
        headers: { Authorization: `Bearer ${jwt}` }
      })
      setFlashcards(prev => prev.filter((_, index) => index !== currentIndex))
      setCurrentIndex(prev => (prev > 0 ? prev - 1 : 0))
    }
    catch (error) {
      console.error("Failed to delete flashcard", error)
    }
  }

  const handleDeleteDeck = async () => {
    try {
      const jwt = localStorage.getItem('token')
      await axios.delete(`http://localhost:5000/api/decks/${deckId}`, {
        headers: { "Authorization": `Bearer ${jwt}` }
      })
      nav('/dashboard')
    }
    catch (error) {
      console.error("Failed to delete deck", error)
    }
  }

  const updateFlashcard = async (flashcardId: string, updatedQuestion: string, updatedAnswer: string) => {
    try {
      const jwt = localStorage.getItem('token')
      await axios.put(`http://localhost:5000/api/flashcards/${deckId}/${flashcardId}`,
        { question: updatedQuestion, answer: updatedAnswer },
        { headers: { Authorization: `Bearer ${jwt}` } }
      )
        setFlashcards(prev => prev.map(flashcard => flashcard._id === flashcardId ?
          { ...flashcard, question: updatedQuestion, answer: updatedAnswer } : flashcard
        ))
        fetchFlashcards()

    }
    catch (error) {
      console.error("error updating flashcard", error)
    }
  }

  const handleDelete = async (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    if (mode === 'study' && flashcards.length > 0) {
      handleDeleteFlashcard()
    }
    else {
      handleDeleteDeck()
    }
  }

  const handleBack = async () => {
    if (mode === 'default') {
      nav('/dashboard')
    }
    else {
      setMode('default')
    }
  }

  return (
    <div className='dashboard-container'>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout} onDeckClick={handleSidebarClick} />
      <div className='main-content'>
        {mode === 'default' && (
          <>
            <h2>Add cards to {deck.name} or start studying!</h2>
            <div className='deck-options'>
              <FeatureCards title="Add Flashcards" className='deckpage-cards' onClick={() => setMode('add')} />
              <FeatureCards title="Study Flashcards" className='deckpage-cards' onClick={() => setMode('study')} />
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
            <div className='flashcard-container'>
              {loading ? (
                <p>Loading flashcards...</p>
              ) : flashcards.length > 0 ? (
                <Flashcard 
                  question={flashcards[currentIndex].question} 
                  answer={flashcards[currentIndex].answer} 
                  ID={flashcards[currentIndex]._id}
                  flipped={flipped} setFlipped={setFlipped} 
                  onSave={(updatedQuestion, updatedAnswer) => 
                    updateFlashcard(flashcards[currentIndex]._id, updatedQuestion, updatedAnswer)}/>
              ) : (
                <p>no flashcards available</p>
              )}
            </div>
            <div className='flashcard-nav'>
              <button onClick={handlePrev} disabled={currentIndex === 0}>
                <ArrowBackIcon />
              </button>
              <button onClick={handleNext} disabled={currentIndex === flashcards.length - 1 || flashcards.length === 0}>
                <ArrowForwardIcon />
              </button>
            </div>
            <div>{flashcards.length > 0 ? currentIndex + 1 : 0} / {flashcards.length}</div>
          </>
        )}
        <div className='btn-container'>
          <button className='back-btn' onClick={handleBack}>
            <ArrowBackIcon />
          </button>
          <button className='del-btn'>
            <DeleteIcon onClick={handleDelete} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeckPage