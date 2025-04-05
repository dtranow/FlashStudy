import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import '../Dashboard.css'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


interface props {
  isOpen: boolean;
  toggleSidebar: () => void;
  handleLogout: () => void;
}

const CreateDeck: React.FC<props> = ({ isOpen, toggleSidebar, handleLogout }) => {
  const [deckName, setDeckName] = useState<string>('')
  const [deckDescription, setDeckDescription] = useState<string>('')

  const nav = useNavigate()

  const handleHome = () => {
    nav('/dashboard')
  }

  const handleBack = async () => {
    nav('/dashboard')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (deckName === "") return

    const token = localStorage.getItem('token')
    const res = await fetch("http://localhost:5000/api/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ name: deckName, description: deckDescription })
    })
    if (res.ok) {
      nav('/dashboard')
    }
    else {
      console.error("Failed to create deck")
    }
  }

  return (
    <div className='dashboard-container'>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
      <div className='main-content'>
        <button onClick={handleHome}>Home</button>
        <h1>Create Deck</h1>
        <form className='flashcard-form' onSubmit={handleSubmit}>
          <p>Title</p>
          <input className="deck-input" type="text" placeholder='Enter Deck name' maxLength={50} value={deckName} onChange={(e) => setDeckName(e.target.value)} />
          <p>Description</p>
          <div className='input-wrapper'>
            <textarea className='deck-description' value={deckDescription} maxLength={200} onChange={(e) => setDeckDescription(e.target.value)} />
            <span className='char-count'>{deckDescription.length}/200</span>
          </div>
          <button className='create-deck-btn'>Create</button>
        </form>
        <button className='back-btn' onClick={handleBack}>
          <ArrowBackIcon />
        </button>
      </div>
    </div>
  )
}

export default CreateDeck