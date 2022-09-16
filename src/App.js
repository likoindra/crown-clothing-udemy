import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Authentication from "./routes/authentication";
import Checkout from "./routes/checkout";
import Home from "./routes/home";
import Navigation from "./routes/navigation";
import ShopComponent from "./routes/shops";
// eslint-disable-next-line no-unused-vars
import { checkUserSession, setCurrentUser } from "./store/user/user.action"; 
import { useDispatch } from "react-redux";
// import { getCurrentUser } from "./utils/firebase/firebase-utils";
// import { createUserDocumentFromAuth, getCurrentUser, onAuthStateChangedListener } from "./utils/firebase/firebase-utils";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // function redux-saga untuk mengecek apakah user ada atau tidak
    // user sudah register/login atau tidak
    dispatch(checkUserSession());
    // dalam function getCurrentUser berisi promise 
    // getCurrentUser();

    // async function fetchData() {
    //   const unsubscribe = onAuthStateChangedListener((user) => {
    //     if (user) {
    //       createUserDocumentFromAuth(user);
    //     }
    //     dispatch(setCurrentUser(user));
    //   });
    //   return unsubscribe;  
    // }
    // fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<ShopComponent />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
