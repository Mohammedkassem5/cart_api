import {
  faShoppingCart,
  faHeart,
  faUser,
  faSearch,
  faBars,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./NavBar.css";
import logo from "../assets/logo.png";

const NavBar = ({ toggleSidebar, searchTerm, setSearchTerm, cartItems }) => {
  const navigate = useNavigate();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

const handleCheckoutClick = () => {
  if (!cartItems || cartItems.length === 0) {
    toast.error("🛒 You must add products first!", {
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
    });
  } else {
    navigate("/checkout");
  }

  
};


  return (
    <>
      <nav className="noon-navbar">
        <div className="nav-left">
          <img
            src={logo}
            alt="logo"
            className="nav-logo"
            onClick={() => navigate("/")}
          />
          <span className="nav-location">
            Deliver to <strong>Cairo</strong>
          </span>
        </div>

        <div className="nav-center desktop-search">
          <input
            type="text"
            className="nav-search"
            placeholder="What are you looking for?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="nav-right">
          <span className="nav-text lang">العربية</span>

          <div className="desktop-buttons">
            <Link to="/login" className="login-link">
              <FontAwesomeIcon icon={faUser} /> Log in
            </Link>
            <Link to="/favorites">
              <FontAwesomeIcon icon={faHeart} className="nav-icon" />
            </Link>
            <button
              onClick={handleCheckoutClick}
              className="nav-checkout-button"
            >
              Checkout
            </button>
          </div>

          <div
            className="mobile-search-btn"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <FontAwesomeIcon icon={faSearch} />
          </div>

          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
          </div>

          <FontAwesomeIcon
            icon={faShoppingCart}
            className="nav-icon"
            onClick={(e) => {
              e.stopPropagation();
              toggleSidebar();
            }}
          />
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <FontAwesomeIcon icon={faUser} /> Log in
            </Link>
            <Link to="/favorites" onClick={() => setMenuOpen(false)}>
              <FontAwesomeIcon icon={faHeart} /> Favorites
            </Link>
            <button
              onClick={() => {
                setMenuOpen(false);
                handleCheckoutClick();
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </nav>

      {showMobileSearch && (
        <div className="mobile-search-slide">
          <input
            type="text"
            placeholder="Search..."
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
    </>
  );
};

export default NavBar;