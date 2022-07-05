import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import CartIcon from "../../components/cart-icon";
import CardDropdown from "../../components/cart-dropdown";
import { ReactComponent as CrownLogo } from "../../assets/svg/crown.svg";
import { UserContext } from "../../contexts/userContext";
import { CartContext } from "../../contexts/cartContext";
import { signOutUser } from "../../utils/firebase/firebase-utils";
// import { useNavigate } from "react-router";
import "./navigation.styles.scss";

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
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {/* check the current user  */}
          {currentUser ? (
            <span className="nav-links" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>

        {/*  memebrikan kondisi pada dropdown */}
        {isCartOpen && <CardDropdown />}

        {/*  memebrikan kondisi pada dropdown */}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
