import { useEffect, useRef } from "react";

function SearchBar({ query, setQuery, onSearch }) {
  const timeoutRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Debounce logic
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (value.trim()) {
        onSearch(); // Debounced auto-search
      }
    }, 500);
  };

  const handleClick = () => {
    // Trigger search immediately when button is clicked
    if (query.trim()) {
      onSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search products..."
      />
      <button className="search" onClick={handleClick}>Search</button>
    </div>
  );
}

export default SearchBar;
