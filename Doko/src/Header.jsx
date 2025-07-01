import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header-blur bg-white sticky top-0 z-50 shadow-sm transition-all duration-300 h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between relative">
        {/* Logo aligned left */}
        <div className="text-2xl font-bold text-red-500 hover:scale-105 transition-transform cursor-pointer">
          <img src="src/assets/Doko Logo.png" alt="doko" className="h-25 pt-2 w-auto" />
        </div>

        {/* Centered nav */}
        <div className="hidden md:flex space-x-8 items-center absolute left-1/2 transform -translate-x-1/2 flex pt-1 pb-1">
          {[
            { name: 'Home', href: '/Home' },
            { name: 'Contact', href: '/contact' },
            { name: 'About', href: '/about' },
            { name: 'Sign Up', href: '/' },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-gray-700 hover:text-red-500 font-medium transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
