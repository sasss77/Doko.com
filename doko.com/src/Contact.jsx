import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingCart, 
  User, 
  Phone, 
  Mail, 
  Menu, 
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight
} from 'lucide-react';

const DokoContactPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 2000);
    }, 1500);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
      {/* Promo Banner */}
      <div className="bg-black text-white text-center py-2 text-sm transition-all hover:bg-gray-800">
        Sign up and get 20% off to your first order.{' '}
        <a href="#" className="underline hover:text-red-400 transition-colors">
          Sign Up Now
        </a>
      </div>

      {/* Header */}
      <header className="header-blur bg-white sticky top-0 z-50 shadow-sm transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="text-2xl font-bold text-red-500 hover:scale-105 transition-transform cursor-pointer">
             <img src="Doko Logo.png" alt="doko" class="h-25 w-auto"></img>
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
                  className="pl-2 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white w-48 lg:w-56"
                />
                <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer pl-1" />
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
      <a
        key={item.name}
        href={item.href}
        className="text-gray-700 hover:text-red-500 font-medium transition-colors py-2"
      >
        {item.name}
      </a>
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

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-sm text-gray-600">
          <a href="#" className="hover:text-red-500 transition-colors">
            Home
          </a>
          <span className="mx-2">/</span>
          <span>Contact</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Call To Us */}
              <div className="flex items-start space-x-4 mb-8 group">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold group-hover:bg-red-600 transition-all duration-300 group-hover:rotate-360 flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div className="group-hover:translate-x-2 transition-transform duration-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Call To Us</h3>
                  <p className="text-gray-600 text-sm mb-1">We are available 24/7, 7 days a week.</p>
                  <p className="text-gray-600 text-sm">Phone: +977 9812644474</p>
                </div>
              </div>

              {/* Write To Us */}
              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold group-hover:bg-red-600 transition-all duration-300 group-hover:rotate-360 flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div className="group-hover:translate-x-2 transition-transform duration-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Write To Us</h3>
                  <p className="text-gray-600 text-sm mb-2">Fill out our form and we will contact you within 24 hours.</p>
                  <p className="text-gray-600 text-sm mb-1">Email: customer@exclusive.com</p>
                  <p className="text-gray-600 text-sm">Email: support@exclusive.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="space-y-6">
                {/* Form Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name *"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white group-hover:-translate-y-1"
                    />
                  </div>
                  <div className="group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email *"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white group-hover:-translate-y-1"
                    />
                  </div>
                  <div className="group">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your Phone *"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white group-hover:-translate-y-1"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white resize-vertical group-hover:-translate-y-1"
                  />
                </div>

                {/* Submit Button */}
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
                    {/* Shine effect */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent hover:translate-x-full transition-transform duration-500"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* DOKO Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">DOKO</h3>
              <h4 className="font-medium">Subscribe</h4>
              <p className="text-gray-400 text-sm">Get 10% off your first order</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
                />

              </div>
            </div>

            {/* Support Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Support</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>111 Kathmandu<br />+977Nepal</p>
                <a href="#" className="hover:text-red-400 transition-colors block">
                  exclusive@gmail.com
                </a>
                <a href="#" className="hover:text-red-400 transition-colors block">
                  +977 88123456678
                </a>
              </div>
            </div>

            {/* Account Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Account</h3>
             <div className="space-y-2">
  {[
    { name: 'My Account', href: '/my-account' },
    { name: 'Login / Register', href: '/' },
    { name: 'Cart', href: '/cart' },
    { name: 'Wishlist', href: '/wishlist' },
    { name: 'Shop', href: '/shop' },
  ].map((item) => (
    <a
      key={item.name}
      href={item.href}
      className="block text-sm text-gray-400 hover:text-red-400 transition-all hover:translate-x-1"
    >
      {item.name}
    </a>
  ))}
</div>

            </div>

            {/* Quick Link Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Link</h3>
              <div className="space-y-2">
                {['Privacy Policy', 'Terms Of Use', 'FAQ', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-sm text-gray-400 hover:text-red-400 transition-all hover:translate-x-1"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            
            <div className="space-y-4">
               <h3 className="text-lg font-semibold">Follow on</h3>
              <div className="flex space-x-3 pt-2">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-all hover:-translate-y-1"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

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