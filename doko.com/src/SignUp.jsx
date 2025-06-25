
// import React, { useState } from 'react';
// import { Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
// import { Link } from 'react-router-dom';

// export default function DokoSignup() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = () => {
//     console.log('Account created:', formData);
//   };

//   const handleGoogleSignup = () => {
//     console.log('Sign up with Google');
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//      <header className="header-blur bg-white sticky top-0 z-50 shadow-sm transition-all duration-300 h-20">
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  h-full flex items-center justify-between relative">
    
//     {/* Logo aligned left */}
//     <div className="text-2xl font-bold text-red-500 hover:scale-105 transition-transform cursor-pointer">
//       <img src="Doko Logo.png" alt="doko" className="h-25 pt-2 w-auto" />
//     </div>

//     {/* Centered nav */}
//      <div className="hidden md:flex space-x-8 items-center absolute left-1/2 transform -translate-x-1/2 flex pt-1 pb-1">
//       {[
//         { name: 'Home', href: '/Home' },
//         { name: 'Contact', href: '/contact' },
//         { name: 'About', href: '/about' },
//         { name: 'Sign Up', href: '/' },
//       ].map((item) => (
//         <Link
//           key={item.name}
//           to={item.href}
//           className="text-gray-700 hover:text-red-500 font-medium transition-colors relative group"
//         >
//           {item.name}
//           <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
//         </Link>
//       ))}
//     </div>
//   </div>
// </header>

//       {/* Main Content */}
//       <main className="flex flex-col md:flex-row flex-1">
//         {/* Welcome Section */}
//         <div className="w-full md:w-1/2 bg-yellow-50 flex items-center justify-center px-8 py-12 mt-15 mb-15">
//           <div className="text-center">
//             <h1 className="text-xl sm:text-5xl font-serif font-semibold text-yellow-900 mb-4 leading-tight">
//               Welcome<br />to doko
//             </h1>
//             <p className="text-2xl sm:text-xl text-yellow-900 font-light  mx-auto"><b>
//               Discover the heart of Nepal<br/>through its local treasures.
//               </b>
//             </p>
//           </div>
//         </div>

//         {/* Signup Form Section */}
//         <div className="w-full md:w-1/2 flex items-center justify-center py-12 px-8">
//           <div className="w-full max-w-sm">
//             <div className="mb-8">
//               <h2 className="text-2xl font-semibold text-gray-900 mb-2">Create an account</h2>
//               <p className="text-black text-sm">Enter your details below</p>
//             </div>

//             <div className="space-y-4 mb-6">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-gray-500 focus:outline-none text-gray-900 placeholder-gray-400"
//               />
//               <input
//                 type="text"
//                 name="email"
//                 placeholder="Email or Phone Number"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-gray-500 focus:outline-none text-gray-900 placeholder-gray-400"
//               />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-gray-500 focus:outline-none text-gray-900 placeholder-gray-400"
//               />
//             </div>

//             <button
//               onClick={handleSubmit}
//               className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded mb-4 transition-colors"
//             >
//               Create Account
//             </button>

//             <button
//               onClick={handleGoogleSignup}
//               className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded mb-6 transition-colors flex items-center justify-center gap-2"
//             >
//               <svg className="w-5 h-5" viewBox="0 0 24 24">
//                 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//               </svg>
//               Sign up with Google
//             </button>

//             <p className="text-center text-gray-500 text-sm">
//               Already have an account?{' '}
//               <Link to="/myaccount" className="text-gray-900 underline">Log in</Link>
//             </p>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-black text-white mt-16">
//               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
//                   {/* DOKO Section */}
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold">DOKO</h3>
//                     <h4 className="font-medium">Subscribe</h4>
//                     <p className="text-gray-400 text-sm">Get 10% off your first order</p>
//                     <div className="flex">
//                       <input
//                         type="email"
//                         placeholder="Enter your email"
//                         className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
//                       />
      
//                     </div>
//                   </div>
      
//                   {/* Support Section */}
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold">Support</h3>
//                     <div className="space-y-2 text-sm text-gray-400">
//                       <p>111 Kathmandu<br />+977Nepal</p>
//                       <a href="#" className="hover:text-red-400 transition-colors block">
//                         exclusive@gmail.com
//                       </a>
//                       <a href="#" className="hover:text-red-400 transition-colors block">
//                         +977 88123456678
//                       </a>
//                     </div>
//                   </div>
      
//                   {/* Account Section */}
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold">Account</h3>
//                    <div className="space-y-2">
//         {[
//           { name: 'My Account', href: '/my-account' },
//           { name: 'Login / Register', href: '/' },
//           { name: 'Cart', href: '/404error' },
//           { name: 'Wishlist', href: '/wishlist' },
//           { name: 'Shop', href: '/shop' },
//         ].map((item) => (
//           <a
//             key={item.name}
//             href={item.href}
//             className="block text-sm text-gray-400 hover:text-red-400 transition-all hover:translate-x-1"
//           >
//             {item.name}
//           </a>
//         ))}
//       </div>
      
//                   </div>
      
//                   {/* Quick Link Section */}
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold">Quick Link</h3>
//                     <div className="space-y-2">
//                       {['Privacy Policy', 'Terms Of Use', 'FAQ', 'Contact'].map((item) => (
//                         <a
//                           key={item}
//                           href="#"
//                           className="block text-sm text-gray-400 hover:text-red-400 transition-all hover:translate-x-1"
//                         >
//                           {item}
//                         </a>
//                       ))}
//                     </div>
//                   </div>
      
                  
//                   <div className="space-y-4">
//                      <h3 className="text-lg font-semibold">Follow on</h3>
//                     <div className="flex space-x-3 pt-2">
//                       {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
//                         <a
//                           key={index}
//                           href="#"
//                           className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-all hover:-translate-y-1"
//                         >
//                           <Icon size={16} />
//                         </a>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </footer>
//     </div>
//   );
// }


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
