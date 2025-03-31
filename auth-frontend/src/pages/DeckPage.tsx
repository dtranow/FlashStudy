import React, { useState, useEffect, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import FeatureCards from '../components/FeatureCards';
import '../DeckPage.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import DeleteIcon from '@mui/icons-material/Delete';
import Flashcard from '../components/Flashcard';
import { Switch, FormControlLabel } from '@mui/material'

interface Deck {
  _id: string;
  name: string;
}

interface Flashcard {
  question: string;
  answer: string;
  _id: string;
  complete: boolean;
}

interface props {
  isOpen: boolean;
  toggleSidebar: () => void;
  handleLogout: () => void;
}

const DeckPage: React.FC<props> = ({ isOpen, toggleSidebar, handleLogout }) => {
  const [deck, setDeck] = useState<Deck>({ _id: "", name: "" })
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [mode, setMode] = useState<'default' | 'add' | 'study' | 'viewAll'>('default')
  const [cardName, setCardName] = useState<string>('')
  const [flashcardDescription, setFlashcardDescription] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [flipped, setFlipped] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [autoFill, setAutoFill] = useState<boolean>(false)
  const [hideAnswer, setHideAnswer] = useState<boolean>(false)
  const [editingFlashcardId, setEditingFlashcardId] = useState<string | null>(null)

  const nav = useNavigate()
  const { deckId } = useParams<{ deckId: string }>()

  const cardNameInputRef = useRef<HTMLInputElement>(null)

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
      setHideAnswer(true)
      setCurrentIndex(currentIndex - 1)
      setFlipped(false)
      setTimeout(() => {
        setHideAnswer(false)
      }, 400)
    }
  }

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setHideAnswer(true)
      setCurrentIndex(currentIndex + 1)
      setFlipped(false)
      setTimeout(() => {
        setHideAnswer(false)
      }, 400)
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

  const handleDeleteFlashcard = async (flashcardId?: string) => {
    try {
      const jwt = localStorage.getItem('token')
      const idToDelete = flashcardId ? flashcardId : flashcards[currentIndex]._id
      setFlashcards(prev => prev.filter((flashcard) => flashcard._id !== idToDelete))
      if (!flashcardId) {
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : 0))
      }
      await axios.delete(`http://localhost:5000/api/flashcards/${deckId}/${idToDelete}`, {
        headers: { Authorization: `Bearer ${jwt}` }
      })
    }
    catch (error) {
      console.error("Failed to delete flashcard", error)
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

  const handleComplete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const flashcard = flashcards[currentIndex]
    const isComplete = flashcard.complete
    const flashcardId = flashcard._id
    const jwt = localStorage.getItem('token')
    try {
      await axios.put(`http://localhost:5000/api/flashcards/${deckId}/${flashcardId}`,
        { complete: !isComplete, question: flashcard.question, answer: flashcard.answer },
        { headers: { Authorization: `Bearer ${jwt}` } }
      )
      setFlashcards((prev) => prev.map(flashcard => flashcard._id === flashcardId ?
        { ...flashcard, complete: !isComplete } : flashcard
      ))
    }
    catch (error) {
      console.error(error)
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
    else if (mode === 'viewAll') {
      fetchFlashcards()
    }
    else if(mode === 'add'){
      cardNameInputRef.current?.focus()
    }
  }, [mode, deckId])

  useEffect(() => {
    if (!autoFill || cardName.trim().length === 0) return

    const fetchDefinition = async () => {
      try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cardName}`)
        const data = await res.json()

        if (res.ok && data.length > 0) {
          const definition = data[0].meanings[0].definitions[0].definition
          setFlashcardDescription(definition)
        }
        else {
          setFlashcardDescription(flashcardDescription)
        }
      }
      catch (error) {
        console.error(error)
      }
    }
    const debounceTime = setTimeout(fetchDefinition, 400)
    return () => clearTimeout(debounceTime)
  }, [cardName])

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
              <FeatureCards title="View Deck" className='deckpage-cards' onClick={() => setMode('viewAll')} />
            </div>
          </>
        )}
        {mode === 'add' && (
          <>
            <div>
              <form className='flashcard-form' onSubmit={handleCardSubmit}>
                <p>{deck.name}</p>
                <input className="deck-input" ref={cardNameInputRef} type="text" placeholder='Enter Card Title' maxLength={75} value={cardName} onChange={(e) => setCardName(e.target.value)} />
                <p>Description</p>
                <div className='input-wrapper'>
                  <textarea className='deck-description' value={flashcardDescription} maxLength={200} onChange={(e) => setFlashcardDescription(e.target.value)} />
                  <span className='char-count'>{flashcardDescription.length}/200</span>
                </div>
                <button className='create-flashcard-btn'>Create Flashcard</button>
                <FormControlLabel
                  control={<Switch checked={autoFill} onChange={() => setAutoFill(!autoFill)} />}
                  label="Auto-fill Definition"
                />
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
                  flipped={flipped}
                  setFlipped={setFlipped}
                  onSave={(updatedQuestion, updatedAnswer) =>
                    updateFlashcard(flashcards[currentIndex]._id, updatedQuestion, updatedAnswer)}
                  hideAnswer={hideAnswer}
                  isComplete={flashcards[currentIndex].complete}
                />
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
        {mode === 'viewAll' && (
          <>
            <h2>All flashcards for {deck.name}</h2>
            <div className='flashcard-table-container'>
              <table className='flashcard-table'>
                <thead>
                  <tr>
                    <th>Questions</th>
                    <th>Answers</th>
                    <th className='actions-header'></th>
                  </tr>
                </thead>
                <tbody>
                  {flashcards.map((flashcard) => (
                    <tr key={flashcard._id} className='flashcard-row'>
                      <td>
                        {editingFlashcardId === flashcard._id ? (
                          <input 
                            type="text"
                            maxLength={75}
                            defaultValue={flashcard.question}
                            onChange={(e) =>
                              setFlashcards((prev) => prev.map((fc) =>
                                fc._id === flashcard._id ? { ...fc, question: e.target.value } : fc
                              ))
                            }
                          />
                        ) : (
                          flashcard.question
                        )
                        }
                      </td>
                      <td>
                        {editingFlashcardId === flashcard._id ? (
                          <textarea
                            maxLength={200}
                            defaultValue={flashcard.answer}
                            onChange={(e) =>
                              setFlashcards((prev) => prev.map((fc) =>
                                fc._id === flashcard._id ? { ...fc, answer: e.target.value } : fc
                              ))
                            }
                          />
                        ) : (
                          flashcard.answer
                        )
                        }
                      </td>
                      <td className='actions-table'>
                        {editingFlashcardId === flashcard._id ? (
                          <button
                            className='table-save-btn'
                            onClick={() => {
                              updateFlashcard(flashcard._id, flashcard.question, flashcard.answer)
                              setEditingFlashcardId(null)
                            }}
                          >Save</button>
                        ) : (
                          <button className="table-edit-btn" onClick={() => setEditingFlashcardId(flashcard._id)}>✏️</button>
                        )}
                        <button className='table-delete-btn' onClick={() => handleDeleteFlashcard(flashcard._id)}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        <div className='btn-container'>
          <button className='back-btn' onClick={handleBack}>
            <ArrowBackIcon />
          </button>
          {mode === 'study' &&
            <button className='complete-btn' onClick={handleComplete}>Complete</button>
          }
          {mode !== 'add' && mode !== 'viewAll' && 
            <button className='del-btn'>
              <DeleteIcon onClick={handleDelete} />
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default DeckPage