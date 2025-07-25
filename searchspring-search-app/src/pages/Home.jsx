// src/pages/Home.jsx
import React from "react";
import CategoryCard from "../components/CategoryCard";
import "./Home.css";

const categories = [
  {
    title: "Summer Collection",
    image: "/sunglasses.png",
    backgroundColor: "#e1c8f7",
  },
  {
    title: "Tops",
    image: "/topss.png",
    backgroundColor: "#f4e6a1",
  },
  {
    title: "Shoes",
    image: "/shoe.png",
    backgroundColor: "#b9e4f3",
  },
  {
    title: "Jeans",
    image: "/jean.png",
    backgroundColor: "#f8c3d3",
  },
  {
    title: "Dresses",
    image: "/dresses.png",
    backgroundColor: "#d2f4d6",
  },
];

const Home = ({onShopNow}) => {
  return (
    <div className="home-wrapper">
      {categories.map((cat, index) => (
        <CategoryCard
          key={index}
          title={cat.title}
          image={cat.image}
          backgroundColor={cat.backgroundColor}
          onShopNow={onShopNow}
        />
      ))}
    </div>
  );
};

export default Home;
