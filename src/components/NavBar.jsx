import {
  faShoppingCart,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./NavBar.css";

const NavBar = ({ toggleSidebar, searchTerm, setSearchTerm }) => {
  const tabs = ["Home", "about", "contact", "shop"];

  return (
    <nav className="noon-navbar">
      <div className="nav-left">
        <img src="/logo.png" alt="logo" className="nav-logo" />
        <span className="nav-location">
          Deliver to <strong>Cairo</strong>
        </span>
      </div>

      <div className="nav-center">
        <input
          type="text"
          className="nav-search"
          placeholder="What are you looking for?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="nav-right">
        <span className="nav-text">العربية</span>
        <span className="nav-text">
          Log in <FontAwesomeIcon icon={faUser} />
        </span>
        <FontAwesomeIcon icon={faHeart} className="nav-icon" />
        <FontAwesomeIcon
          icon={faShoppingCart}
          className="nav-icon"
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
        />
      </div>
    </nav>
  );
};

export default NavBar;
