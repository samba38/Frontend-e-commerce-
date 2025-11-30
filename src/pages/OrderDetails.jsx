import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/orders/${id}`, {
        withCredentials: true  // IMPORTANT 🔥
      });

      setOrder(res.data.order);
    } catch (error) {
      console.error("Order fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) return <p className="loading">Loading order details...</p>;

  if (!order)
    return <p className="error">Order not found or you are not authorized.</p>;

  return (
    <div className="order-details-container">
      <h2>Order Details</h2>

      <div className="order-box">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
      </div>

      <h3>Items</h3>
      <div className="order-items">
        {order.items.map((item) => (
          <div key={item._id} className="order-item">
            <p className="item-name">{item.name}</p>
            <p>Size: {item.size}</p>
            <p>Qty: {item.qty}</p>
            <p>Price: ₹{item.price}</p>
          </div>
        ))}
      </div>

      <Link to="/orders" className="back-btn">← Back to Orders</Link>
    </div>
  );
};

export default OrderDetails;
