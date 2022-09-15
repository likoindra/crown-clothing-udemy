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
  NextOrObserver,
  User
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query , getDocs, QueryDocumentSnapshot } from "firebase/firestore";

import { Category } from "../../store/categories/category.types";

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

// ObjectToAdd type 
export type ObjectToAdd = {
  title : string;
}

// MEMBUAT COLLECTION BARU PADA FIRESTORE 
export const addCollectionAndDocuments = async <T extends ObjectToAdd> (collectionKey: string, objectsToAdd: T[]): Promise<void> => {
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
    // set db docRef dengan value dari `object` yang sudah ada dari `objectToAdd`
    batch.set(docRef, object);
  });

  // function ini menunggu apakah `bath.set()` sudah mengirim data ke `db` atau belum
  await batch.commit();
  console.log('done')
}

// MENGAMBIL DATA PADA FIRESTORE 
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  // menerima parameter 'categories' dari database yang sudah di buat sebelumnya 
  const collectionRef = collection(db, 'categories');

  // check jika terjadi error pada get categories 
  // await Promise.reject(new Error('new error detected'))

  // membuat query dari function collectionRef 
  const q = query(collectionRef);

  // fetch data firestore menggunakan `getDocs()` function yang berisi query dari collectionRef
  const querySnapshot = await getDocs(q);

  // re-structure categoryMap function 
  // cast the value `docSnapshot.data() as Category`
  // dosSnapshot.data() will return back the same as `Category`
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category)

  
  //mengakses docoment yang berbeda pada db firestore 
  // reduce data array untuk mendapatkan hasil akhirnya yaitu object di dalamnya 
  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   const {title , items} = docSnapshot.data();

  // `acc` pada title value disamakan dengan `items` pada array
  //   acc[title.toLowerCase()] = items;
  //   return acc; 
  // }, {});

  // return categoryMap;
} 

// AdditionalInformation type 
export type AdditionalInformation = {
  displayName?: string;
};

// UserData type 
export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string
};

export const createUserDocumentFromAuth = async (userAuth: User, additionalInformation = {} as AdditionalInformation): Promise<void | QueryDocumentSnapshot<UserData>> => {
  // returning Prmoise <void>, cause the userAuth can be exist or not 
  // Promise <QueryDocumentsSnapshot> : will hold the value inside the snapshot <UserData>

  // if didnt get userAuth 
  if(!userAuth) return;

  // doc take 3 arguments, db, collection: 'users' and uniq id
  // uid is taken from console info after using google auth
  // this function will called if user login with google auth to give the data from firestore
  const userDocRef = doc(db, "users", userAuth.uid);

  // console.log(userDocRef);

  // specific object data
  // getting data from firestore from `doc`
  // can also allow to access the data from firestore database
  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  // console.log(userSnapshot.exists());

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
      console.log("error creating error", error);
    }
  }
  // return userSnapshot , because the data after creating document or user will stay in userSnapshot 
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

// CREATE USER WITH EMAIL AND PASSWORD 
export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  // if email and password doesn't exist dont call this method
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
}

// SIGN IN WITH EMAIL AND PASSWORD
export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  // if email and password doesn't exist dont call this method
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password)
}

// SIGN OUT USER 
export const signOutUser = async () => await signOut(auth);

// onAuthStateChanged
// it will call as callback whenever the auth state changed
// it will run like login logout , 
export const onAuthStateChangedListener = async (callback: NextOrObserver<User>) =>  onAuthStateChanged(auth, callback);


// check the active user that authenticated 
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      // onAuthStateChanged take `auth` object and callback 
      auth,
      (userAuth) => {
        unsubscribe();
        // if the flow success or resolve 
        resolve(userAuth); 
      },
      // if rejected or error
      reject
    )
  })
}