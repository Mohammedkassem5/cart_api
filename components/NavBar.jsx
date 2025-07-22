import {
  faShoppingCart,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { toast } from "react-toastify"; // ✅ لازم تكون مستوردها

const NavBar = ({ toggleSidebar, searchTerm, setSearchTerm, cartItems }) => {
  const navigate = useNavigate();
  const tabs = ["Home", "about", "contact", "shop"];

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
    <nav className="noon-navbar">
      <div className="nav-left">
        {/* ✅ التعديل هنا: */}
        <img
          src="/logo.png"
          alt="logo"
          className="nav-logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />
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

        <Link to="/login" className="nav-text login-link">
          Log in <FontAwesomeIcon icon={faUser} />
        </Link>

        <Link to="/favorites">
          <FontAwesomeIcon icon={faHeart} className="nav-icon" />
        </Link>

        <FontAwesomeIcon
          icon={faShoppingCart}
          className="nav-icon"
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
        />

        <button onClick={handleCheckoutClick} className="nav-checkout-button">
          Checkout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
