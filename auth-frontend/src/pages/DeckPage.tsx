import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import FeatureCards from '../components/FeatureCards';
import '../Dashboard.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

interface Deck {
  _id: string;
  name: string;
}

interface props {
  isOpen: boolean;
  toggleSidebar: () => void;
  handleLogout: () => void;
}

const DeckPage: React.FC<props> = ({ isOpen, toggleSidebar, handleLogout }) => {
  const [deck, setDeck] = useState<Deck | null>(null)
  const [mode, setMode] = useState<'default' | 'add' | 'study'>('default')
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

  useEffect(() => {
    fetchDeck()
  }, [])

  useEffect(() => {
    fetchDeck()
  }, [deck])

  const handleHome = () => {
    nav('/dashboard')
  }

  return (
    <div className='dashboard-container'>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout}/>
      <div className='main-content'>
        <button onClick={handleHome}>Home</button>
        {mode === 'default' && (
          <>
            <h1>Add cards to {deck ? deck.name : "your deck"} or start studying!</h1>
            <div className='deck-options'>
              <FeatureCards title="Add Flashcards" className='deckpage-cards' onClick={() => setMode('add')}/>
              <FeatureCards title="Study Flashcards" className='deckpage-cards' onClick={() => setMode('study')}/>
            </div>
          </>
        )}
        {mode === 'add' && (
          <>
            <div></div>
          </>
        )}
        {mode === 'study' && (
          <>
            <div></div>
          </>
        )}
        <button className='back-btn' onClick={() => setMode('default')}>
          <ArrowBackIcon />
        </button>
        <button className='del-btn'>
          <DeleteIcon />
        </button>
      </div>
    </div>  
    )
}

export default DeckPage