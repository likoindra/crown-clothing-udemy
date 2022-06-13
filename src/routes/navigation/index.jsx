import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/svg/crown.svg";
import { UserContext } from "../../context/userContext";
import { signOutUser } from "../../utils/firebase/firebase-utils";
import "./navigation.styles.scss";

const Navigation = () => {
  // after set the current user value from sign in using user context, then call the value it self to Navigation page 
  const { currentUser  } = useContext(UserContext);
  // console.log(currentUser, 'cek current user')

  // const signOutHandler = async () => {
  //   await signOutUser();
  //   setCurrentUser(null); 
  // }
  // make the current user to null to make the sign out function
  
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
          {
            currentUser ? (
              <span className="nav-links" onClick={signOutUser}>
                SIGN OUT 
              </span>
            ) : (
              <Link className="nav-link" to="/auth">
                SIGN IN
              </Link>
            )
          }
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
