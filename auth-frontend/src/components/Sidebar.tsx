import React, {useEffect, useState } from 'react'
import { VscArrowRight, VscArrowLeft } from 'react-icons/vsc'
import axios from 'axios'
import SidebarDeckList from './SidebarDeckList'
import '../Dashboard.css'

interface props {
    isOpen: boolean;
    toggleSidebar: () => void;
    handleLogout: () => void;
    onDeckClick?: (deckId: string) => void;
}

interface Deck {
  _id: string;
  name: string;
  progress: number; //add completed cards later and then / by total cards in deck
}

const Sidebar: React.FC<props> = ({ isOpen, toggleSidebar, handleLogout, onDeckClick }) => {
  const [decks, setDecks] = useState<Deck[]>([])
  const [name, setName] = useState<string>('')
  const jwt = localStorage.getItem('token')
  const headers = jwt ? { Authorization: `Bearer ${jwt}` } : {}; 

  const fetchDecks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/decks', {headers}
      )
      if(Array.isArray(res.data)){
        const formatDecks = res.data.map(deck => ({
          _id: deck._id,
          name: deck.name,
          progress: 50
        }))
        setDecks(formatDecks)
      }
      else{
        setDecks([])
      }
    }
    catch(error) {
      console.error("Failed to fetch decks", error)
    }
  }

  const fetchName = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/profile', {headers})
      setName(res.data.user?.name)
    }
    catch(error) {
      console.error("Failed to fetch name ", error)
    }
  }

  useEffect(() => {
    fetchDecks()
    fetchName()
  }, [])
  
  return (
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <button className='close-btn' onClick={toggleSidebar}>{isOpen ? <VscArrowLeft/> : <VscArrowRight/>}</button>
        <div className='user-info'>
          <h2>{name}</h2>
          <p>_ flashcards created!</p>
        </div>
        <nav className='flashcard-list'>
          <SidebarDeckList decks={decks || []} onDeckClick={onDeckClick ?? (() => {})}/>
        </nav>
        <button className='log-out' onClick={handleLogout}>Logout</button>
      </div>  
      )
}

export default Sidebar