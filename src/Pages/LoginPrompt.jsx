import React, { useState, useEffect } from "react";
import "./LoginPrompt.css";
import { Link } from "react-router-dom";

const LoginPrompt = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="login-prompt bounce-in">
      <span className="close-btn" onClick={handleClose}>
        ×
      </span>
      <p>🚀 Welcome! Log in to access exclusive offers and features.</p>
      <Link to="/login" className="login-link">
        Log In Now
      </Link>
    </div>
  );
};

export default LoginPrompt;
