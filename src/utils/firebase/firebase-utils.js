// SETUP FIREBASE
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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
const firebaseApp = initializeApp(firebaseConfig);

// GOOGLE AUTH PROVIDER
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// FIRESTORE DB
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
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
