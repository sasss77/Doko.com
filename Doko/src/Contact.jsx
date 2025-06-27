import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Phone,
  Mail
} from 'lucide-react';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';

const DokoContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 2000);
    }, 1500);
  };

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-sm text-gray-600">
          <Link to="/" className="hover:text-red-500">Home</Link>
          <span className="mx-2">/</span>
          <span>Contact</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
          
          {/* Left Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              
              {/* Call To Us */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-[48px] h-[48px] min-w-[48px] min-h-[48px] bg-red-500 rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:bg-red-600 group-hover:rotate-360">
                  <Phone size={20} strokeWidth={2} />
                </div>
                <div className="transition-all duration-300 group-hover:translate-x-1">
                  <h3 className="text-lg font-semibold text-gray-900">Call To Us</h3>
                  <p className="text-black text-sm mt-1">We are available 24/7, 7 days a week.</p>
                  <p className="text-black text-sm  mt-1">Phone: +977 9828924474</p>
                </div>
              </div>

              <hr className="border-gray-300 my-4" />

              {/* Write To Us */}
              <div className="flex items-start space-x-4">
                <div className="w-[48px] h-[48px] min-w-[48px] min-h-[48px] bg-red-500 rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:bg-red-600 group-hover:rotate-360">
                  <Mail size={20} strokeWidth={2} />
                </div>
                <div className="transition-all duration-300 group-hover:translate-x-1">
                  <h3 className="text-lg font-semibold text-gray-900">Write To Us</h3>
                  <p className="text-black text-sm mt-1">Fill out our form and we will contact you within 24 hours.</p>
                  <p className="text-black text-sm  mt-1">Emails: customer@exclusive.com</p>
                  <p className="text-black text-sm ">Emails: support@exclusive.com</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name *"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 focus:bg-white"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email *"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 focus:bg-white"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Your Phone *"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 focus:bg-white"
                  />
                </div>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 focus:bg-white resize-vertical"
                />

                <div className="flex justify-end">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`px-8 py-3 rounded-md font-medium transition-all duration-300 relative overflow-hidden ${
                      isSubmitted
                        ? 'bg-green-500 hover:bg-green-600'
                        : isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-red-500 hover:bg-red-600 hover:-translate-y-1 hover:shadow-lg'
                    } text-white transform active:scale-95`}
                  >
                    <span className={`transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                      {isSubmitted ? 'Message Sent!' : 'Send Message'}
                    </span>
                    {isSubmitting && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent hover:translate-x-full transition-transform duration-500"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease forwards;
        }

        .group:hover .group-hover\\:rotate-360 {
          transform: rotate(360deg);
        }
      `}</style>
    </div>
  );
};

export default DokoContactPage;