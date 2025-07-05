import React, { useState } from 'react';
import { Truck, Headphones, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

const NewArrivalSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      featured: [
        {
          title: "Buddha Statue",
          description: "Exquisite brass statue of Lord Buddha in a meditative pose.",
          image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          size: "large",
          position: "left"
        },
        {
          title: "Pashmina Shawls",
          description: "Soft and luxurious pashmina shawls in various colors.",
          image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          size: "medium",
          position: "top-right"
        },
        {
          title: "Dhaka Fabric",
          description: "Traditional handwoven Dhaka fabric with intricate patterns.",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          size: "medium",
          position: "middle-right"
        },
        {
          title: "Singing Bowl",
          description: "Handcrafted singing bowl with wooden striker.",
          image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          size: "small",
          position: "bottom-left"
        },
        {
          title: "Singing Bowl",
          description: "Handcrafted singing bowl with wooden striker.",
          image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          size: "small",
          position: "bottom-right"
        }
      ]
    },
    {
      id: 2,
      featured: [
        {
          title: "Thangka Painting",
          description: "Sacred Buddhist art with intricate details and vibrant colors.",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          size: "large",
          position: "left"
        },
        {
          title: "Khukuri Knife",
          description: "Traditional Nepali curved knife with decorative handle.",
          image: "https://images.unsplash.com/photo-1589927986089-35812388d1b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          size: "medium",
          position: "top-right"
        },
        {
          title: "Prayer Flags",
          description: "Colorful Tibetan prayer flags for spiritual decoration.",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          size: "medium",
          position: "middle-right"
        },
        {
          title: "Mala Beads",
          description: "Sacred prayer beads for meditation and spirituality.",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          size: "small",
          position: "bottom-left"
        },
        {
          title: "Incense Sticks",
          description: "Aromatic incense sticks for meditation and prayer.",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          size: "small",
          position: "bottom-right"
        }
      ]
    }
  ];

  const services = [
    {
      icon: Truck,
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140"
    },
    {
      icon: Headphones,
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support"
    },
    {
      icon: Shield,
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days"
    }
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

  const currentSlideData = slides[currentSlide];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-5 h-10 bg-red-500 rounded-sm"></div>
          <h2 className="text-red-500 font-semibold text-lg">Featured</h2>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
          New Arrival
        </h3>
      </div>

      {/* Featured Products Grid with Slider */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>

        {/* Products Grid */}
        <div className="bg-black rounded-lg overflow-hidden min-h-[600px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* Large Featured Item - Left Side */}
            <div className="relative group cursor-pointer overflow-hidden">
              <img
                src={currentSlideData.featured[0].image}
                alt={currentSlideData.featured[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute bottom-8 left-8 text-white max-w-sm">
                <h4 className="text-2xl font-bold mb-2">{currentSlideData.featured[0].title}</h4>
                <p className="text-gray-200 mb-4 leading-relaxed">{currentSlideData.featured[0].description}</p>
                <button className="text-white border-b border-white hover:border-gray-300 pb-1 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>

            {/* Right Side Grid */}
            <div className="grid grid-cols-2 grid-rows-2 gap-0">
              {/* Top Right - Medium Item */}
              <div className="col-span-2 relative group cursor-pointer overflow-hidden border-l border-gray-800">
                <img
                  src={currentSlideData.featured[1].image}
                  alt={currentSlideData.featured[1].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-xl font-bold mb-2">{currentSlideData.featured[1].title}</h4>
                  <p className="text-gray-200 text-sm mb-3">{currentSlideData.featured[1].description}</p>
                  <button className="text-white border-b border-white hover:border-gray-300 pb-1 transition-colors text-sm">
                    Shop Now
                  </button>
                </div>
              </div>

              {/* Middle Right - Medium Item */}
              <div className="col-span-2 relative group cursor-pointer overflow-hidden border-l border-t border-gray-800">
                <img
                  src={currentSlideData.featured[2].image}
                  alt={currentSlideData.featured[2].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-xl font-bold mb-2">{currentSlideData.featured[2].title}</h4>
                  <p className="text-gray-200 text-sm mb-3">{currentSlideData.featured[2].description}</p>
                  <button className="text-white border-b border-white hover:border-gray-300 pb-1 transition-colors text-sm">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Red Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-red-500 scale-110' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        {services.map((service, index) => (
          <div key={index} className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-lg">{service.title}</h4>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivalSection;