import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart", { withCredentials: true });
      setCart(res.data.items || []);
    } catch {
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const res = await api.post("/orders", {}, { withCredentials: true });
      navigate(`/order-success/${res.data.orderId}`);
    } catch (err) {
      alert("Order failed");
    }
  };

  if (loading) return <h2>Loading checkout...</h2>;
  if (cart.length === 0) return <h2>Your cart is empty</h2>;

  const total = cart.reduce(
    (sum, item) => sum + item.qty * item.product.price,
    0
  );

  return (
    <div>
      <h2>Checkout</h2>

      {cart.map(item => (
        <div key={item._id}>
          <p>{item.product.name}</p>
          <p>Qty: {item.qty}</p>
          <p>₹{item.qty * item.product.price}</p>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      <button onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
