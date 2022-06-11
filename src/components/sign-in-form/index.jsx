import React, { useState } from "react";
import { createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase-utils";
import ButtonComponent from "../button";
import FormInputComponent from "../form-input";
import "./sign-in-form.styles.scss";

const defaultFields = {
  email: "",
  password: "",
};
export default function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    // using default form fields to reset after sign up 
    setFormFields(defaultFields)
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
    // called to check the preferebces user object after login
    // const userDocRef = await createUserDocumentFromAuth(user);
  };

  const handleChange = (event) => {
    const { name, value  }  = event.target;
    setFormFields({
        ...formFields,
        [name] : value
    })
  } 

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
        const response = await signInAuthUserWithEmailAndPassword(email,password);
        console.log(response, 'cek res')
        resetFormFields();
    } catch (error) {
        switch(error.code) {
        case 'auth/wrong-password':
            alert('Incorrect password for email');
        break;
        case 'auth/user-not-found':
            alert('no use asociated with this email')
        break;
        default: 
        console.log(error);
        }
        // if(error.code === 'auth/user-not-found') {
        //     alert('Incorrect password for email')
        // } else if () {

        // }
        // indicate the error from login with email and password
        console.log(error )
    }
  }
  return (
    <div className="sign-up-container">
      <h2>Already have an account ? </h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInputComponent label="Email" type="email" required name="email" value={ email } onChange={ handleChange }/>
        <FormInputComponent label="Password" type="password" required name="password" value={ password } onChange={ handleChange }/>
        <div className="buttons-container">
            <ButtonComponent type="submit">Sign In</ButtonComponent>
            <ButtonComponent buttonType="google" type="button" onClick={signInWithGoogle}>Google Sign In</ButtonComponent>
        </div>
      </form>
    </div>
  );
}
