// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Search,
//   Heart,
//   ShoppingCart,
//   User,
//   Phone,
//   Mail
// } from 'lucide-react';
// import Footer from './Footer.jsx';
// import Navbar from './Navbar.jsx';

// const DokoContactPage = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     message: ''
//   });

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     setTimeout(() => {
//       setIsSubmitting(false);
//       setIsSubmitted(true);
//       setTimeout(() => {
//         setIsSubmitted(false);
//         setFormData({ name: '', email: '', phone: '', message: '' });
//       }, 2000);
//     }, 1500);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const header = document.querySelector('.header-blur');
//       if (window.scrollY > 50) {
//         header?.classList.add('backdrop-blur-lg', 'bg-white/95');
//       } else {
//         header?.classList.remove('backdrop-blur-lg', 'bg-white/95');
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       {/* Breadcrumb */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         <div className="text-sm text-gray-600">
//           <Link to="/" className="hover:text-red-500">Home</Link>
//           <span className="mx-2">/</span>
//           <span>Contact</span>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
          
//           {/* Left Contact Info */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              
//               {/* Call To Us */}
//               <div className="flex items-start space-x-4 mb-6">
//                 <div className="w-[48px] h-[48px] min-w-[48px] min-h-[48px] bg-red-500 rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:bg-red-600 group-hover:rotate-360">
//                   <Phone size={20} strokeWidth={2} />
//                 </div>
//                 <div className="transition-all duration-300 group-hover:translate-x-1">
//                   <h3 className="text-lg font-semibold text-gray-900">Call To Us</h3>
//                   <p className="text-black text-sm mt-1">We are available 24/7, 7 days a week.</p>
//                   <p className="text-black text-sm  mt-1">Phone: +977 9828924474</p>
//                 </div>
//               </div>

//               <hr className="border-gray-300 my-4" />

//               {/* Write To Us */}
//               <div className="flex items-start space-x-4">
//                 <div className="w-[48px] h-[48px] min-w-[48px] min-h-[48px] bg-red-500 rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:bg-red-600 group-hover:rotate-360">
//                   <Mail size={20} strokeWidth={2} />
//                 </div>
//                 <div className="transition-all duration-300 group-hover:translate-x-1">
//                   <h3 className="text-lg font-semibold text-gray-900">Write To Us</h3>
//                   <p className="text-black text-sm mt-1">Fill out our form and we will contact you within 24 hours.</p>
//                   <p className="text-black text-sm  mt-1">Emails: customer@exclusive.com</p>
//                   <p className="text-black text-sm ">Emails: support@exclusive.com</p>
//                 </div>
//               </div>

//             </div>
//           </div>

//           {/* Right Contact Form */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//   <input
//     type="text"
//     name="name"
//     value={formData.name}
//     onChange={handleInputChange}
//     placeholder="Your Name *"
//     className="w-full h-12 px-4 py-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-[#f5f5f5] focus:bg-white"
//   />
//   <input
//     type="email"
//     name="email"
//     value={formData.email}
//     onChange={handleInputChange}
//     placeholder="Your Email *"
//     className="w-full h-12 px-4 py-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-[#f5f5f5] focus:bg-white"
//   />
//   <input
//     type="tel"
//     name="phone"
//     value={formData.phone}
//     onChange={handleInputChange}
//     placeholder="Your Phone *"
//     className="w-full h-12 px-4 py-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-[#f5f5f5] focus:bg-white"
//   />
// </div>

// <textarea
//   name="message"
//   value={formData.message}
//   onChange={handleInputChange}
//   placeholder="Your Message"
//   rows={5}
//   className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-[#f5f5f5] focus:bg-white resize-vertical"
// />


//                 <div className="flex justify-end">
//                   <button
//                     onClick={handleSubmit}
//                     disabled={isSubmitting}
//                     className={`px-8 py-3 rounded-md font-medium transition-all duration-300 relative overflow-hidden ${
//                       isSubmitted
//                         ? 'bg-green-500 hover:bg-green-600'
//                         : isSubmitting
//                         ? 'bg-gray-400 cursor-not-allowed'
//                         : 'bg-red-500 hover:bg-red-600 hover:-translate-y-1 hover:shadow-lg'
//                     } text-white transform active:scale-95`}
//                   >
//                     <span className={`transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
//                       {isSubmitted ? 'Message Sent!' : 'Send Message'}
//                     </span>
//                     {isSubmitting && (
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       </div>
//                     )}
//                     <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent hover:translate-x-full transition-transform duration-500"></div>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </main>

//       <Footer />

//       <style jsx>{`
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fade-in-up {
//           animation: fade-in-up 0.6s ease forwards;
//         }

//         .group:hover .group-hover\\:rotate-360 {
//           transform: rotate(360deg);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default DokoContactPage;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Phone,
//   Mail
// } from 'lucide-react';
// import Footer from './Footer.jsx';
// import Navbar from './Navbar.jsx';

// const DokoContactPage = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     message: ''
//   });

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     setTimeout(() => {
//       setIsSubmitting(false);
//       setIsSubmitted(true);
//       setTimeout(() => {
//         setIsSubmitted(false);
//         setFormData({ name: '', email: '', phone: '', message: '' });
//       }, 2000);
//     }, 1500);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const header = document.querySelector('.header-blur');
//       if (window.scrollY > 50) {
//         header?.classList.add('backdrop-blur-lg', 'bg-white/95');
//       } else {
//         header?.classList.remove('backdrop-blur-lg', 'bg-white/95');
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className="font-['Ag_Title'] min-h-screen bg-gray-50">
//       <Navbar />

//       {/* Breadcrumb */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         <div className="text-sm text-gray-600">
//           <Link to="/" className="hover:text-red-500">Home</Link>
//           <span className="mx-2">/</span>
//           <span>Contact</span>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
          
//           {/* Left Contact Info */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-lg p-6 min-h-[450px] flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">

              
//               {/* Call To Us */}
//               <div className="flex items-start space-x-4 mb-6">
//                 <div className="w-[48px] h-[48px] min-w-[48px] min-h-[48px] bg-[#db4444] rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:bg-red-600 group-hover:rotate-360">
//                   <Phone size={20} strokeWidth={2} />
//                 </div>
//                 <div className="transition-all duration-300 group-hover:translate-x-1">
//                   <h3 className="text-lg font-semibold text-gray-900">Call To Us</h3>
//                   <p className="text-black text-sm mt-1">We are available 24/7, 7 days a week.</p>
//                   <p className="text-black text-sm mt-1">Phone: +977 9828924474</p>
//                 </div>
//               </div>

//               <hr className="border-gray-300 my-4" />

//               {/* Write To Us */}
//               <div className="flex items-start space-x-4">
//                 <div className="w-[48px] h-[48px] min-w-[48px] min-h-[48px] bg-[#db4444] rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:bg-red-600 group-hover:rotate-360">
//                   <Mail size={20} strokeWidth={2} />
//                 </div>
//                 <div className="transition-all duration-300 group-hover:translate-x-1">
//                   <h3 className="text-lg font-semibold text-gray-900">Write To Us</h3>
//                   <p className="text-black text-sm mt-1">Fill out our form and we will contact you within 24 hours.</p>
//                   <p className="text-black text-sm mt-1">Emails: customer@exclusive.com</p>
//                   <p className="text-black text-sm">Emails: support@exclusive.com</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Contact Form */}
//           <div className="lg:col-span-2">
//            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[450px] flex flex-col justify-between">

//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Your Name *"
//                     className="w-full h-12 px-4 py-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-[#f5f5f5] focus:bg-white"
//                   />
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="Your Email *"
//                     className="w-full h-12 px-4 py-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-[#f5f5f5] focus:bg-white"
//                   />
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     placeholder="Your Phone *"
//                     className="w-full h-12 px-4 py-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-[#f5f5f5] focus:bg-white"
//                   />
//                 </div>

//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleInputChange}
//                   placeholder="Your Message"
//                   rows={5}
//                   className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-[#f5f5f5] focus:bg-white resize-vertical"
//                 />

//                 <div className="flex justify-end">
//                   <button
//                     onClick={handleSubmit}
//                     disabled={isSubmitting}
//                     className={`px-8 py-3 rounded-md font-medium transition-all duration-300 relative overflow-hidden ${
//                       isSubmitted
//                         ? 'bg-green-500 hover:bg-green-600'
//                         : isSubmitting
//                         ? 'bg-gray-400 cursor-not-allowed'
//                         : 'bg-[#db4444] hover:bg-red-600 hover:-translate-y-1 hover:shadow-lg'
//                     } text-white transform active:scale-95`}
//                   >
//                     <span className={`transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
//                       {isSubmitted ? 'Message Sent!' : 'Send Message'}
//                     </span>
//                     {isSubmitting && (
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       </div>
//                     )}
//                     <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent hover:translate-x-full transition-transform duration-500"></div>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />

//       <style jsx>{`
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in-up {
//           animation: fade-in-up 0.6s ease forwards;
//         }
//         .group:hover .group-hover\\:rotate-360 {
//           transform: rotate(360deg);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default DokoContactPage;


// import React, { useState } from 'react';
// import { Phone, Mail } from 'lucide-react';
// import Footer from './Footer.jsx';
// import Navbar from './Navbar.jsx';

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     message: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = () => {
//     console.log('Form submitted:', formData);
//     // Handle form submission here
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//       <Navbar />
//       {/* Navigation */}
//       <nav className="bg-white px-4 py-4 md:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center text-sm text-gray-600">
//             <span className="hover:text-gray-900 cursor-pointer">Home</span>
//             <span className="mx-2">/</span>
//             <span className="text-gray-900 font-medium">Contact</span>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 md:py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
//           {/* Left Side - Contact Information */}
//           <div className="space-y-8">
            
//             {/* Call To Us Section */}
//             <div>
//               <div className="flex items-center mb-4">
//                 <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
//                   <Phone className="w-6 h-6 text-white" />
//                 </div>
//                 <h2 className="text-xl font-semibold text-gray-900">Call To Us</h2>
//               </div>
//               <p className="text-gray-700 mb-2">We are available 24/7, 7 days a week.</p>
//               <p className="text-gray-700">Phone: +8801611112222</p>
//               <div className="mt-4 pt-4 border-t border-gray-300"></div>
//             </div>

//             {/* Write To US Section */}
//             <div>
//               <div className="flex items-center mb-4">
//                 <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
//                   <Mail className="w-6 h-6 text-white" />
//                 </div>
//                 <h2 className="text-xl font-semibold text-gray-900">Write To US</h2>
//               </div>
//               <p className="text-gray-700 mb-4">Fill out our form and we will contact you within 24 hours.</p>
//               <p className="text-gray-700 mb-1">Emails: customer@exclusive.com</p>
//               <p className="text-gray-700">Emails: support@exclusive.com</p>
//             </div>
//           </div>

//           {/* Right Side - Contact Form */}
//           <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
//             <div className="space-y-4">
              
//               {/* First Row - Name, Email, Phone */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Your Name *"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 bg-gray-100 border-0 rounded text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Your Email *"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 bg-gray-100 border-0 rounded text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
//                 />
//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Your Phone *"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 bg-gray-100 border-0 rounded text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
//                 />
//               </div>

//               {/* Message Textarea */}
//               <textarea
//                 name="message"
//                 placeholder="Your Message"
//                 value={formData.message}
//                 onChange={handleInputChange}
//                 rows={6}
//                 className="w-full px-4 py-3 bg-gray-100 border-0 rounded text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white resize-none"
//               ></textarea>

//               {/* Submit Button */}
//               <div className="flex justify-end pt-4">
//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-3 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
//                 >
//                   Send Message
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>

//   );
// }

import React, { useState, useEffect } from 'react';
import { Phone, Mail, Send, Star, Sparkles } from 'lucide-react';
 import Footer from './Footer.jsx';
 import Navbar from './Navbar.jsx';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  const FloatingParticle = ({ delay = 0, size = 'w-1 h-1' }) => (
    <div 
      className={`${size} bg-red-200 rounded-full absolute animate-pulse opacity-60`}
      style={{
        animation: `float ${3 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 font-sans relative overflow-hidden">
      <Navbar />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-red-200 rounded-full blur-2xl opacity-20 animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-red-50 rounded-full blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>
        
        {/* Floating Particles */}
        <FloatingParticle delay={0} size="w-2 h-2" />
        <FloatingParticle delay={1} size="w-1 h-1" />
        <FloatingParticle delay={2} size="w-1.5 h-1.5" />
      </div>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md px-4 py-6 shadow-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center text-sm text-gray-500">
            <span className="hover:text-red-500 cursor-pointer transition-all duration-300 hover:scale-105 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
            </span>
            <span className="mx-3 text-gray-400">/</span>
            <span className="text-gray-900 font-medium relative">
              Contact
              <Sparkles className="w-3 h-3 text-red-400 absolute -top-1 -right-4 animate-pulse" />
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 py-16 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Left Side - Contact Information */}
            <div className="lg:col-span-2">
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 h-full border border-white/20 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:scale-105">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500 via-pink-500 to-red-500 opacity-0 group-hover:opacity-20 blur-sm transition-all duration-500"></div>
                
                <div className="relative z-10">
                  {/* Call To Us Section */}
                  <div className="mb-8">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mr-4 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl relative group">
                        <Phone className="w-5 h-5 text-white transform group-hover:rotate-12 transition-transform duration-300" />
                        <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-20"></div>
                      </div>
                      <h2 className="text-base font-medium text-gray-900 group-hover:text-red-600 transition-colors duration-300">Call To Us</h2>
                    </div>
                    <div className="ml-14 space-y-4">
                      <p className="text-sm text-gray-600 leading-relaxed hover:text-gray-800 transition-colors duration-300">We are available 24/7, 7 days a week.</p>
                      <p className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer">Phone: +8801611112222</p>
                      <hr className="border-gray-200 group-hover:border-red-200 transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Write To US Section */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mr-4 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl relative group">
                        <Mail className="w-5 h-5 text-white transform group-hover:rotate-12 transition-transform duration-300" />
                        <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-20"></div>
                      </div>
                      <h2 className="text-base font-medium text-gray-900 group-hover:text-red-600 transition-colors duration-300">Write To US</h2>
                    </div>
                    <div className="ml-14 space-y-4">
                      <p className="text-sm text-gray-600 leading-relaxed hover:text-gray-800 transition-colors duration-300">Fill out our form and we will contact you within 24 hours.</p>
                      <p className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer">Emails: customer@exclusive.com</p>
                      <p className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer">Emails: support@exclusive.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 h-full border border-white/20 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Success message */}
                {submitted && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl z-50 animate-in fade-in duration-500">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                        <Star className="w-8 h-8 text-green-500 animate-pulse" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Message Sent!</h3>
                      <p className="text-gray-600">We'll get back to you soon.</p>
                    </div>
                  </div>
                )}
                
                <div className="relative z-10">
                  <div className="space-y-6">
                    
                    {/* First Row - Name, Email, Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="relative group">
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name *"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 bg-gray-100/80 backdrop-blur-sm border-0 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white/90 transition-all duration-300 group-hover:bg-gray-50/80 hover:shadow-lg focus:shadow-xl transform hover:scale-105 focus:scale-105"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      <div className="relative group">
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email *"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 bg-gray-100/80 backdrop-blur-sm border-0 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white/90 transition-all duration-300 group-hover:bg-gray-50/80 hover:shadow-lg focus:shadow-xl transform hover:scale-105 focus:scale-105"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      <div className="relative group">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Your Phone *"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 bg-gray-100/80 backdrop-blur-sm border-0 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white/90 transition-all duration-300 group-hover:bg-gray-50/80 hover:shadow-lg focus:shadow-xl transform hover:scale-105 focus:scale-105"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="relative group">
                      <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={8}
                        className="w-full px-4 py-4 bg-gray-100/80 backdrop-blur-sm border-0 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white/90 resize-none transition-all duration-300 group-hover:bg-gray-50/80 hover:shadow-lg focus:shadow-xl transform hover:scale-105 focus:scale-105"
                      ></textarea>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-6">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium px-12 py-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl relative overflow-hidden group"
                      >
                        {/* Button shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        
                        <div className="relative flex items-center">
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                              Send Message
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </div>
       

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
       <Footer />
    </div>
  );
}
