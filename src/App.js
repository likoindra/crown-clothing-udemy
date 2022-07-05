import React from "react";
import { Routes, Route } from "react-router-dom";
import Authentication from "./routes/authentication";
import Home from "./routes/home";
import Navigation from "./routes/navigation";
import ShopComponent from "./routes/shops";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<ShopComponent />} />
        <Route path="auth" element={<Authentication/>} />
      </Route>
    </Routes>
  );
};

export default App;
