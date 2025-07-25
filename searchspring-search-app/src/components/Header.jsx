// src/components/Header.jsx
import React, { useState, useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/cartContext";
import CartModal from "./CartModal";
import "./Header.css";

const Header = ({ theme, toggleTheme }) => {
  const { cart } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className="header">
        <div className="left">
            <div className="logo">🔍 SearchSpring</div>
          {/* <img src="/logo.png" alt="Logo" className="logo" /> */}
        </div>

        <div className="right">
          <button onClick={toggleTheme}>
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>

          <div className="cart-icon" onClick={() => setShowCart(true)}>
            <FaShoppingCart size={22} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </div>
        </div>
      </header>

      {/* <CartModal isOpen={showCart} onClose={() => setShowCart(false)} /> */}
    </>
  );
};

export default Header;
