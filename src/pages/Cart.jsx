// src/pages/Cart.jsx

import { useEffect, useState } from "react";
import api from "../services/api";
import CartItem from "../components/CartItem";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's cart
  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart(res.data.items);
    } catch (error) {
      console.error("Cart load error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update quantity
  const updateQty = async (itemId, newQty) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        "/cart/update",
        { itemId, qty: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchCart();
    } catch (error) {
      console.error("Qty update error:", error);
    }
  };

  // Remove item
  const removeItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete("/cart/remove", {
        headers: { Authorization: `Bearer ${token}` },
        data: { itemId },
      });

      fetchCart();
    } catch (error) {
      console.error("Remove error:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.qty * item.product.price,
    0
  );

  if (loading) return <h2 className="cart-loading">Loading cart...</h2>;

  if (cart.length === 0)
    return <h2 className="empty-cart">Your cart is empty 😢</h2>;

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      <div className="cart-items">
        {cart.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            updateQty={updateQty}
            removeItem={removeItem}
          />
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ₹{totalPrice}</h3>
        <button
          className="checkout-btn"
          onClick={() => (window.location.href = "/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
