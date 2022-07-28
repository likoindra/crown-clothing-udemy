import React from "react";
import ButtonComponent, { BUTTON_TYPE_CLASSES } from "../button";
import "./product-card.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
// import { CartContext } from "../../contexts/cartContext";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  // de-structure key dari product, pilih mana yang di butuhkan untuk ditampilkan pada component ini
  const { name, price, imageUrl } = product;
 
  const cartItems = useSelector(selectCartItems)

  // memanggil function dari CartContext yang akan di gunakan pada button 
  // const { addItemToCart } = useContext(CartContext); 
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product))

  // console.log(cartItems, 'product card')
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <ButtonComponent buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add To Cart</ButtonComponent>
    </div> 
  );
};

export default ProductCard;
