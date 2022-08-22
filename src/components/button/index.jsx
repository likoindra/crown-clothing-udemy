import React from "react";
import "./button-styles.jsx";
import {
  BaseButton,
  InvertedButton,
  GoogleSignInButton,
  ButtonSpinner,
} from "./button-styles.jsx";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

// button type value by default is BaseButton
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
  }[buttonType]);

const ButtonComponent = ({ children, isLoading, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton
      // className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`}
      disabled={isLoading}
      {...otherProps}
    >
      { isLoading ? <ButtonSpinner /> :  children }
    </CustomButton>
  );
};

export default ButtonComponent;
