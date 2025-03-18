import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../Dashboard.css'
import FeatureCards from '../components/FeatureCards'
import Sidebar from '../components/Sidebar'

const features = [
  { title: "Create Deck", description: "Build custom flashcard decks to organize your study material."},
  { title: "Add Flashcards", description: "Add new flashcards with terms and definitions to your existing decks."},
  { title: "Study Flashcards", description: "Review your flashcards for memorization through repetition."}
]

interface props {
  isOpen: boolean;
  toggleSidebar: () => void;
  handleLogout: () => void;
}

const Dashboard: React.FC<props> = ({ isOpen, toggleSidebar, handleLogout }) => {
  
  const nav = useNavigate()

  const handleCardClick = (index: number) => {
    switch(index) {
      case 0:
        nav('/create-deck')
        break
      case 1:
        nav('/add-flashcards')
        break  
      case 2:
        nav('/studycards')
        break
      default:
        break
    }
  }

  return (
    <div className='dashboard-container'>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout}/>
      <div className='main-content'>
        <div className='dashboard-intro'>
          <h1>Welcome to your Flashcard Dashboard!</h1>
          <p>Create a new deck, add flashcards to an existing deck, or start studying now!</p>
          <div className='dashboard-cards'>
            {features.map((feature, index) => (
              <FeatureCards className='feature-cards' key={index} title={feature.title} description={feature.description} onClick={() => handleCardClick(index)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard