import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import CartItem from "../components/CartItem";

const Cart = () => {
  const { user } = useAuth();
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
    if (user) fetchCart();
  }, [user]);

  if (!user) return <h2>Please login to view your cart</h2>;
  if (loading) return <h2>Loading...</h2>;
  if (cart.length === 0) return <h2>Your cart is empty</h2>;

  const total = cart.reduce(
    (sum, item) => sum + item.qty * item.product.price,
    0
  );

  return (
    <div>
      <h2>Your Cart</h2>

      {cart.map(item => (
        <CartItem
          key={item._id}
          item={item}
          updateQty={(id, qty) =>
            api.put("/cart/update", { itemId: id, qty }, { withCredentials: true })
              .then(fetchCart)
          }
          removeItem={(id) =>
            api.delete("/cart/remove", {
              data: { itemId: id },
              withCredentials: true,
            }).then(fetchCart)
          }
        />
      ))}

      <h3>Total: ₹{total}</h3>

      {/* ✅ CHECKOUT BUTTON */}
      <button onClick={() => navigate("/checkout")}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
