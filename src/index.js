import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { UserProvider } from "./contexts/userContext";
// import { CategoriesProvider } from "./contexts/categoriesContext";
// import { CartProvider } from "./contexts/cartContext";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./utils/stripe/stripe.utils";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        {/* <UserProvider> */}
        {/* <CategoriesProvider> */}
        {/* <CartProvider> */}
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
        {/* </CartProvider> */}
        {/* </CategoriesProvider> */}
        {/* </UserProvider> */}
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
