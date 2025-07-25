import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";
import { fetchSearchResults } from "./api/search";
import ThemeToggle from "./components/ToggleTheme";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("light");
  const [cart, setCart] = useState([]);


  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const getData = async () => {
    setLoading(true);
    const { results, totalPages, error } = await fetchSearchResults(query, page);

    setResults(results);
    setTotalPages(totalPages);
    setError(error || "");
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [page]);

  const handleSearch = () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setPage(1);
    getData();
  };

  const handleReset = () => {
    setQuery("");
    setResults([]);
    setError("");
    setPage(1);
    getData();
  };

  const handleAddToCart = (product) => {
  setCart((prevCart) => {
    // Check if item is already in cart
    const exists = prevCart.find(item => item.id === product.id);
    if (exists) return prevCart;
    return [...prevCart, product];
  });
};


  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />

      <div className="container">
        <ThemeToggle />

        {/* Search Left | Pagination Right */}
        <div className="top-bar">
          <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} onReset={handleReset} />
          {results.length > 0 && (
            <div className="pagination-right">
              <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            </div>
          )}
        </div>

        <ProductList products={results} loading={loading} error={error}  onAddToCart={handleAddToCart}/>

        {results.length > 0 && (
          <div className="pagination-bottom">
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default App;
