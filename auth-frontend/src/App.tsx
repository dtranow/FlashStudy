import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import './App.css'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Homepage from './pages/Homepage'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Router>
      <nav className="nav-bar">
        <div className='left-nav'>
          <Link to="/">Home</Link>
        </div>
        <div className='right-nav'>
          <Link to="/login">Login</Link>
          <Link to="/registration">Registration</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/registration" element={<Registration />}/>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
