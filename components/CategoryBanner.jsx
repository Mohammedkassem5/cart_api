import React from "react";
import "./CategoryBanner.css";

const CategoryBanner = ({
  products,
  selectedCategory,
  setSelectedCategory,
}) => {
  if (!products || products.length === 0) return null;

  const categories = ["all", ...new Set(products.map((el) => el.category))];

  return (
    <div className="category-banner d-flex justify-content-center flex-wrap p-3">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`category-btn btn mx-2 mb-2 ${
            selectedCategory === category ? "btn-dark" : "btn-outline-dark"
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryBanner;
