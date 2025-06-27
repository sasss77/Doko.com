"use client"

import { useState } from "react"
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Truck,
  Headphones,
  Shield,
} from "lucide-react"

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const teamMembers = [
    {
      name: "Rajiv Shrestha",
      position: "Founder & Chairman",
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      name: "Awishworya Rai",
      position: "Managing Director",
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      name: "Ayush KC",
      position: "Product Manager",
      image: "/placeholder.svg?height=300&width=250",
    },
  ]

  const stats = [
    { number: "10.5k", label: "Sellers active on our site", icon: "👥" },
    { number: "33k", label: "Monthly Product Sale", icon: "💰", highlighted: true },
    { number: "45.5k", label: "Customer active in our site", icon: "👤" },
    { number: "25k", label: "Annual gross sale in our site", icon: "💼" },
  ]

  const services = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="bg-black text-white text-center py-2 text-sm">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          <span className="underline ml-2 cursor-pointer">ShopNow</span>
        </div>
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
              <a href="#" className="text-red-600 border-b-2 border-red-600 pb-1">
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
                  className="w-64 pl-4 pr-10 py-2 bg-gray-100 rounded-md focus:ring-red-500 focus:border-red-500 focus:outline-none border-0"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Heart className="h-6 w-6 text-gray-600 hover:text-red-600 transition-colors cursor-pointer" />
                </div>
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-red-600 transition-colors cursor-pointer" />
                </div>
                <User className="h-6 w-6 text-gray-600 hover:text-red-600 transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-sm text-gray-500">
          <span className="hover:text-red-600 cursor-pointer transition-colors">Home</span>
          <span className="mx-2">/</span>
          <span className="text-black">About</span>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-black mb-8">Our Story</h1>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence
                  in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has
                  10,500 sellers and 300 brands and serves 3 millions customers across the region.
                </p>
                <p>
                  Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse
                  assortment in categories ranging from consumer.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-pink-100 rounded-lg overflow-hidden">
                <img src="/src/assets/Rectangle 2.png" alt="Our Story" className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
      </div>

      {/* Statistics Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-8 rounded-lg border-2 transition-all duration-300 hover:shadow-lg ${
                stat.highlighted
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white border-gray-200 hover:border-red-600"
              }`}
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  stat.highlighted ? "bg-white text-red-600" : "bg-black text-white"
                }`}
              >
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className={`text-3xl font-bold mb-2 ${stat.highlighted ? "text-white" : "text-black"}`}>
                {stat.number}
              </div>
              <div className={`text-sm ${stat.highlighted ? "text-white" : "text-gray-600"}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-6 transition-transform duration-300 group-hover:scale-105">
                <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-80 object-cover" />
              </div>
              <h3 className="text-2xl font-semibold text-black mb-2">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.position}</p>
              <div className="flex justify-center space-x-4">
                <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors" />
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {[0, 1, 2, 3, 4].map((dot, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-red-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
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
