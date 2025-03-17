import React, { useState } from 'react'
import { VscArrowRight, VscArrowLeft } from 'react-icons/vsc'
import '../Dashboard.css'
import FeatureCards from '../components/FeatureCards'

const features = [
  { title: "Create Deck"},
  { title: "Add Flashcards"},
  { title: "Study Flashcards"}
]

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const handleCardClick = () => {

  }

  return (
    <div className='dashboard-container'>
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
      <div className='main-content'>
        <div className='dashboard-intro'>
          <h1>Welcome to your Flashcard Dashboard!</h1>
          <p>Create a new deck, add flashcards to an existing deck, or start studying now!</p>
          <div className='dashboard-cards'>
            {features.map((feature, index) => (
              <FeatureCards className='feature-cards' key={index} title={feature.title} onClick={handleCardClick} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard