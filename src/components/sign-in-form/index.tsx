 import { useState, FormEvent, ChangeEvent } from "react";
// eslint-disable-next-line no-unused-vars
// import { createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase-utils";
import ButtonComponent, { BUTTON_TYPE_CLASSES } from "../button";
import FormInputComponent from "../form-input";
import {SignInContainer , ButtonContainer} from "./sign-in-form.styles";
import { useDispatch } from 'react-redux';
import { googleSignInStart,emailSignInStart } from "../../store/user/user.action";
import { useNavigate } from "react-router";

const defaultFields = {
  email: "",
  password: "",
};


export default function SignInForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFields);
  const { email, password } = formFields;

// callout the userContext
    // const { setCurrentUser } = useContext(UserContext)

  const resetFormFields = () => {
    // using default form fields to reset after sign up 
    setFormFields(defaultFields)
  }

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());

    // await signInWithGooglePopup();
    
    // setCurrentUser(user);
    // createUserDocumentFromAuth(user); // this function goes to userContext

    // called to check the preferences user object after login
    // const userDocRef = await createUserDocumentFromAuth(user);
    // navigate('/')
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value  }  = event.target;
    setFormFields({...formFields,[name] : value})
  } 

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    try {
         dispatch(emailSignInStart(email, password))
        // await signInAuthUserWithEmailAndPassword(email,password);
        // call the setCurrentUser for udpate the data using userContext.Provider 
        //  it means take the value of setCurrentUser
        // it will send the value to Navigation page 
        // setCurrentUser(user);

        // console.log(user, 'cek res')
        resetFormFields();
        // navigate('/');
    } catch (error) {
        console.log('user sign in failed', error)
        // switch(error.code) {
        // case 'auth/wrong-password':
        //   alert('Incorrect password or email');
        // break;
        // case 'auth/user-not-found':
        //   alert('no use asociated with this email')
        // break;
        // default: 
        // console.log(error);
        // }
        // if(error.code === 'auth/user-not-found') {
        //     alert('Incorrect password for email')
        // } else if () {

        // }
        // indicate the error from login with email and password
        // console.log(error);
    }
  }
  return (
    <SignInContainer>
      <h2>Already have an account ? </h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={(e) => handleSubmit}>
        <FormInputComponent label="Email" type="email" required name="email" value={ email } onChange={ handleChange }/>
        <FormInputComponent label="Password" type="password" required name="password" value={ password } onChange={ handleChange }/>
        <ButtonContainer>
            <ButtonComponent type="submit">Sign In</ButtonComponent>
            <ButtonComponent buttonType={BUTTON_TYPE_CLASSES.google} type="button" onClick={signInWithGoogle}>Google Sign In</ButtonComponent>
        </ButtonContainer>
      </form>
    </SignInContainer>
  );
}
