import React, { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase-utils";
import SignUpForm from "../../components/signup-form";
import './sign-in.styles.scss';
const SignIn = () => {
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

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();

    // called to check the preferebces user object after login
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  // const logGoogleRedirectUser = async () => {
  //   const { user } = await signInWithGoogleRedirect();
  //   console.log(user)
  // };
  return (
    <div>
      <h1>Sign in with google pop up</h1>
      <button onClick={logGoogleUser}>Sign In Google Pop Up</button>
      <SignUpForm />
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign In With Google Redirect{" "}
      </button> */}
    </div>
  );
};

export default SignIn;
