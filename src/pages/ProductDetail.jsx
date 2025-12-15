// src/pages/ProductDetail.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch product details
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      setError("Product not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // ✅ Add to Cart (CORRECT FLOW)
  const handleAddToCart = async () => {
  if (!isAuthenticated) {
    alert("Please login to add items to cart");
    navigate("/login");
    return;
  }

  if (!size) {
    alert("Please select a size");
    return;
  }

  try {
    await api.post("/cart/add", {
      productId: product._id,
      size,
      qty,
    });

    alert("Added to cart");
    navigate("/cart");
  } catch (err) {
    alert("Failed to add item");
  }
};

  // UI states
  if (loading) return <h2 className="loading">Loading...</h2>;
  if (error) return <h2 className="error">{error}</h2>;
  if (!product) return null;

  return (
    <div className="product-detail-container">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="price">₹{product.price}</p>
        <p>{product.description}</p>

        {/* Size Selection */}
        <div className="sizes">
          <label>Select Size:</label>
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="">Select</option>
            {product.sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div className="quantity">
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />
        </div>

        {/* Add to Cart Button */}
        <button className="add-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
