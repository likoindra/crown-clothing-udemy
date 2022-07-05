import React from "react";
import SignUpForm from "../../components/signup-form";
import './authentication.styles.scss';
import SignInForm from "../../components/sign-in-form";

const Authentication = () => {
  // call the function once
  // Login sideeffect to get data if using login with redirect , it will load the not just reload the page but getting the user data from db
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await getRedirectResult(auth);
  //     if (response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //       console.log(userDocRef)
  //     }
  //   };
  //   fetchData().catch(console.error);
  // }, []);

  // const logGoogleUser = async () => {
  //   const { user } = await signInWithGooglePopup();

  //   // called to check the preferebces user object after login
  //   const userDocRef = await createUserDocumentFromAuth(user);
  // };

  // const logGoogleRedirectUser = async () => {
  //   const { user } = await signInWithGoogleRedirect();
  //   console.log(user)
  // };
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
