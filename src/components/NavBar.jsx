import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./NavBar.css";

const NavBar = ({ toggleSidebar }) => {
  const tabs = ["Home", "about", "contact", "shop"];

  return (
    <div
      className="col-12 bg-dark d-flex p-3 justify-content-between"
      id="NavBar"
    >
      <ul className="d-flex gap-4 mb-0">
        {tabs.map((el, index) => (
          <li key={index} style={{ color: "white", listStyle: "none" }}>
            {el}
          </li>
        ))}
      </ul>
      <FontAwesomeIcon
        onClick={(e) => {
          e.stopPropagation();
          toggleSidebar();
        }}
        className="icon px-4 text-white"
        icon={faShoppingCart}
      />
    </div>
  );
};

export default NavBar;
