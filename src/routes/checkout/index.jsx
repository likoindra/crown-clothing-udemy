import React, { useContext } from "react";
import "./checkout.styles.scss";
import { CartContext } from "../../contexts/cartContext";
import CheckoutItem from "../../components/checkout-item";

const Checkout = () => {
  // memanggil value dari cartContext
  //   function `addItemToCart` pada cartContext akan digunakan untuk menambah item pada page checkout
  // eslint-disable-next-line no-unused-vars
  const { cartItems, cartTotal, addItemToCart, removeItemFromCart } = useContext(CartContext);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <span className="total">Total: {cartTotal}</span>
    </div>
  );
};

export default Checkout;
