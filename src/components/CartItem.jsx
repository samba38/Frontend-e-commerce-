// src/components/CartItem.jsx
import "./CartItem.css";

const CartItem = ({ item, updateQty, removeItem }) => {
  const imageSrc =
    item?.product?.imageURL || item?.product?.image || "/no-image.png";

  return (
    <div className="cart-item">
      <img
        src={imageSrc}
        alt={item?.product?.name}
        className="cart-item-img"
      />

      <div className="cart-item-info">
        <h3>{item.product.name}</h3>
        <p>Size: {item.size}</p>
        <p>Price: ₹{item.product.price}</p>

        <div className="qty-controls">
          <button
            onClick={() =>
              item.qty > 1 && updateQty(item._id, item.qty - 1)
            }
          >
            -
          </button>

          <span>{item.qty}</span>

          <button onClick={() => updateQty(item._id, item.qty + 1)}>
            +
          </button>
        </div>

        <button className="remove-btn" onClick={() => removeItem(item._id)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
