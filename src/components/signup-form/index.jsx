import React, { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase-utils";
import ButtonComponent from "../button";
import FormInputComponent from "../form-input";
import "./sign-up-form.styles.scss";

const defaultFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export default function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // calling the function from UserContext 
  // const { setCurrentUser } = useContext(UserContext)

  const resetFormFields = () => {
    // using default form fields to reset after sign up 
    setFormFields(defaultFields)
  }

  const handleChange = (event) => {
    const { name, value  }  = event.target;
    setFormFields({
        ...formFields,
        [name] : value
    })
  } 

  const handleSubmit = async (event) => {
    event.preventDefault();
    // checking the password and confim password 
    if(password !== confirmPassword) {
        alert('password do not match');
        return;
    }
    try {
        const { user } = await createAuthUserWithEmailAndPassword(email, password);
        // after user sign up it will store the data user to userContext 
        // setCurrentUser(user)
        // check the response first 
        // console.log(user)

        // call the function createUserDocumentFromAuth
        await createUserDocumentFromAuth(user, { displayName });

        // if success 
        // call the reset form fields after success create user
        resetFormFields();
    } catch (error) {
        if(error.code === 'auth/email-already-in-use') {
            alert('Cannot create user email already in use ')
        } else {
            console.log('user created encountered an error', error);
        }
    }
  }
  return (
    <div className="sign-up-container">
      <h2>Don't have an account ? </h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInputComponent label="Display Name" type="text" required name="displayName" value={ displayName } onChange={ handleChange }/>
        <FormInputComponent label="Email" type="email" required name="email" value={ email } onChange={ handleChange }/>
        <FormInputComponent label="Password" type="password" required name="password" value={ password } onChange={ handleChange }/>
        <FormInputComponent label="Confirm Password" type="password" required name="confirmPassword" value={ confirmPassword } onChange={ handleChange }/> 
        <ButtonComponent type="submit">Sign Up</ButtonComponent>
      </form>
    </div>
  );
}
