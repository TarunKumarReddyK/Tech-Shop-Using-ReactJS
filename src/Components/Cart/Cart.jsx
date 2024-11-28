import React, { useEffect, useState } from 'react';
import './Cart.css'; 
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const changeQuantity = (productId, increment) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + increment) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const originalPrice = cart.reduce(
    (acc, item) => acc + item.originalPrice * item.quantity,
    0
  );
  const totalPrice = cart.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0);
  const discount = originalPrice - totalPrice;

  const handleStartShopping = () => {
    navigate('/'); 
  };
  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="empty-cart">
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <button className="btn start-shopping" onClick={handleStartShopping}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.heroImage} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.title}</h4>
                  <p className="cart-item-price">
                    ₹{item.finalPrice} x {item.quantity} = ₹
                    {(item.finalPrice * item.quantity).toLocaleString()}
                  </p>
                  <div className="cart-item-quantity">
                    <button
                      onClick={() => changeQuantity(item.id, -1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
                <FaTrashAlt
                  className="cart-item-delete"
                  onClick={() => removeFromCart(item.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Order Summary ({totalItems} items)</h3>
          <p>
            <span>Original Price</span>
            <span>₹{originalPrice.toLocaleString()}</span>
          </p>
          <p>
            <span>Discount</span>
            <span className="discount">-₹{discount.toLocaleString()}</span>
          </p>
          <p>
            <span>Total Price</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </p>
          <button className="checkout-button">Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;