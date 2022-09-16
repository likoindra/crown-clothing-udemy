import { FC } from "react";
import { CartItem as TCartItem } from "../../store/cart/cart.types.js";
import {
  CartItemContainer,
  Image,
  ItemDetail,
  Name,
} from "./cart-item.styles";

// CartItemProps type 
export type CartItemProps = {
  cartItem: TCartItem;
}

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
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
