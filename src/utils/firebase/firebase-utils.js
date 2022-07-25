// SETUP FIREBASE
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query , getDocs } from "firebase/firestore";

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

// MEMBUAT COLLECTION BARU PADA FIRESTORE 
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  // fucntion ini menerima db yaitu egtFireStore() untuk akses pada firestore dan key dari collection tsb yaitu `collectionKey`
  const collectionRef = collection(db, collectionKey);

  // menampung semua object yang akan dibuat dalam collection baru
  // writeBatch akan mengembalikan data firestore untuk di consume pada sisi frontend 
  const batch = writeBatch(db);

  // object pada function ini adalah data yang ada pada array di dalam `shop-data.js`
  objectsToAdd.forEach((object) => {
    // docRef menerima 2 argumen yaitu collectionRef yang berisi `db , collectionkey` dan 'key value' pada objectToAdd
    //  firebase akan selalu memberikan docRef meskipun tidak ada / belum di buat 
    const docRef = doc(collectionRef , object.title.toLowerCase());

    // set docRef pada firebase menggunakan method `batch` 
    // set db docRef dengan value dari `objct` yang sudah ada dari `objectToAdd`
    batch.set(docRef, object);
  });

  // function ini menunggu apakah `bath.set()` sudah mengirim data ke `db` atau belum
  await batch.commit();
  console.log('done')
}

// MENGAMBIL DATA PADA FIRESTORE 
export const getCategoriesAndDocuments = async () => {
  // menerima parameter 'categories' dari database yang sudah di buat sebelumnya 
  const collectionRef = collection(db, 'categories');

  // membuat query dari function collectionRef 
  const q = query(collectionRef);

  // fetch data firestore menggunakan `getDocs()` function yang berisi query dari collectionRef
  const querySnapshot = await getDocs(q);
  
  //mengakses docoment yang berbeda pada db firestore 
  // reduce data array untuk mendapatkan hasil akhirnya yaitu object di dalamnya 
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const {title , items} = docSnapshot.data();

    // `acc` pada title value disamakan dengan `items` pada array
    acc[title.toLowerCase()] = items;

    // 
    return acc; 
  }, {});

  return categoryMap;
} 

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

// SIGN OUT USER 
export const signOutUser = async () => await signOut(auth);

// onAuthStateChanged
// it will call as callback whenever the auth state changed
// it will run like login logout , 
export const onAuthStateChangedListener = async (callback) =>  
onAuthStateChanged(auth, callback);
