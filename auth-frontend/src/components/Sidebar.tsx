import React from 'react'
import { VscArrowRight, VscArrowLeft } from 'react-icons/vsc'
import '../Dashboard.css'

interface props {
    isOpen: boolean;
    toggleSidebar: () => void;
    handleLogout: () => void;
}

const Sidebar: React.FC<props> = ({ isOpen, toggleSidebar, handleLogout }) => {
  return (
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <button className='close-btn' onClick={toggleSidebar}>{isOpen ? <VscArrowLeft/> : <VscArrowRight/>}</button>
        <div className='user-info'>
          <h2>name</h2>
          <p>_ flashcards created!</p>
        </div>
        <nav className='flashcard-list'>
          <ul>
            <li>flashcards deck 1</li>
            <li>flashcards deck 2</li>
          </ul>
        </nav>
        <button className='log-out' onClick={handleLogout}>Logout</button>
      </div>  
      )
}

export default Sidebar