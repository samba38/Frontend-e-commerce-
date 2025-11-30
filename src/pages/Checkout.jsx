import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Checkout.css";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Check login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch cart items
  const fetchCart = async () => {
    try {
      const res = await api.get("/cart", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setCart(res.data.items);
      setTotal(res.data.totalPrice);
    } catch (err) {
      console.log("Cart load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Place order
  const handlePlaceOrder = async () => {
    try {
      const res = await api.post(
        "/orders",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      navigate(`/order-success/${res.data.orderId}`);
    } catch (err) {
      console.error("Order failed:", err);
      alert("Order failed. Try again.");
    }
  };

  if (loading) return <h2 className="loading">Loading checkout...</h2>;

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-box">
        <h3>Order Summary</h3>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="checkout-items">
              {cart.map((item) => (
                <li key={item._id} className="checkout-item">
                  <img src={item.product.image} alt="" />
                  <div>
                    <p className="name">{item.product.name}</p>
                    <p>Size: {item.size}</p>
                    <p>Qty: {item.qty}</p>
                  </div>
                  <p className="price">₹{item.product.price * item.qty}</p>
                </li>
              ))}
            </ul>

            <h3 className="total">Total: ₹{total}</h3>

            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
