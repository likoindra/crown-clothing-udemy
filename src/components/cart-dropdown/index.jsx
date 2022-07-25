import React, { useContext } from "react";
import { CartDropdownContainer, EmptyMessage, CartItems } from "./cart-dropdown.styles.jsx";
import ButtonComponent from "../button/index";
import { CartContext } from "../../contexts/cartContext";
import CartItem from "../cart-item";
import { useNavigate } from "react-router";

const CardDropdown = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const checkoutHandler = () => {
    navigate("/checkout");
  };
  return (
    <CartDropdownContainer>
      <CartItems>
        {/* map data dari database dan mengirim data pada CartItem component */}
        {cartItems.length ? (
          cartItems.map((item) => <CartItem cartItem={item} key={item.id} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
        {/* // {cartItems.map((item) => (
        //   <CartItem cartItem={item} key={item.id} />
        // ))} */}
      </CartItems>
      <ButtonComponent onClick={checkoutHandler}>Checkout</ButtonComponent>
    </CartDropdownContainer>
  );
};

export default CardDropdown;
