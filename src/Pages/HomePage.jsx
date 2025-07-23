import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Products from "../components/Products";
import CategoryBanner from "../components/CategoryBanner";
import LoginPrompt from "../Pages/LoginPrompt";
import axios from "axios";
import "./HomePage.css";

const HomePage = ({
  onAddToCart,
  toggleFavorite, 
  favorites, 
  cartItems,
  toggleSidebar,
}) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="col-12" id="HomePage">
      <NavBar
        toggleSidebar={toggleSidebar}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartItems={cartItems}
      />

      <LoginPrompt />

      <CategoryBanner
        products={products}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="col-12 container d-flex flex-wrap gap-4 p-3 justify-content-center">
        {filteredProducts.map((el) => (
          <Products
            key={el.id}
            id={el.id}
            title={el.title}
            imgSrc={el.image}
            price={el.price}
            category={el.category}
            onAddToCart={onAddToCart}
            toggleFavorite={toggleFavorite} 
            favorites={favorites} 
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
