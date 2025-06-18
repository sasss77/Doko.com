
import React, { useState } from 'react';
import { Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DokoSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Account created:', formData);
  };

  const handleGoogleSignup = () => {
    console.log('Sign up with Google');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
     <header className="relative bg-white border-b border-gray-100 h-20">
  <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between relative">
    
    {/* Logo aligned left */}
    <div className="flex items-center">
      <img src="Doko Logo.png" alt="doko" className="h-25 pt-2 w-auto" />
    </div>

    {/* Centered nav */}
    <nav className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8 text-sm items-center pt-1 pb-1">
      <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
      <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
      <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
      <Link to="/signup" className="text-gray-600 hover:text-gray-900 underline">Sign up</Link>
      <Link to="/myaccount" className="text-gray-900 ">Log in</Link>
    </nav>
  </div>
</header>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row flex-1">
        {/* Welcome Section */}
        <div className="w-full md:w-1/2 bg-yellow-50 flex items-center justify-center px-8 py-12 mt-15 mb-15">
          <div className="text-center">
            <h1 className="text-xl sm:text-5xl font-serif font-semibold text-yellow-900 mb-4 leading-tight">
              Welcome<br />to doko
            </h1>
            <p className="text-2xl sm:text-xl text-yellow-900 font-light  mx-auto"><b>
              Discover the heart of Nepal<br/>through its local treasures.
              </b>
            </p>
          </div>
        </div>

        {/* Signup Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center py-12 px-8">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Create an account</h2>
              <p className="text-black text-sm">Enter your details below</p>
            </div>

            <div className="space-y-4 mb-6">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-gray-500 focus:outline-none text-gray-900 placeholder-gray-400"
              />
              <input
                type="text"
                name="email"
                placeholder="Email or Phone Number"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-gray-500 focus:outline-none text-gray-900 placeholder-gray-400"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-gray-500 focus:outline-none text-gray-900 placeholder-gray-400"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded mb-4 transition-colors"
            >
              Create Account
            </button>

            <button
              onClick={handleGoogleSignup}
              className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded mb-6 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>

            <p className="text-center text-gray-500 text-sm">
              Already have an account?{' '}
              <Link to="/myaccount" className="text-gray-900 underline">Log in</Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {/* DOKO Section */}
            <div>
              <h3 className="text-white font-medium text-lg mb-4">DOKO</h3>
              <div className="space-y-3">
                <p className="text-white text-sm">Subscribe</p>
                <p className="text-gray-300 text-sm">Get 10% off your first order</p>
                <div className="flex border border-gray-600 rounded">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-transparent px-3 py-2 text-sm flex-1 text-white placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-medium text-lg mb-4">Support</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>111 Kathmandu, Nepal</p>
                <p>exclusive@gmail.com</p>
                <p>+977 9812345678</p>
              </div>
            </div>

            {/* Account */}
            <div>
              <h3 className="text-white font-medium text-lg mb-4">Account</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <Link to="/my-account" className="block hover:text-white">My Account</Link>
                <Link to="/login" className="block hover:text-white">Login / Register</Link>
                <a href="#" className="block hover:text-white">Cart</a>
                <a href="#" className="block hover:text-white">Wishlist</a>
                <a href="#" className="block hover:text-white">Shop</a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-medium text-lg mb-4">Quick Link</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <a href="#" className="block hover:text-white">Privacy Policy</a>
                <a href="#" className="block hover:text-white">Terms Of Use</a>
                <a href="#" className="block hover:text-white">FAQ</a>
                <Link to="/contact" className="block hover:text-white">Contact</Link>
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="text-white font-medium text-lg mb-4">Follow us on</p>
              <div className="flex gap-4 pt-2">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
