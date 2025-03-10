import React from "react";

const Registration: React.FC = () => {
  return (
  <div>
    <h1>Registration Form</h1>
    <h3>Create an account below!</h3>
    <form>
        <input type="email" placeholder="Email"></input>
        <input type="text" placeholder="Username"></input>
        <input type="password" placeholder="Password"></input>
        <input type="text" placeholder="Name"></input>
        <button type="submit">Register</button>
    </form>
  </div>
  )
};

export default Registration;