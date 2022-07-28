import React from "react";
import "./checkout.styles.jsx";
// import { CartContext } from "../../contexts/cartContext";
import { useSelector } from 'react-redux';
import CheckoutItem from "../../components/checkout-item";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector.js";
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from "./checkout.styles.jsx";

const Checkout = () => {
  // memanggil value dari cartContext
  //   function `addItemToCart` pada cartContext akan digunakan untuk menambah item pada page checkout
  // eslint-disable-next-line no-unused-vars
  // const { cartItems, cartTotal, addItemToCart, removeItemFromCart } = useContext(CartContext);

  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Total>Total: ${cartTotal}</Total>
    </CheckoutContainer>
  );
};

export default Checkout;
