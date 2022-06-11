// SETUP FIREBASE
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJiKTLaW2YxnbgAb7YJq_Im4MmGOE8mJE",
  authDomain: "new-enig-db.firebaseapp.com",
  projectId: "new-enig-db",
  storageBucket: "new-enig-db.appspot.com",
  messagingSenderId: "58728621280",
  appId: "1:58728621280:web:ce8d9362c8e04eed27dc85",
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);

// GOOGLE AUTH PROVIDER
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider); //using googlePopUp
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider); // using login redirect 

// FIRESTORE DB
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {} ) => {
  // if didnt get userAuth 
  if(!userAuth) return;

  // doc take 3 arguments, db, collection: 'users' and uniq id
  // uid is taken from console info after using google auth
  // this function will called if user login with google auth to give the data from firestore
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  // specific object data
  // getting data from firestore from `doc`
  // can also allow to access the data from firestore database
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation // spread the additionalInformation
      });
    } catch (error) {
      console.log("error creating error", error.message);
    }

    return userDocRef;
  }

  //if user data exists
  // create/ set the document with the data from userAuth in collection

  // if user data not exists

  //return data userDocRef
};

// CREATE USER WITH EMAIL AND PASSWORD 
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  // if email and password doesn't exist dont call this method
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
}
// SIGN IN WITH EMAIL AND PASSOWORD
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  // if email and password doesn't exist dont call this method
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password)
}
