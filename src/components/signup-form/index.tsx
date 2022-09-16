import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";
// import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase-utils";
import ButtonComponent from "../button";
import FormInputComponent from "../form-input";
import { SignUpContainer }from "./sign-up-form.styles";
import { useNavigate } from 'react-router-dom';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

const defaultFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export default function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // calling the function from UserContext 
  // const { setCurrentUser } = useContext(UserContext)

  const resetFormFields = () => {
    // using default form fields to reset after sign up 
    setFormFields(defaultFields)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value  }  = event.target;
    setFormFields({
        ...formFields,
        [name] : value
    })
  } 

  const handleSubmit = async (event: FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    // checking the password and confim password 
    if(password !== confirmPassword) {
        alert('password do not match');
        return;
    }
    try {
        //  dispatch function signUpStart from user.action
        dispatch(signUpStart(email, password, displayName ))
        // const { user } = await createAuthUserWithEmailAndPassword(email, password);
        // after user sign up it will store the data user to userContext 
        // setCurrentUser(user)
        // check the response first 
        // console.log(user)

        // call the function createUserDocumentFromAuth
        // await createUserDocumentFromAuth(user, { displayName });

        // if success 
        // call the reset form fields after success create user
        resetFormFields();
        // navigate('/')
    } catch (error) {
        if((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
            alert('Cannot create user email already in use ')
        } else {
          console.log('user created encountered an error', error);
        }
    }
  }
  return (
    <SignUpContainer>
      <h2>Don't have an account ? </h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={(e) => handleSubmit}>
        <FormInputComponent label="Display Name" type="text" required name="displayName" value={ displayName } onChange={ handleChange }/>
        <FormInputComponent label="Email" type="email" required name="email" value={ email } onChange={ handleChange }/>
        <FormInputComponent label="Password" type="password" required name="password" value={ password } onChange={ handleChange }/>
        <FormInputComponent label="Confirm Password" type="password" required name="confirmPassword" value={ confirmPassword } onChange={ handleChange }/> 
        <ButtonComponent type="submit">Sign Up</ButtonComponent>
      </form>
    </SignUpContainer>
  );
}
