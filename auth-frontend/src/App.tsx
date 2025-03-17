import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Homepage from './pages/Homepage'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'

function App() {
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
          <Route path="/dashboard" element={<Dashboard />}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
