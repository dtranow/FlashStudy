import React from 'react'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom';

interface props {
  isOpen: boolean;
  toggleSidebar: () => void;
  handleLogout: () => void;
}

const DeckPage: React.FC<props> = ({ isOpen, toggleSidebar, handleLogout }) => {
  const nav = useNavigate()

  const handleHome = () => {
    nav('/dashboard')
  }

  return (
    <div className='dashboard-container'>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout}/>
      <div className='main-content'>
        <button onClick={handleHome}>Home</button>
        <h1>Add cards to or start studying!</h1>
        <div className='deck-options'>
          <div onClick={() => nav(`/deck/`)}>Add flashcards</div>
          <div>Study flashcards</div>
        </div>
      </div>
    </div>  
    )
}

export default DeckPage