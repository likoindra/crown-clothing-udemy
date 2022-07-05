import React, { useContext } from "react";
import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/svg/shopping-bag.svg";
import { CartContext } from "../../contexts/cartContext";

const CartIcon = () => {
  // memanggil value dari CartContext
  const { isCartOpen , setIsCartOpen } = useContext(CartContext);

  // function toggle untuk trigger cart dropdown 
  const toggleIsOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" onClick={toggleIsOpen}/>
      <span className="item-count">10</span>
    </div>
  );
};

export default CartIcon;
