import React, { useContext } from "react";
import "./cart-icon.styles.jsx";
// import { ReactComponent as ShoppingIcon } from "../../assets/svg/shopping-bag.svg";
import { ShoppingIcon, CartItemContainer, ItemCount } from "./cart-icon.styles.jsx";
import { CartContext } from "../../contexts/cartContext";

const CartIcon = () => {
  // memanggil value dari CartContext
  // cartCount berada pada CartContext yang dimana sudah ada function untuk meng-update total dari cart item 
  const { isCartOpen , setIsCartOpen, cartCount } = useContext(CartContext);

  // function toggle untuk trigger cart dropdown 
  const toggleIsOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartItemContainer onClick={toggleIsOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartItemContainer>
  );
};

export default CartIcon;
