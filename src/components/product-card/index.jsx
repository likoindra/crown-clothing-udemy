import React from "react";
import ButtonComponent from "../button";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  // destructur key dari product, pilih mana yang di butuhkan untuk ditampilkan pada component ini
  const { name, price, imageUrl } = product;
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <ButtonComponent buttonType="inverted">Add To Cart</ButtonComponent>
    </div> 
  );
};

export default ProductCard;
