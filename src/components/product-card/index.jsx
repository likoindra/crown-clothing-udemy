import React,{ useContext} from "react";
import ButtonComponent from "../button";
import "./product-card.styles.scss";
import { CartContext } from "../../contexts/cartContext";

const ProductCard = ({ product }) => {
  // destructur key dari product, pilih mana yang di butuhkan untuk ditampilkan pada component ini
  const { name, price, imageUrl } = product;

  // memanggil function dari CartContext yang akan di gunakan pada button 
  const { addItemToCart } = useContext(CartContext);

  // function  add product ke dalam cart
  const addProductToCart = () => addItemToCart(product)

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <ButtonComponent buttonType="inverted" onClick={addProductToCart}>Add To Cart</ButtonComponent>
    </div> 
  );
};

export default ProductCard;
