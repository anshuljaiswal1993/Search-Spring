import { useContext, useState } from "react";
import { CartContext } from "../context/cartContext";
import { FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { cart, dispatch } = useContext(CartContext);
  const inCart = cart.find((item) => item.id === product.id);
  const quantity = inCart ? inCart.quantity : 0;

  const handleAdd = () => {
    if (!inCart) {
      dispatch({ type: "ADD_TO_CART", payload: product });
    } else {
      dispatch({ type: "INCREMENT", payload: product.id });
    }
  };

  const handleSubtract = () => {
    if (inCart && quantity > 1) {
      dispatch({ type: "DECREMENT", payload: product.id });
    } else if (inCart && quantity === 1) {
      dispatch({ type: "REMOVE_FROM_CART", payload: product.id });
    }
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>

      <div className="card-footer">
        <div className="quantity-controls">
          <button className="qty-btn" onClick={handleSubtract}>
            <FaMinus />
          </button>
          <span>{quantity}</span>
          <button className="qty-btn" onClick={handleAdd}>
            <FaPlus />
          </button>
        </div>

        <button
          className="add-to-cart"
          onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
        >
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
