import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import './App.css'
import Login from './pages/login'
import Registration from './pages/registration'

function App() {
  return (
    <Router>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/registration">Registration</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/registration" element={<Registration />}/>
      </Routes>
    </Router>
  )
}

export default App
