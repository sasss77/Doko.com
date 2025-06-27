import React, { useState } from 'react';
import { Search, ShoppingCart, User, Star, Heart, Truck, RotateCcw, Plus, Minus, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import NTshirtImage from "./assets/NT-shirt.png";

const Product = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("black");
  const [quantity, setQuantity] = useState(1);

  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = [
    { name: "black", color: "bg-black" },
    { name: "red", color: "bg-red-500" },
  ];

  const relatedProducts = [
    { id: 1, name: "T-shirt with Tape Details", price: "Rs1749", image: "https://via.placeholder.com/200x200" },
    { id: 2, name: "T-shirt with Tape Details", price: "Rs1749", image: "https://via.placeholder.com/200x200" },
    { id: 3, name: "T-shirt with Tape Details", price: "Rs1749", image: "https://via.placeholder.com/200x200" },
    { id: 4, name: "T-shirt with Tape Details", price: "Rs1749", image: "https://via.placeholder.com/200x200" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 text-sm">
        Sign up and get 30% off on your first order. Sign Up Now
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/src/assets/doko.png" alt="Doko Logo" className="h-25 w-auto" />
            </div>

            {/* Navigation */}
<nav className="hidden md:flex space-x-8">
  <a href="#" className="text-gray-900 hover:text-red-500 transition-colors">
    Home
  </a>
  <a href="#" className="text-red-900 hover:text-red-500 transition-colors">
    Contact
  </a>
  <a href="#" className="text-gray-900 hover:text-red-500 transition-colors">
    About
  </a>
  <a href="#" className="text-gray-900 hover:text-red-500 transition-colors">
    Sign Up
  </a>
</nav>

            {/* Search and Icons */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-64 pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ShoppingCart className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-12">
        <div className="text-sm text-gray-500">
          <a href="/account" className="hover:text-red-500 transition-colors">Account</a> /{" "}
          <a href="/clothing" className="hover:text-red-500 transition-colors">Clothing</a> 
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Image */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={NTshirtImage}
              alt="Newari T-Shirt"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Newari T- Shirt</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(70 Reviews)</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">Rs 1750</div>
            </div>

            {/* Colors */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Colours:</h3>
              <div className="flex space-x-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color.name ? "border-gray-900 scale-110" : "border-gray-300"
                    } ${color.color}`}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Size:</h3>
              <div className="flex space-x-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "bg-red-500 text-white border-red-500"
                        : "bg-white text-gray-900 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Buy Now */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-100 transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-md transition-colors">
                Buy Now
              </button>
              <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            {/* Delivery Info */}
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-start space-x-3">
                <Truck className="h-5 w-5 mt-1 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Free Delivery</h4>
                  <p className="text-sm text-gray-600">Enter your postal code for Delivery Availability</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <RotateCcw className="h-5 w-5 mt-1 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Return Delivery</h4>
                  <p className="text-sm text-gray-600">Free 30 Days Delivery Returns. Details</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="border-l-4 border-red-500 pl-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Related Item</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
              <p className="text-lg font-semibold text-gray-900">{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white mt-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                  {/* Logo Section */}
                  <div className="space-y-4 flex flex-col items-start">
                    {/* Removed doko logo image as requested */}
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
                    <div className="space-y-2 text-sm text-gray-400">
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
    </div>
  );
};

export default Product;
