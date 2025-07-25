// CartModal.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/cartContext";
import "./CartModal.css";

const CartModal = ({ onClose }) => {
  const { cart, incrementQuantity, decrementQuantity } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        <h2>Your Cart</h2>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              <img src={item.imageUrl} alt={item.title} className="cart-item-img" />
              <div className="cart-item-details">
                <p className="cart-item-title">{item.title}</p>
                <p>${item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => decrementQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQuantity(item.id)}>+</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button className="checkout-btn">Proceed to Checkout</button>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CartModal;
