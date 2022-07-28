import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { UserProvider } from "./contexts/userContext";
// import { CategoriesProvider } from "./contexts/categoriesContext";
// import { CartProvider } from "./contexts/cartContext";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      {/* <UserProvider> */}
      {/* <CategoriesProvider> */}
      {/* <CartProvider> */}
      <App />
      {/* </CartProvider> */}
      {/* </CategoriesProvider> */}
      {/* </UserProvider> */}
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
