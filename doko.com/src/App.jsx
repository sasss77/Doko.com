import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./Contact";
import SignUp from "./SignUp";
import MyAccount from "./MyAccount";
import NotFound from "./NotFound";  

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />     
         <Route path="/my-account" element={<MyAccount />} />   
        <Route path="/contact" element={<Contact />} />
        <Route path="/404error" element={<NotFound />} />
      </Routes>
    </Router>
   
  );
};

export default App;
