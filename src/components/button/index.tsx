import { FC, ButtonHTMLAttributes } from "react";
import { BaseButton,InvertedButton,GoogleSignInButton,ButtonSpinner } from "./button-styles";

// changing const to `enum` to make it global use 
export enum BUTTON_TYPE_CLASSES  {
  base = "base",
  google = "google-sign-in",
  inverted = "inverted",
};

// button type value by default is BaseButton
// getButton refers to `BaseButton` and define as typeof BaseButton 
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
  }[buttonType]);

// Define ButtonProps Button 
export type ButtonProps = {
  // making buttonType as optional , as default button refers to BaseButton from `getButton` 
  buttonType?: BUTTON_TYPE_CLASSES;
  isLoading?: boolean;

  // Extending the type with ButtonHTMLAttributes
} & ButtonHTMLAttributes<HTMLButtonElement>;

// FC  : Functional Components 
// Define the Button Components as Functional Components and passing the `ButtonProps` type 
const ButtonComponent: FC<ButtonProps> = ({ children, isLoading, buttonType, ...otherProps }) => {
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
