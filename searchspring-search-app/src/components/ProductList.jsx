import ProductCard from "./ProductCard";

function ProductList({ products, loading, error }) {
  if (error) return <p className="center error">{error}</p>;
  if (!loading && products.length === 0) return <p className="center">No results found.</p>;

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
            <ProductCard key={product.id} product={product} />
          ))}
    </div>
  );
}

export default ProductList;
