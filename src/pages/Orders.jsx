import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders", {
        withCredentials: true, // include cookie
      });
      setOrders(res.data.orders);
    } catch (error) {
      console.log("Orders fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h2 className="orders-title">Your Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <h3>Order ID: {order._id}</h3>
               <ul>
                {order.items.map((item) => (
                  <li key={item._id} className="order-item-row">
                    <img
                      src={item.product?.image}
                      alt={item.name}
                      className="order-img"
                    />
                  </li>
                ))}
              </ul>
              <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              <p>Total: ₹{order.totalPrice}</p>

              <h4>Items:</h4>
              <ul>
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.name} ({item.size}) × {item.qty}
                  </li>
                ))}
              </ul>

              <Link to={`/orders/${order._id}`} className="details-btn">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
