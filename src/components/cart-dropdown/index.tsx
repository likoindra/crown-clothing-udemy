import React from "react";
import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";
import ButtonComponent from "../button/index";
import CartItem from "../cart-item";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
// import { CartContext } from "../../contexts/cartContext";

const CardDropdown = () => {
  const navigate = useNavigate();
  // const { cartItems } = useContext(CartContext);

  // CHANGE FROM CONTEXT TO REDUX
  const cartItems = useSelector(selectCartItems);

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
