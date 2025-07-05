import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShoppingCart, BookOpen, FolderOpen, Shirt } from 'lucide-react';

const HomepageComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Up to 10% Off Voucher",
      subtitle: "Shop Now",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      bgColor: "from-amber-800 to-amber-900"
    },
    {
      title: "Summer Collection 2024",
      subtitle: "Discover Now",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      bgColor: "from-red-800 to-red-900"
    },
    {
      title: "Handcrafted Items",
      subtitle: "Explore More",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      bgColor: "from-orange-800 to-orange-900"
    }
  ];

  const categories = [
    { icon: BookOpen, name: "Books", color: "text-gray-600" },
    { icon: ShoppingCart, name: "Shopping", color: "text-gray-600" },
    { icon: FolderOpen, name: "Files", color: "text-gray-600" },
    { icon: Shirt, name: "Clothing", color: "text-gray-600" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-8">
      {/* Hero Section */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div className={`w-full h-full bg-gradient-to-r ${slide.bgColor} relative`}>
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="relative z-10 flex items-center justify-between h-full px-6 md:px-12">
                <div className="text-white max-w-md">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <button className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors group">
                    <span className="text-lg md:text-xl font-medium">{slide.subtitle}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="hidden md:block">
                  <img
                    src={slide.image}
                    alt="Product"
                    className="w-48 h-48 lg:w-64 lg:h-64 object-cover rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all z-20"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all z-20"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
        
        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-red-500 scale-110' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-5 h-10 bg-red-500 rounded-sm"></div>
            <h2 className="text-red-500 font-semibold text-lg">Categories</h2>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            Browse By Category
          </h3>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group cursor-pointer border-2 border-gray-200 rounded-lg p-6 md:p-8 hover:border-red-500 hover:bg-red-50 transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-4">
                <category.icon className={`w-12 h-12 md:w-16 md:h-16 ${category.color} group-hover:text-red-500 transition-colors`} />
              </div>
              <h4 className="text-gray-900 font-medium text-sm md:text-base">
                {category.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomepageComponent;