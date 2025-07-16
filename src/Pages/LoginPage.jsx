import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form className="login-form">
          {!isLogin && <input type="text" placeholder="Username" required />}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>
        </form>
        <p onClick={toggleForm} className="toggle-form">
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Log In"}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
