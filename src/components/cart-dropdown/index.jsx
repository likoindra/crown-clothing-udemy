import React , { useContext }from "react";
import "./cart-dropdown.styles.scss";
import ButtonComponent from "../button/index";
import { CartContext } from "../../contexts/cartContext";
import CartItem from "../cart-item";

const CardDropdown = () => {
  const { cartItems } = useContext(CartContext)
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {/* map data dari database dan mengirim data pada CartItem component */}
        { cartItems.map((item) => <CartItem cartItem={ item } key={item.id}/>) }
      </div>
      <ButtonComponent>Checkout</ButtonComponent>
    </div>
  );
};

export default CardDropdown;
