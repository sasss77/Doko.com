import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Cart from "./cart";
import About from "./About";
import Wishlist from "./Wishlist";
import Product from "./Product";
import HomePage from "./Homepage";
import Contact  from "./Contact";
import MyAccount from "./MyAccount";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/Contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product" element={<Product />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/account" element={<MyAccount />} />  
      </Routes>
    </Router>
   
  );
};

export default App;
