import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"

const Registration: React.FC = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const emailQuery = searchParams.get("email") || ""

  const [email, setEmail] = useState<string>(emailQuery)
  const [username, setUsername] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [retypePassword, setRetypePassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showRetypePassword, setShowRetypePassword] = useState<boolean>(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleRetypePasswordVisibility = () => {
    setShowRetypePassword(!showRetypePassword)
  }

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleRetypePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRetypePassword(e.target.value)
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!isValidEmail(email)){
      alert("Email is invalid")
      return
    }
    if(password !== retypePassword){
      alert("Passwords are not the same")
      return
    }
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, name, password })
    })

    const data = await res.json()
    if(res.ok) {
      alert("Account successfully created!")
      setEmail("");
      setUsername("");
      setName("");
      setPassword("");
      setRetypePassword("");
      window.location.href = "/login";
    }
    else{
      alert(data.message || "Error in registration...")
    }

  }

return (
    <div className="registration-page">
      <div className="registration-left">
        <h2>Registration Form</h2>
        <p>Create an account below!</p>
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Email" value={email} onChange={handleEmail} required></input>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Username" value={username} onChange={handleUsername} required></input>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="Name" value={name} onChange={handleName} required></input>
          </div>
          <div className="form-group password-container">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input type={showPassword ? "text" : "password"} placeholder="•••••••••" value={password} onChange={handlePassword} required></input>
              <button type="button" onClick={togglePasswordVisibility} className="eye-icon">
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="form-group password-container">
            <label htmlFor="retypePassword">Retype Password</label>
            <div className="password-input">
              <input type={showRetypePassword ? "text" : "password"} placeholder="•••••••••" value={retypePassword} onChange={handleRetypePassword} required></input>
              <button type="button" onClick={toggleRetypePasswordVisibility} className="eye-icon">
                {showRetypePassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
            <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <a href='/login'>Sign In</a></p>
      </div>
      <div className="registration-right">
        <h1>Why to choose our flashcards</h1>
        <p>Our interactive flashcards and study tools are designed to help you
            master your courses. Enjoy customizable decks, and real-time progress
            tracking—all in one easy-to-use platform.</p>
      </div>
    </div>
  )
};

export default Registration;