// src/api/search.js
import axios from "axios";

export const fetchSearchResults = async (query, page = 1) => {
  try {
    const response = await axios.get("https://api.searchspring.net/api/search/search.json", {
      params: {
        siteId: "scmq7n",
        q: query ? query :"",
        resultsFormat: "native",
        page: page,
      },
    });

    return {
      results: response.data.results,
      totalPages: response.data.pagination.totalPages || 1,
      error: null,
    };
  } catch (err) {
    console.error("Search API error:", err);
    return {
      results: [],
      totalPages: 1,
      error: "Something went wrong while fetching products.",
    };
  }
};
