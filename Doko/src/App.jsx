import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Cart from "./cart";
import About from "./About";
import Wishlist from "./Wishlist";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />     
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
   
  );
};

export default App;
