// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Heart, ShoppingCart, User, Menu, X
} from 'lucide-react';


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header-blur');
      if (window.scrollY > 50) {
        header?.classList.add('backdrop-blur-lg', 'bg-white/95');
      } else {
        header?.classList.remove('backdrop-blur-lg', 'bg-white/95');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header-blur bg-white sticky top-0 z-50 shadow-sm transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-red-500 hover:scale-105 transition-transform cursor-pointer">
            <img src="src/assets/Doko Logo.png" alt="doko" className="h-25 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
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

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
  <input
  type="text"
  placeholder="What are you looking for?"
  className="pl-6 pr-10 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-[#f5f5f5] focus:bg-white w-56 lg:w-64 text-sm placeholder:text-sm"
/>


            <Search
  className="absolute right-3 inset-y-0 my-auto w-5 h-5 text-black hover:text-red-500 transition-colors cursor-pointer"
/>
            </div>

            {/* Icons */}
            <div className="flex space-x-3">
              <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 cursor-pointer transition-all hover:scale-110" />
              <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-red-500 cursor-pointer transition-all hover:scale-110" />
              <User className="w-5 h-5 text-gray-600 hover:text-red-500 cursor-pointer transition-all hover:scale-110" />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'}`}>
          <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
            {[
              { name: 'Home', href: '/home' },
              { name: 'Contact', href: '/contact' },
              { name: 'About', href: '/about' },
              { name: 'Sign Up', href: '/' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-red-500 font-medium transition-colors py-2"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex justify-center space-x-4 pt-2">
              <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 cursor-pointer transition-all hover:scale-110" />
              <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-red-500 cursor-pointer transition-all hover:scale-110" />
              <User className="w-5 h-5 text-gray-600 hover:text-red-500 cursor-pointer transition-all hover:scale-110" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
