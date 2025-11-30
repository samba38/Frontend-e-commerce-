import { Link, useParams } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const { id } = useParams(); // order id from URL

  return (
    <div className="success-container">
      <h2>🎉 Order Placed Successfully!</h2>

      <p className="success-message">
        Thank you for your purchase. Your order has been placed.
      </p>

      <p className="order-id">
        <strong>Order ID:</strong> {id}
      </p>

      <Link to="/orders" className="view-orders-btn">
        View My Orders
      </Link>

      <Link to="/" className="back-home-btn">
        Back to Home
      </Link>
    </div>
  );
};

export default OrderSuccess;
