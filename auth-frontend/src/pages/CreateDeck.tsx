import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import '../Dashboard.css'
import { useNavigate } from 'react-router-dom'

interface props {
  isOpen: boolean;
  toggleSidebar: () => void;
  handleLogout: () => void;
}

const CreateDeck: React.FC<props> = ({ isOpen, toggleSidebar, handleLogout }) => {
  const [deckName, setDeckName] = useState<string>('')
  const nav = useNavigate()

  const handleHome = () => {
    nav('/dashboard')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if(deckName === "") return

    const token = localStorage.getItem('token')
    const res = await fetch("http://localhost:5000/api/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ name: deckName})
    })
    if(res.ok){
      nav('/add-flashcards')
    }
    else{
      console.error("Failed to create deck")
    }
  }

  return (
    <div className='dashboard-container'>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout}/>
      <div className='main-content'>
        <button onClick={handleHome}>Home</button>
        <h1>Create Deck</h1>
        <form className='flashcard-form' onSubmit={handleSubmit}>
          <input className="deck-input" type="text" placeholder='Enter Deck name' value={deckName} onChange={(e) => setDeckName(e.target.value)}/>
          <button className='create-deck-btn' type='submit'>Create Deck</button>
        </form>
      </div>
    </div>
  )
}

export default CreateDeck