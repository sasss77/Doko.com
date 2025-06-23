 "use client"

import { useState } from "react"
import { Search, Heart, ShoppingCart, User, Plus, Minus, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Cart() {
  const [quantities, setQuantities] = useState({ nepali: 1, tshirt: 2 })
  const [couponCode, setCouponCode] = useState("")

  const updateQuantity = (item, change) => {
    setQuantities((prev) => ({
      ...prev,
      [item]: Math.max(0, prev[item] + change),
    }))
  }

  const subtotal = quantities.nepali * 850 + quantities.tshirt * 1550

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/src/assets/doko.png" alt="doko" className="h-25 pt-2 w-auto" />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                Contact
              </a>
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                Sign Up
              </a>
            </nav>

            {/* Search and Icons */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-64 pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 focus:outline-none"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Heart className="h-6 w-6 text-gray-600 hover:text-red-600 transition-colors cursor-pointer" />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </div>
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-red-600 transition-colors cursor-pointer" />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    2
                  </span>
                </div>
                <User className="h-6 w-6 text-gray-600 hover:text-red-600 transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-sm text-gray-500">
          <span className="hover:text-red-600 cursor-pointer transition-colors">Home</span>
          <span className="mx-2">/</span>
          <span className="text-black">Cart</span>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Cart Table */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Quantity</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors hover:scale-105 transform duration-300 ease-in-out">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-16 w-16 flex items-center justify-center mr-4">
                        <img src="/src/assets/image 19.png" alt="T-shirt" className="h-16 w-16 rounded-lg" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">T-shirt</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">1550</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center border border-gray-300 rounded-md w-20">
                      <button
                        onClick={() => updateQuantity("tshirt", -1)}
                        className="p-1 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="flex-1 text-center text-sm py-1">
                        {quantities.tshirt.toString().padStart(2, "0")}
                      </span>
                      <button
                        onClick={() => updateQuantity("tshirt", 1)}
                        className="p-1 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{quantities.tshirt * 1550}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-16 w-16 flex items-center justify-center mr-4">
                        <img src="/src/assets/book.png" alt="Nepali paper" className="h-16 w-16 rounded-lg" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">Nepali paper</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">850</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center border border-gray-300 rounded-md w-20">
                      <button
                        onClick={() => updateQuantity("nepali", -1)}
                        className="p-1 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="flex-1 text-center text-sm py-1">
                        {quantities.nepali.toString().padStart(2, "0")}
                      </span>
                      <button
                        onClick={() => updateQuantity("nepali", 1)}
                        className="p-1 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{quantities.nepali * 850}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors mb-4 hover:scale-105 transform duration-300 ease-in-out">
                Return To Shop
              </button>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors mb-4 hover:scale-105 transform duration-300 ease-in-out">
                Update Cart
              </button>
        </div>

        {/* Coupon and Cart Total */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Coupon Section */}
          <div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 focus:outline-none"
              />
              <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors">
                Apply Coupon
              </button>
            </div>
          </div>

          {/* Cart Total */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cart Total</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Subtotal:</span>
                <span className="text-sm font-medium text-gray-900">{subtotal}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Shipping:</span>
                <span className="text-sm font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-semibold text-gray-900">Total:</span>
                <span className="text-sm font-semibold text-gray-900">{subtotal}</span>
              </div>
            </div>
            <button className="w-full mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors">
              Proceed to checkout
            </button>
          </div>
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
    </div>
  )
}
