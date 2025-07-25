import { FaCartPlus } from "react-icons/fa";
import { useState } from "react";

function ProductCard({ product , onAddToCart  }) {


    const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  return (
    <div className="product-card">
      <div className="image-container">
        <img
          className="product-image"
          src={product.thumbnailImageUrl}
          alt={product.name}
          loading="lazy"
        />
        {product.msrp > product.price && (
          <div className="badge">Sale</div>
        )}
      </div>
      <div className="product-name" title={product.name}>
        {product.name}
      </div>
      <div className="product-price">
        <span className="price">${product.price}</span>
        {product.msrp > product.price && (
          <span className="msrp">${product.msrp}</span>
        )}
 <div className="quantity-controls">
        <button onClick={decreaseQty}>−</button>
        <span>{quantity}</span>
        <button onClick={increaseQty}>+</button>
      </div>
        <button
        className="add-to-cart-btn"
        onClick={() => onAddToCart(product)}
      >
        <FaCartPlus /> Add to Cart
      </button>
      </div>
    </div>
  );
}

export default ProductCard;
