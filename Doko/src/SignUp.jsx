
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';


export default function DokoSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Account created:', formData);
  };

  const handleGoogleSignup = () => {
    console.log('Sign up with Google');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex flex-col md:flex-row flex-1">
        {/* Welcome Section */}
        <div className="w-full md:w-1/2 bg-yellow-50 flex items-center justify-center px-8 py-12 mt-15 mb-15">
          <div className="text-center">
            <h1 className="text-xl sm:text-5xl font-serif font-semibold text-yellow-900 mb-4 leading-tight">
              Welcome<br />to doko
            </h1>
            <p className="text-2xl sm:text-xl text-yellow-900 font-light mx-auto">
              <b>Discover the heart of Nepal<br />through its local treasures.</b>
            </p>
          </div>
        </div>

        {/* Signup Form */}
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
              <svg className="w-5 h-5" viewBox="0 0 24 24"> {/* SVG PATHS omitted for brevity */} </svg>
              Sign up with Google
            </button>

            <p className="text-center text-gray-500 text-sm">
              Already have an account?{' '}
              <Link to="/myaccount" className="text-gray-900 underline">Log in</Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
