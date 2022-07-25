import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import CartIcon from "../../components/cart-icon";
import CardDropdown from "../../components/cart-dropdown";
import { ReactComponent as CrownLogo } from "../../assets/svg/crown.svg";
import { UserContext } from "../../contexts/userContext";
import { CartContext } from "../../contexts/cartContext";
import { signOutUser } from "../../utils/firebase/firebase-utils";
// import { useNavigate } from "react-router";
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";

const Navigation = () => {
  // after set the current user value from sign in using user context, then call the value it self to Navigation page
  const { currentUser } = useContext(UserContext);

  // memanggil value dari CartProvider pada Context
  const { isCartOpen } = useContext(CartContext);

  // console.log(currentUser, 'cek current user')
  // const navigate = useNavigate()
  // const signOutHandler = async () => {
  //   await signOutUser();
  //   setCurrentUser(null);
  // }
  // make the current user to null to make the sign out function

  // if(currentUser) {
  //   navigate('/')
  // }

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CardDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
