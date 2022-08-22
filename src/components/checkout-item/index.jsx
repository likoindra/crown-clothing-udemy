import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, clearItemFromCart, removeItemFromCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
// import { CartContext } from "../../contexts/cartContext";
import {CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton} from "./checkout-item.styles.jsx";

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { name, imageUrl, price, quantity } = cartItem;
  // const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

  const cartItems = useSelector(selectCartItems)
  //   function clear item from cart
  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity className="quantity">
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value >{quantity}</Value>
        <Arrow className="arrow" onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan className="price">{price}</BaseSpan>
      <RemoveButton className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
