import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Authentication from "./routes/authentication";
import Checkout from "./routes/checkout";
import Home from "./routes/home";
import Navigation from "./routes/navigation";
import ShopComponent from "./routes/shops";
import { setCurrentUser } from "./store/user/user.action"; 
import { useDispatch } from "react-redux";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "./utils/firebase/firebase-utils";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const unsubscribe = onAuthStateChangedListener((user) => {
        if (user) {
          createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));
      });
      return unsubscribe;  
    }
    fetchData();
  }, [dispatch]);

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
