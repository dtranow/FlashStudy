import React from 'react'
import flashcard from '../assets/flashcards.png'
import FeatureCards from '../components/FeatureCards'

const Homepage: React.FC = () => {
  return (
    <div>
      <div className="homepage">
        <div className='hero'>
          <h1>Study Efficiently with Flashcards</h1>
          <p>Boost your grades with easy to use interactive flashcards!</p>
        <div className='sign-up'>
          <p>Get started today!</p>
          <div>
          <input className='input' type="email" placeholder='example@example.com'/>
          <button className='signup-btn'>Sign up</button>
          </div>
        </div>
      </div>
        <div className="homepage-image">
          <img src={flashcard} alt="flashcards image"/>
        </div>
      </div>
      <div className="content-section">
        <div className='about-section'>
          <h2>A technology that will help you succeed in your courses!</h2>
        </div>
        <div className='why-section'>
          <h2>Why you should use our flashcards!</h2>
          <div> Our flashcards help you retain knowledge faster with interactive learning and smart repetition techniques</div>
        </div>
      </div>
      <div className='features-section'>
        <h2>Features for our interactive flashcards!</h2>
        <div className='features-container'>
          card components later
        </div>
      </div>
    </div>
  )
}


export default Homepage