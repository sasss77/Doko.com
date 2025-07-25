import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  UserIcon, 
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import doko from "../../assets/doko.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const categories = [
    { 
      name: 'Musical Instruments', 
      path: '/products/musical-instruments',
      icon: '🎵',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      name: 'Handicrafts', 
      path: '/products/handicrafts',
      icon: '🎨',
      gradient: 'from-orange-500 to-red-500'
    },
    { 
      name: 'Grocery', 
      path: '/products/grocery',
      icon: '🥘',
      gradient: 'from-green-500 to-teal-500'
    },
    { 
      name: 'Tools & Crafts', 
      path: '/products/tools-crafts',
      icon: '🛠️',
      gradient: 'from-blue-500 to-indigo-500'
    },
    { 
      name: 'Clothing', 
      path: '/products/clothing',
      icon: '👘',
      gradient: 'from-pink-500 to-rose-500'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>🏔️ Authentic Nepali Products</span>
              <span className="hidden md:inline">📞 +977-1-4567890</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline">Free Delivery in Kathmandu Valley</span>
              <span>🇳🇵</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-red-600 to-blue-600 p-2 rounded-full transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl"><img src={ doko} alt="" /></span>
            </div>
            <div>
              <h1 className="text-1xl font-bold ">
                Doko
              </h1>
              <p className="text-xs text-gray-600">Authentic Nepal</p>
            </div>
          </Link>

          {/* Desktop Categories - Centered */}
          <div className="hidden lg:flex items-center space-x-2 flex-1 justify-center mx-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="group relative"
              >
                <div className={`bg-gradient-to-r ${category.gradient} text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 min-w-max`}>
                  <span className="text-lg">{category.icon}</span>
                  <span className="font-medium text-sm">{category.name}</span>
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-white rounded-full transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></div>
              </Link>
            ))}
          </div>

          {/* Desktop Navigation Icons */}
          <div className="hidden lg:flex items-center space-x-6">
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors">
                  <UserIcon className="h-6 w-6" />
                  <span className="text-sm font-medium">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Orders
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors">
                <UserIcon className="h-6 w-6" />
                <span className="text-sm font-medium">Login</span>
              </Link>
            )}

            <Link to="/wishlist" className="relative flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors group">
              <HeartIcon className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Wishlist</span>
            </Link>

            <Link to="/cart" className="relative flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors group">
              <div className="relative">
                <ShoppingCartIcon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium">Cart</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Categories Row */}
        <div className="lg:hidden mt-4 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 pb-2" style={{ minWidth: 'max-content' }}>
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="group flex-shrink-0"
              >
                <div className={`bg-gradient-to-r ${category.gradient} text-white px-3 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2`}>
                  <span className="text-sm">{category.icon}</span>
                  <span className="font-medium text-xs whitespace-nowrap">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t animate-slideDown">
          <div className="px-4 py-2 space-y-2">
            <Link
              to="/wishlist"
              className="block py-2 text-gray-700 hover:text-red-600 font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Wishlist
            </Link>
            <Link
              to="/cart"
              className="block py-2 text-gray-700 hover:text-red-600 font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart ({cartItemCount})
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block py-2 text-gray-700 hover:text-red-600 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block py-2 text-gray-700 hover:text-red-600 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Orders
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block py-2 text-gray-700 hover:text-red-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
