import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppWrapper from "./App.jsx";
import "animate.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);

// #Essentials
// npm i -D react-router-dom@latest
//  npm i sass
//  npm i bootstrap@latest
// npm i axios

// #State Management
// npm install @reduxjs/toolkit react-redux
// npm i recoil

// #Fontawesome
// npm i --save @fortawesome/fontawesome-svg-core
// npm i --save @fortawesome/free-solid-svg-icons
// npm i --save @fortawesome/free-regular-svg-icons
// npm i --save @fortawesome/free-brands-svg-icons
// npm i --save @fortawesome/react-fontawesome@latest

// #Optional
// npm i sweetalert2
// npm i swiper
// npm i wowjs
// npm i animate.css --save
