import { useEffect, useState } from "react";
import api from "../services/api";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import "./Products.css";
const Products=()=>{
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;
  useEffect(() => {
    const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get("/products", {
        params: {
          search,
          category,
          size,
          minPrice,
          maxPrice,
          page,
          limit,
        },
      });

      setProducts(res.data.products);
      setTotal(res.data.total);
      
    } catch (error) {
      console.log("Products loading error:", error);
    }finally {
        setLoading(false);
      }
  };
    fetchProducts();
    
  }, [search, category, size, minPrice, maxPrice, page]);
    const totalPages = Math.ceil(total / limit);
    return (
        <div>
            <h2 className="title">Products</h2>
            <Filters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        size={size}
        setSize={setSize}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        setPage={setPage}
      />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
            )}
        <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
            
        </div>
    )
}

export default Products