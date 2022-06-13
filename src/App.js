import React from "react";
import { Routes, Route } from "react-router-dom";
import Authentication from "./routes/authentication";
import Home from "./routes/home";
import Navigation from "./routes/navigation";
const Shop = () => {
  return <h1>Iam shop</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication/>} />
      </Route>
    </Routes>
  );
};

export default App;
