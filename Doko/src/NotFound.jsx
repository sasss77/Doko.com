import React from 'react';
import { Link } from 'react-router-dom'; 
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';


const NotFound = () => {
  return (
    <div className="bg-white text-gray-800 font-sans min-h-screen flex flex-col">
      <Navbar />

      {/* Breadcrumb */}
      <div className="p-4 text-sm text-gray-500">
        <nav>
          <Link to="/" className="hover:underline transition-colors duration-200">
            Home
          </Link>{' '}
          / <span className="text-gray-700">404 Error</span>
        </nav>
      </div>

      {/* Center Content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-black transition-all duration-300">
          404 Not Found
        </h1>
        <p className="text-sm md:text-base text-black mb-6 transition-colors duration-300">
          Your visited page not found. You may go home page.
        </p>
        <Link
          to="/"
          className="px-6 py-2 bg-[#db4444] text-white rounded hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
        >
          Back to Home Page
        </Link>
      </div>
       <Footer />
    </div>
  );
};

export default NotFound;
