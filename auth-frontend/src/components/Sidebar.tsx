import React, {useEffect, useState } from 'react'
import { VscArrowRight, VscArrowLeft } from 'react-icons/vsc'
import axios from 'axios'
import SidebarDeckList from './SidebarDeckList'
import '../Dashboard.css'

interface props {
    isOpen: boolean;
    toggleSidebar: () => void;
    handleLogout: () => void;
}

interface Deck {
  id: string;
  name: string;
  progress: number;
}

const Sidebar: React.FC<props> = ({ isOpen, toggleSidebar, handleLogout }) => {
  const [decks, setDecks] = useState<Deck[]>([])
  const jwt = localStorage.getItem('token')

  const fetchDecks = async () => {
    try {
      const res = await axios.get("/api/decks", {
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
      console.error("Failed to fetch decks", error)
    }
  }

  useEffect(() => {
    fetchDecks()
  }, [])
  
  return (
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <button className='close-btn' onClick={toggleSidebar}>{isOpen ? <VscArrowLeft/> : <VscArrowRight/>}</button>
        <div className='user-info'>
          <h2>name</h2>
          <p>_ flashcards created!</p>
        </div>
        <nav className='flashcard-list'>
          <SidebarDeckList decks={decks || []} />
        </nav>
        <button className='log-out' onClick={handleLogout}>Logout</button>
      </div>  
      )
}

export default Sidebar