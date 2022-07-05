import React from "react";
import "./cart-dropdown.styles.scss";
import ButtonComponent from "../button/index";

const CardDropdown = () => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items" />
      <ButtonComponent>
        <span>Checkout</span>
        </ButtonComponent>
    </div>
  );
};

export default CardDropdown;
