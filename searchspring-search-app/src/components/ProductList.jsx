import ProductCard from "./ProductCard";

function ProductList({ products, loading, error,onAddToCart  }) {
  if (error) return <p className="center error">{error}</p>;
  if (products.length === 0) {
    return (
      <div className="no-results-wrapper">
        <div className="no-results">
          😕 No results found. Try a different keyword!
        </div>
      </div>
    );
  }

  return (
    <div className="product-list">
      {loading
        ? Array(24)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="product-card skeleton-card">
                     <div className="skeleton-image"></div>
                    <div className="skeleton-text short"></div>
                    <div className="skeleton-text long"></div>
                </div>
            ))
        : products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart}/>
          ))}
    </div>
  );
}

export default ProductList;
