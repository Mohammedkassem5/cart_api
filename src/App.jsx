import { useState, useRef, useEffect } from "react";
import { HashRouter, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/CartPage";
import LoginPage from "./Pages/LoginPage";
import CheckoutPage from "./Pages/CheckoutPage";
import FavoritesPage from "./Pages/FavoritesPage";
import CartSidebar from "./components/CartSidebar";
import "animate.css";
import "./App.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);

  const [showSidebar, setShowSidebar] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const sidebarRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("my_cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    setCartLoaded(true);

    const storedFavorites = localStorage.getItem("my_favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    setFavoritesLoaded(true);
  }, []);

  useEffect(() => {
    if (cartLoaded) {
      localStorage.setItem("my_cart", JSON.stringify(cart));
    }
  }, [cart, cartLoaded]);

  useEffect(() => {
    if (favoritesLoaded) {
      localStorage.setItem("my_favorites", JSON.stringify(favorites));
    }
  }, [favorites, favoritesLoaded]);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    // toast.success("✅ Added to cart!");
  };

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
    toast.info("⭐ Favorites updated!");
  };

  const updateQuantity = (id, newQty) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const openSidebar = () => {
    setShowSidebar(true);
    setAnimationClass("animate__animated animate__fadeInRight");
  };

  const closeSidebar = () => {
    setAnimationClass("animate__animated animate__fadeOutRight");
    setTimeout(() => {
      setShowSidebar(false);
    }, 500);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isButton = e.target.closest("button");
      const insideSidebar = sidebarRef.current?.contains(e.target);
      if (!insideSidebar && !isButton) {
        closeSidebar();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleCheckoutClick = () => {
    if (!cart || cart.length === 0) {
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
    <div className="col-12 app">
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onAddToCart={handleAddToCart}
              cartItems={cart}
              toggleSidebar={() =>
                showSidebar ? closeSidebar() : openSidebar()
              }
              toggleFavorite={toggleFavorite}
              favorites={favorites}
              onCheckoutClick={handleCheckoutClick}
            />
          }
        />
        <Route path="/cart" element={<CartPage cartItems={cart} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cartItems={cart}
              toggleSidebar={() =>
                showSidebar ? closeSidebar() : openSidebar()
              }
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favorites={favorites}
              onAddToCart={handleAddToCart}
              toggleFavorite={toggleFavorite}
            />
          }
        />
      </Routes>

      {showSidebar && (
        <div ref={sidebarRef} className={`sidebar ${animationClass}`}>
          <CartSidebar
            cartItems={cart}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        </div>
      )}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
