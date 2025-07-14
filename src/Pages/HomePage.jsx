import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Products from "../components/Products";
import axios from "axios";
import "./HomePage.css";


const HomePage = ({ onAddToCart, cartItems, toggleSidebar }) => {
  const [prodcuts, setProdcuts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProdcuts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="homepage">
      <NavBar toggleSidebar={toggleSidebar} />

      <div className="products-container">
        {prodcuts.map((el) => (
          <Products
            key={el.id}
            id={el.id}
            imgSrc={el.image}
            price={el.price}
            category={el.category}
            title={el.title}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
