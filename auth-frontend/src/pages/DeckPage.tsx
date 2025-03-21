import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'

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
  const nav = useNavigate()
  const { deckId } = useParams<{ deckId: string}>()

  const fetchDeck = async () => {
    try {
      const jwt = localStorage.getItem('token')
      const res = await axios.get(`http://localhost:5000/api/decks/${deckId}`, {
        headers: { Authorization: `Bearer ${jwt}`}
      })
      console.log(res.data)
      setDeck(res.data)
    }
    catch(error) {
      console.error("Failed to fetch deck", error)
    }
  }

  useEffect(() => {
    fetchDeck()
  }, [])

  const handleHome = () => {
    nav('/dashboard')
  }

  return (
    <div className='dashboard-container'>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout}/>
      <div className='main-content'>
        <button onClick={handleHome}>Home</button>
        <h1>Add cards to {deck ? deck.name : "your deck"} or start studying!</h1>
        <div className='deck-options'>
          <div onClick={() => nav(`/deck/`)}>Add flashcards</div>
          <div>Study flashcards</div>
        </div>
      </div>
    </div>  
    )
}

export default DeckPage