import React from "react";
import "./Products.css";

const Products = (props) => {
  const handleClick = () => {
    const productData = {
      id: props.id,
      title: props.title, 
      price: props.price,
      image: props.imgSrc,
    };
    props.onAddToCart(productData);
  };

  return (
    <div className="product-card">
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
  // test
};

export default Products;
