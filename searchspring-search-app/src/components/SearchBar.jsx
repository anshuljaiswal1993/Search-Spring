import { useEffect, useRef } from "react";

function SearchBar({ query, setQuery, onSearch , onReset , sort, setSort  }) {
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

       <select 
       className="sort-dropdown"
       value={sort}
        onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort By: Relevance</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="newest">Newest</option>
      </select>
      <button className="search" disabled={!query.trim()} onClick={handleClick}>Search</button>

      {query && (
        <button className="reset" onClick={onReset}>
          Reset
        </button>
      )}
    </div>
  );
}

export default SearchBar;
