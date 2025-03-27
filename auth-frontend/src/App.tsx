import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Homepage from './pages/Homepage'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import CreateDeck from "./pages/CreateDeck"
import DeckPage from "./pages/DeckPage"

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar/>
            <Homepage />
          </>
        }/>
        <Route path="/login" element={<>
          <Navbar/>
          <Login />
        </>}/>
        <Route path="/registration" element={
          <>
            <Navbar/>
            <Registration />
          </>
        }/>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard isOpen={isOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout}/>}/>
          <Route path="/create-deck" element={<CreateDeck isOpen={isOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout}/>}/>
          <Route path="/deckpage/:deckId" element={<DeckPage isOpen={isOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout}/>}/>
          <Route path="/deckpage/:deckId/add" element={<DeckPage isOpen={isOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout}/>}/>
          <Route path="/deckpage/:deckId/study" element={<DeckPage isOpen={isOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout}/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
