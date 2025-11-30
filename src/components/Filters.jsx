import './Filters.css'

const Filters = ({
  search,
  setSearch,
  category,
  setCategory,
  size,
  setSize,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  setPage,
}) => {

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSize("");
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
  };

  return (
    <div className="filters-container">

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setPage(1);
        }}
      >
        <option value="All">All Categories</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Kids">Kids</option>
      </select>

      <select
        value={size}
        onChange={(e) => {
          setSize(e.target.value);
          setPage(1);
        }}
      >
        <option value="">Size</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>

      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => {
          setMinPrice(e.target.value);
          setPage(1);
        }}
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => {
          setMaxPrice(e.target.value);
          setPage(1);
        }}
      />

      <button className="reset-btn" onClick={resetFilters}>
        Reset
      </button>

    </div>
  );
};

export default Filters;