import React from "react";

const Login: React.FC = () => {
  return (
    <div>
        <h1>Login Page</h1>
        <form>
            <input type="text" placeholder="Username"></input>
            <input type="text" placeholder="Password"></input>
            <button type="submit">Login</button>
        </form>
    </div>
  )
};

export default Login;