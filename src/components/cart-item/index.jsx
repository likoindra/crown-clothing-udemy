import React from "react";
import {
  CartItemContainer,
  Image,
  ItemDetail,
  Name,
} from "./cart-item.styles.jsx";
const CartItem = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;

  return (
    <CartItemContainer>
      <Image src={imageUrl} alt={`${name}`} />
      <ItemDetail>
        <Name className="name">{name}</Name>
        <Name className="price">
          {quantity} x {price}
        </Name>
      </ItemDetail>
    </CartItemContainer>
  );
};

export default CartItem;
