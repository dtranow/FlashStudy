import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Dashboard.css'
import FeatureCards from '../components/FeatureCards'
import Sidebar from '../components/Sidebar'
import axios from 'axios'


interface Deck {
  _id: string;
  name: string;
  description: string;
  lastOpened: number;
}
interface props {
  isOpen: boolean;
  toggleSidebar: () => void;
  handleLogout: () => void;
}

const Dashboard: React.FC<props> = ({ isOpen, toggleSidebar, handleLogout }) => {
  const [decks, setDecks] = useState<Deck[]>([])
  const nav = useNavigate()

  const fetchDecks = async () => {
    try{
      const jwt = localStorage.getItem('token')
      const res = await axios.get('http://localhost:5000/api/decks', {
        headers: { Authorization: `Bearer ${jwt}`}
      })
      if(Array.isArray(res.data)){
        setDecks(res.data)
      }
      else{
        setDecks([])
      }
    }
    catch(error) {
      console.error("Failed to fetch decks ", error)
    }
  }

  useEffect(() => {
    fetchDecks()
  }, [])

  const handleDeckClick = (deckId: string) => {
    const recentDecks = JSON.parse(localStorage.getItem("recentDecks") || "{}")
    recentDecks[deckId] = Date.now()
    localStorage.setItem("recentDecks", JSON.stringify(recentDecks))
    nav(`/deckpage/${deckId}`)
  }

  return (
    <div className='dashboard-container'>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout}/>
      <div className='main-content'>
        <div className='dashboard-intro'>
          <h1>Welcome to your Flashcard Dashboard!</h1>
          <p>Create a new deck, add flashcards to an existing deck, or start studying now!</p>
          <div className='dashboard-cards'>
              <FeatureCards className='feature-cards create-deck-card' title="Create Deck" description="Build custom flashcard decks to organize your study material." onClick={() => nav('/create-deck')} />
              {decks.map((deck) => (
                <FeatureCards key={deck._id} className='feature-card' title={deck.name} description={deck.description} onClick={() => handleDeckClick(deck._id)}/>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard