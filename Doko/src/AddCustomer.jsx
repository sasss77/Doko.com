import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Bell, User, Menu, X } from 'lucide-react';

const CustomerManagementPage = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({
    users: true
  });

  const toggleExpanded = (item) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    contact: '',
    membershipStatus: '',
    birthDate: '',
    accountStatus: '',
    nationalId: '',
    address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">3D</span>
            </div>
            <span className="font-semibold text-gray-800">KO</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6">
          <div className="px-4 mb-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">GENERAL</h3>
          </div>
          
          <div className="space-y-1">
            <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <span className="ml-3">Dashboard</span>
            </a>
            
            <div>
              <button
                onClick={() => toggleExpanded('users')}
                className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                {expandedItems.users ? (
                  <ChevronDown size={16} className="transition-transform" />
                ) : (
                  <ChevronRight size={16} className="transition-transform" />
                )}
                <span className="ml-3">Users</span>
              </button>
              
              {expandedItems.users && (
                <div className="ml-4 space-y-1 animate-fadeIn">
                  <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                    <span className="ml-3">Sellers</span>
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-white bg-red-500 rounded-r-full mr-4 shadow-sm">
                    <span className="ml-3">Customers</span>
                  </a>
                </div>
              )}
            </div>
            
            <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <span className="ml-3">Transaction (441)</span>
            </a>
            
            <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <span className="ml-3">Customers</span>
            </a>
            
            <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <span className="ml-3">Product</span>
            </a>
          </div>
        </nav>

        {/* User Profile at Bottom */}
        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={16} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Guy Hawkins</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <button className="ml-auto">
              <ChevronDown size={16} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Menu size={20} />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">Customer</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Bell size={20} className="text-gray-600" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
                </button>
              </div>
              
              <div className="relative">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">4</span>
                </button>
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 hover:bg-gray-100 rounded-md px-2 py-1 transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User size={16} className="text-gray-600" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-800">Guy Hawkins</p>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-700 transition-colors">Dashboard</a>
              <span>›</span>
              <a href="#" className="hover:text-gray-700 transition-colors">Customer</a>
              <span>›</span>
              <span className="text-gray-900">Add Customer</span>
            </div>
          </nav>

          {/* Customer Form */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Customer</h2>
              <p className="text-sm text-gray-500 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nulla aliquam consequat nisl exercitation.
              </p>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Input name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    >
                      <option value="">Male</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Account Status */}
                  <div>
                    <label htmlFor="accountStatus" className="block text-sm font-medium text-gray-700 mb-2">
                      Account status
                    </label>
                    <select
                      id="accountStatus"
                      name="accountStatus"
                      value={formData.accountStatus}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    >
                      <option value="">Active</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Input email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Contact */}
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                      Contact
                    </label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      placeholder="Contact"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* National ID */}
                  <div>
                    <label htmlFor="nationalId" className="block text-sm font-medium text-gray-700 mb-2">
                      National ID
                    </label>
                    <input
                      type="text"
                      id="nationalId"
                      name="nationalId"
                      value={formData.nationalId}
                      onChange={handleInputChange}
                      placeholder="0000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Membership Status */}
                  <div>
                    <label htmlFor="membershipStatus" className="block text-sm font-medium text-gray-700 mb-2">
                      Membership status
                    </label>
                    <input
                      type="text"
                      id="membershipStatus"
                      name="membershipStatus"
                      value={formData.membershipStatus}
                      onChange={handleInputChange}
                      placeholder="Total Purchases"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Birth Date */}
                  <div>
                    <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Birth of date
                    </label>
                    <input
                      type="text"
                      id="birthDate"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      placeholder="Order Quantity"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Input address"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-start">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform hover:scale-105 transition-transform"
                  >
                    Save Customer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CustomerManagementPage;