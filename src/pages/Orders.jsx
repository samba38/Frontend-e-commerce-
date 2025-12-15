import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    api.get("/orders", { withCredentials: true })
      .then(res => setOrders(res.data.orders || []))
      .catch(() => setOrders([]));
  }, [user]);

  if (!user) return <h2>Please login to view orders</h2>;
  if (orders.length === 0) return <p>No orders found</p>;

  return (
    <div>
      <h2>Your Orders</h2>

      {orders.map(order => (
        <div key={order._id}>
          <p>Order ID: {order._id}</p>
          <p>Total: ₹{order.totalPrice}</p>

          {/* ✅ VIEW DETAILS */}
          <Link to={`/orders/${order._id}`}>View Details</Link>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Orders;
