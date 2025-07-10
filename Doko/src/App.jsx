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
import ProductAdmin from './ProductAdmin';
import AddProduct from './AddProduct';
import Customer from './Customer';
import AddCustomer from './AddCustomer';
import EditProduct from './EditProduct';
import PersonalAccount from './PersonalAccount';
import Security from './Security';
import Order from './Order';
import Seller from './Seller';
import AddSeller from './AddSeller';

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
          <Route path="/ProductAdmin" element={<ProductAdmin />} />  
          <Route path="/AddProduct" element={<AddProduct />} />  
           <Route path="/Customer" element={<Customer />} />  
           <Route path="/AddCustomer" element={<AddCustomer />} />  
            <Route path="/EditProduct" element={<EditProduct />} />  
            <Route path="/PersonalAccount" element={<PersonalAccount />} />  
            <Route path="/Security" element={<Security />} />  
            <Route path="/Order" element={<Order />} />  
            <Route path="/Seller" element={<Seller />} />  
              <Route path="/AddSeller" element={<AddSeller />} /> 


      </Routes>
    </Router>
   
  );
};

export default App;
