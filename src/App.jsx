import { useState, useRef, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/CartPage";
import LoginPage from "./Pages/LoginPage";
import CheckoutPage from "./Pages/CheckoutPage"; // ✅ جديد
import CartSidebar from "./components/CartSidebar";
import "animate.css";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const sidebarRef = useRef();

  useEffect(() => {
    const storedCart = localStorage.getItem("my_cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("my_cart", JSON.stringify(cart));
  }, [cart]);

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

  return (
    <div className="col-12 app">
      <BrowserRouter>
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
              />
            }
          />
          <Route path="/cart" element={<CartPage cartItems={cart} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/checkout"
            element={<CheckoutPage cartItems={cart} />}
          />{" "}
          {/* ✅ جديد */}
        </Routes>
      </BrowserRouter>

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

export default App;
