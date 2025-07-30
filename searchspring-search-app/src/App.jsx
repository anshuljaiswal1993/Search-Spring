import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";
import { fetchSearchResults } from "./api/search";
import ThemeToggle from "./components/ToggleTheme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("light");
  const [cart, setCart] = useState([]);
  const [sort, setSort] = useState(""); 

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const getData = async (q = query, p = page) => {
    setLoading(true);
    const { results, totalPages, error } = await fetchSearchResults(q, p);
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
  const defaultQuery = ""; 
  setQuery(defaultQuery);
  setSort("");
  setPage(1);
  getData(defaultQuery, 1); 
};


  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) return prevCart;
      return [...prevCart, product];
    });
  };

  const handleShopNow = (title) => {
    setQuery(title);
    setPage(1);
    getData(title, 1);
  };

  const getSortedResults = () => {
    const sorted = [...results];
    if (sort === "price_asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sort === "price_desc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sort === "newest") {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date)); 
    }
    return sorted;
  };

  const sortedResults = getSortedResults();

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />

      <div className="container">
        <ThemeToggle />

        {/* Search Left | Pagination Right */}
        <div className="top-bar">
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
            onReset={handleReset}
            sort={sort}
            setSort={setSort}
          />

          {results.length > 0 && (
            <div className="pagination-right">
              <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            </div>
          )}
        </div>

        <Home onShopNow={handleShopNow} />

        <ProductList
          products={sortedResults}
          loading={loading}
          error={error}
          onAddToCart={handleAddToCart}
        />

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
