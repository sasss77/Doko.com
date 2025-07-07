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
import NotFound from "./NotFound";
import Dashboard from "./Dashboard";

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
        <Route path="/NotFound" element={<NotFound />} />  
         <Route path="/Dashboard" element={<Dashboard />} />  
      </Routes>
    </Router>
   
  );
};

export default App;
