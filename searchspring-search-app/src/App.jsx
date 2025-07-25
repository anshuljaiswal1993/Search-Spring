import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";
import { fetchSearchResults } from "./api/search";

function App() {
  const [query, setQuery] = useState("jeans");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setError("Please enter a search term.");
      setResults([]);
      return;
    }

    setPage(1);
    getData();
  };

  return (
    <div className="container">
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

      {results.length > 0 && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}

      <ProductList products={results} loading={loading} error={error} />

      {results.length > 0 && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </div>
  );
}

export default App;
