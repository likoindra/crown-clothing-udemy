import React from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase-utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const {user } = await signInWithGooglePopup();

    // called to check the preferebces user object after login
   const userDocRef  = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>Sign in with google pop up</h1>
      <button onClick={logGoogleUser}>Sign In</button>
    </div>
  );
};

export default SignIn;
