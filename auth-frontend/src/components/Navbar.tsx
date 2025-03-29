import React from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
    return (
        <nav className="nav-bar">
            <div className='left-nav'>
                <Link to="/">Home</Link>
            </div>
            <div className='title-bar'>
                FlashStudy
                <span className='hover-title' data-text="FlashStudy"></span>
            </div>
            <div className='right-nav'>
                <Link to="/login">Login</Link>
                <Link to="/registration" className='sign-up-nav'>Sign Up</Link>
            </div>
        </nav>)
}

export default Navbar