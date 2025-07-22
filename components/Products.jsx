import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import "./Products.css";

const Products = (props) => {
  const handleClick = () => {
    const productData = {
      id: props.id,
      title: props.title,
      price: props.price,
      image: props.imgSrc,
      category: props.category,
    };
    props.onAddToCart(productData);
  };

  const handleFavorite = () => {
    const productData = {
      id: props.id,
      title: props.title,
      price: props.price,
      image: props.imgSrc,
      category: props.category,
    };
    props.toggleFavorite(productData);
  };

  const isFavorited = props.favorites?.some((item) => item.id === props.id);

  return (
    <div className="product-card">
      <div className="favorite-icon" onClick={handleFavorite}>
        <FontAwesomeIcon icon={isFavorited ? solidHeart : regularHeart} />
      </div>

      <div className="image-wrapper">
        <img src={props.imgSrc} alt={props.title} className="product-image" />
      </div>
      <div className="product-content">
        <h3 className="product-title">{props.title}</h3>
        <p className="product-category">{props.category}</p>
        <p className="product-price">{props.price} EGP</p>
        <button className="product-btn" onClick={handleClick}>
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Products;
