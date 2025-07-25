function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="pagination">
      <button
        disabled={page <= 1}
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      >
        Prev
      </button>

      <span style={{ margin: "0 10px" }}>Page {page} of {totalPages}</span>

      <button
        disabled={page >= totalPages}
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
