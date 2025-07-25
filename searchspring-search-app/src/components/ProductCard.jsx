import { FaCartPlus } from "react-icons/fa";

function ProductCard({ product , onAddToCart  }) {
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

        <button
        className="add-to-cart-btn"
        onClick={() => onAddToCart(product)}
      >
        <FaCartPlus />
      </button>
      </div>
    </div>
  );
}

export default ProductCard;
