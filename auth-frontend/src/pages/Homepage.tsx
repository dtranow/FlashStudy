import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import flashcard from '../assets/flashcards.png'
import FeatureCards from '../components/FeatureCards'

const features = [
  { title: "Smart Repetition", description: "Learn faster with AI-driven repetition." },
  { title: "Customizable Decks", description: "Organize flashcards your way." },
  { title: "Interactive Learning", description: "Engage with quizzes and games." }
]

const Homepage: React.FC = () => {
  const [signupEmail, setSignupEmail] = useState<string>("")
  
  const navigate = useNavigate()

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSignUp = () => {
    if(!isValidEmail(signupEmail)){
      alert("Please enter a valid email address.")
      return
    }
    navigate(`/registration?email=${encodeURIComponent(signupEmail)}`)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupEmail(e.target.value)
  }

  return (
    <div>
      <div className="homepage">
        <div className='hero'>
          <h1>Master your Flashcards Faster.</h1>
          <p>Boost your grades with easy to use interactive flashcards!</p>
        <div className='hero-sign-up'>
          <p>Get started today!</p>
          <div>
          <input className='input' type="email" placeholder='example@example.com' value={signupEmail} required onChange={handleInput}/>
          <button className='hero-signup-btn' onClick={handleSignUp}>Sign up</button>
          </div>
        </div>
      </div>
        <div className="homepage-image">
          <img src={flashcard} alt="flashcards image"/>
        </div>
      </div>
      <div className="content-section">
        <div className='about-section'>
          <div>A technology that will help you succeed in your courses!</div>
        </div>
        <div className='why-section'>
          <h2>Why you should use our flashcards!</h2>
          <div> Our flashcards help you retain knowledge faster with interactive learning and smart repetition techniques.</div>
        </div>
      </div>
      <div className='features-section'>
        <h2>Features of our interactive flashcards!</h2>
        <div className='features-container'>
          {features.map((feature, index) => (
            <FeatureCards key={index} title={feature.title} description={feature.description}></FeatureCards>
          ))}
        </div>
      </div>
      <footer className='footer'>
        <img />
        <div>Made by Daniel</div>
      </footer>
    </div>
  )
}


export default Homepage