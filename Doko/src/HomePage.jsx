import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  ChevronLeft,
  ShoppingCart,
  Book,
  Package,
  Shirt,
  ArrowRight,
  HeadphonesIcon,
  Shield,
  ArrowUp,
} from 'lucide-react';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const sidebarItems = ['Women\'s Fashion', 'Men\'s Fashion', 'Handicraft product', 'Nepali paper', 'Groceries'];

  const flashSaleProducts = [
    { id: 1, name: 'Newari T-shirt', price: 1749, originalPrice: 2000, discount: 4.87, image: '/api/placeholder/200/200', category: 'Fashion' },
    { id: 2, name: 'Ceramic pottery', price: 1749, originalPrice: 2000, discount: 4.56, image: '/api/placeholder/200/200', category: 'Handicraft' },
    { id: 3, name: 'Hemp + shirt', price: 1200, originalPrice: 1500, discount: 4.53, image: '/api/placeholder/200/200', category: 'Fashion' },
    { id: 4, name: 'Hemp Bag', price: 1749, originalPrice: 2000, discount: 4.89, image: '/api/placeholder/200/200', category: 'Accessories' }
  ];

  const categories = [
    { icon: Book, name: 'Books', color: 'bg-blue-50 hover:bg-blue-100' },
    { icon: ShoppingCart, name: 'Shopping', color: 'bg-green-50 hover:bg-green-100' },
    { icon: Package, name: 'Products', color: 'bg-purple-50 hover:bg-purple-100' },
    { icon: Shirt, name: 'Fashion', color: 'bg-pink-50 hover:bg-pink-100' }
  ];

  const bestSellingProducts = [
    { id: 1, name: 'Khukuri', price: 2500, image: '/api/placeholder/200/200' },
    { id: 2, name: 'Thangka painting', price: 50000, image: '/api/placeholder/200/200' },
    { id: 3, name: 'Ganesh', price: 3700, image: '/api/placeholder/200/200' },
    { id: 4, name: 'Murchunga', price: 5000, image: '/api/placeholder/200/200' }
  ];

  const exploreProducts = [
    { id: 1, name: 'Dhaka topi', price: 350, image: '/api/placeholder/200/200', featured: false },
    { id: 2, name: 'Shiva statue', price: 25000, image: '/api/placeholder/200/200', featured: false },
    { id: 3, name: 'Mithila painting', price: 10000, image: '/api/placeholder/200/200', featured: false },
    { id: 4, name: 'Gundruk', price: 650, image: '/api/placeholder/200/200', featured: false },
    { id: 5, name: 'T-shirt with Tapa Details', price: 1749, image: '/api/placeholder/200/200', featured: false },
    { id: 6, name: 'T-shirt with Tapa Details', price: 1749, image: '/api/placeholder/200/200', featured: false },
    { id: 7, name: 'T-shirt with Tapa Details', price: 1749, image: '/api/placeholder/200/200', featured: false },
    { id: 8, name: 'Pashupatimath statue', price: 1700, image: '/api/placeholder/200/200', featured: false }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Buddha Statue',
      description: 'Exquisite hand-carved state of lord Buddha in its meditational pose',
      image: '/api/placeholder/300/400',
      price: 15000
    },
    {
      id: 2,
      name: 'Prabandha Shawls',
      description: 'Soft & luxurious traditional shawls in various colors',
      image: '/api/placeholder/300/400',
      price: 3500
    },
    {
      id: 3,
      name: 'Dhaka Fabric',
      description: 'Colourful and exquisite dhaka fabric authentic raw goods',
      image: '/api/placeholder/300/400',
      price: 1200
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-gray-900">Heritage Store</div>
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-700 hover:text-red-500">Home</a>
                <a href="#" className="text-gray-700 hover:text-red-500">Products</a>
                <a href="#" className="text-gray-700 hover:text-red-500">Categories</a>
                <a href="#" className="text-gray-700 hover:text-red-500">About</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Page Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add all sections here (Sidebar, Hero, Flash Sales, Category, etc.) */}
        {/* Keep only this comment if full sections are already inserted above */}

        {/* Scroll-to-top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
