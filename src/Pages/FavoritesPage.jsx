import React from "react";
import NavBar from "../components/NavBar";
import Products from "../components/Products";
import { useNavigate } from "react-router-dom";
import "./FavoritesPage.css";
import card from "../assets/card.png";

const FavoritesPage = ({
  favorites,
  onAddToCart,
  toggleFavorite,
  toggleSidebar,
}) => {
  const navigate = useNavigate();

  return (
    <div className="favorites-wrapper">
      <NavBar
        toggleSidebar={toggleSidebar}
        cartItems={[]}
        searchTerm=""
        setSearchTerm={() => {}}
      />

      <div className="favorites-grid">
        {favorites.length === 0 ? (
          <div className="empty-favorite-card">
            
  <img
  src={card}
  alt="No favorites"
  className="empty-fav-image"
/>

            <h3>No favorites yet</h3>
            <p>You haven’t added any items to your favorites.</p>
            <button className="go-home-btn" onClick={() => navigate("/")}>
              Browse Products
            </button>
          </div>
        ) : (
          favorites.map((el) => (
            <Products
              key={el.id}
              id={el.id}
              title={el.title}
              imgSrc={el.image}
              price={el.price}
              category={el.category}
              onAddToCart={onAddToCart}
              isFavorite={true}
              toggleFavorite={toggleFavorite}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
