import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      {/* Product Image */}
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="product-img" />
      </Link>

      {/* Product Info */}
      <div className="product-info">
        <h3>{product.name}</h3>

        <p className="price">₹{product.price}</p>

        <Link to={`/product/${product._id}`} className="view-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
