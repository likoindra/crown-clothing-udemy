import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./cart-icon.styles.jsx";
import {
  ShoppingIcon,
  CartItemContainer,
  ItemCount,
} from "./cart-icon.styles.jsx";
// import { CartContext } from "../../contexts/cartContext";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
// import { ReactComponent as ShoppingIcon } from "../../assets/svg/shopping-bag.svg";

const CartIcon = () => {
  // memanggil value dari CartContext
  // cartCount berada pada CartContext yang dimana sudah ada function untuk meng-update total dari cart item
  // const { isCartOpen , setIsCartOpen, cartCount } = useContext(CartContext);

  // CHANGE ACTION FROM USING USE CONTEXT TO REDUX
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  // function toggle untuk trigger cart dropdown
  const toggleIsOpen = () => dispatch(setIsCartOpen(!isCartOpen));
  
  return (
    <CartItemContainer onClick={toggleIsOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartItemContainer>
  );
};

export default CartIcon;
