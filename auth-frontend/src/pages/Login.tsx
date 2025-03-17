import React, { useState, useEffect } from "react";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [rememberMe, setRememberMe] = useState<boolean>(false)

  useEffect(() => {
    const savedUsername = localStorage.getItem('username')
    if(savedUsername){
      setUsername(savedUsername)
      setRememberMe(true)
    }
  }, [])

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })

    const data = await res.json()
    if(res.ok){
      localStorage.setItem('token', data.token)
      if(rememberMe){
        localStorage.setItem('username', username)
      }
      else{
        localStorage.removeItem('username')
      }
      window.location.href = '/dashboard'
    }
    else{
      alert(data.message || "Invalid username or password")
    }

  }


  return (
    <section className="login-form">
      <div className='login-content'>
        <p>Logo</p>
        <h1>Welcome!</h1>
        <h2>To FlashCardsMania</h2>
        <p>description of website</p>
      </div>
      <div className='login-box'>
        <h2>Sign In</h2>
        <form onSubmit={(e) => handleLogin(e)}>
          <div className="login-input1">
            <input type="text" placeholder="Username" value={username} required onChange={(e) => { handleUserChange(e) }} />
          </div>
          <div className="login-input1">
            <input type="password" placeholder="Password" value={password} required onChange={(e) => { handlePasswordChange(e) }} />
          </div>
          <div className="login-options">
            <label>
              <input type="checkbox" checked={rememberMe} onClick={toggleRememberMe}/> Remember me
            </label>
            <a href="/">Forgot your password?</a>
          </div>
          <button className="login-btn">Sign In</button>
        </form>
        <div className="register-link">
          <div>Don't have an account?</div>
          <a href="/registration">Sign up</a>
        </div>
      </div>
    </section>
  )
};

export default Login;