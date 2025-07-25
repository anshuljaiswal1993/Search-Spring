// src/components/CategoryCard.jsx
import React from "react";
import "./CategoryCard.css";

const CategoryCard = ({ title, image, backgroundColor ,onShopNow }) => {
  return (
    <div className="category-card" style={{ backgroundColor }}>
      <img src={image} alt={title} className="category-image" />
      <div className="category-info">
        <h3>{title}</h3>
        <button className="shop-btn" onClick={() => onShopNow(title)}>Shop Now</button>
      </div>
    </div>
  );
};

export default CategoryCard;
