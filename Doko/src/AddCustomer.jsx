

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeftCircle,
  ChevronRightCircle,
  Bell,
  MessageSquare,
  User
} from 'lucide-react';
import Logo from './assets/Doko Logo.png';

const CustomerManagementPage = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

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
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-50 flex flex-col`}>
        <div className="flex items-center justify-center pt-4 pb-1">
          <img src={Logo} alt="Doko Logo" className="w-28 h-auto object-contain" />
        </div>

        <div className="p-4 flex-1 overflow-auto pt-1">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-4">GENERAL</div>
          <nav className="space-y-2">
            <div onClick={() => navigate('/AdminDashboard')} className="flex items-center p-3 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100">
              <span className="mr-3">📊</span>
              <span className="text-sm font-medium">Dashboard</span>
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center p-3 rounded-lg cursor-pointer bg-red-500 text-white shadow">
                <span className="mr-3">👥</span>
                <span className="text-sm font-medium">Users</span>
              </div>
              <div onClick={() => navigate('/Customer')} className="cursor-pointer rounded px-6 py-2 text-sm hover:bg-gray-100 text-gray-700">
                Customers
              </div>
              <div onClick={() => navigate('/Seller')} className="cursor-pointer rounded px-6 py-2 text-sm hover:bg-gray-100 text-gray-700">
                Sellers
              </div>
            </div>
            <div onClick={() => navigate('/Transaction')} className="flex items-center p-3 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100">
              <span className="mr-3">💳</span>
              <span className="text-sm font-medium">Transaction (441)</span>
            </div>
            <div onClick={() => navigate('/ProductAdmin')} className="flex items-center p-3 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100">
              <span className="mr-3">📦</span>
              <span className="text-sm font-medium">Product</span>
            </div>
            <div onClick={() => navigate('/PersonalAccount')} className="flex items-center p-3 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100">
              <span className="mr-3">⚙️</span>
              <span className="text-sm font-medium">Account & Settings</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} min-h-screen bg-gray-50`}>
        {/* Top Navbar */}
        <header className="bg-[#e9e9e9] px-6 py-3 flex justify-between items-center shadow-sm">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600 p-2 rounded hover:bg-gray-200">
            {sidebarOpen ? <ChevronLeftCircle className="w-6 h-6" /> : <ChevronRightCircle className="w-6 h-6" />}
          </button>
          <div className="flex items-center space-x-4">
            <Bell className="h-5 w-5 text-gray-600" />
            <MessageSquare className="h-5 w-5 text-gray-600" />
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
                <div className="w-8 h-8 bg-gray-300 rounded-full" />
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-800">Guy Hawkins</div>
                  <div className="text-xs text-gray-500">Admin</div>
                </div>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-50">
                  <button onClick={() => { setDropdownOpen(false); navigate('/Login'); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Inner Form Content */}
        <main className="flex-1 p-6 overflow-auto">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <h2 className="text-xl font-semibold">Add Customer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" className="border p-2 rounded" />
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="border p-2 rounded" />
              <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} placeholder="Gender" className="border p-2 rounded" />
              <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} placeholder="Contact" className="border p-2 rounded" />
              <input type="text" name="membershipStatus" value={formData.membershipStatus} onChange={handleInputChange} placeholder="Membership Status" className="border p-2 rounded" />
              <input type="text" name="birthDate" value={formData.birthDate} onChange={handleInputChange} placeholder="Birth Date" className="border p-2 rounded" />
              <input type="text" name="accountStatus" value={formData.accountStatus} onChange={handleInputChange} placeholder="Account Status" className="border p-2 rounded" />
              <input type="text" name="nationalId" value={formData.nationalId} onChange={handleInputChange} placeholder="National ID" className="border p-2 rounded" />
            </div>
            <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" className="w-full border p-2 rounded" rows="3" />
            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Save Customer
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default CustomerManagementPage;
