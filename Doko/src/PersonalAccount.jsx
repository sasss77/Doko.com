import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  BarChart3, 
  Users, 
  ShoppingCart, 
  CreditCard, 
  Settings, 
  Bell,
  Calendar,
  Edit3,
  ExternalLink
} from 'lucide-react';

export default function AccountSettingsPage() {
  const [sidebarExpanded, setSidebarExpanded] = useState({
    users: false,
    sellers: false,
    customers: false
  });
  
  const [activeTab, setActiveTab] = useState('Account');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: 'Male',
    dateOfBirth: '23 Desember 2003',
    phoneNumber: '+977 9876543321',
    country: 'Nepal',
    address: 'sailaghari, bhaktapur'
  });

  const toggleSidebar = (item) => {
    setSidebarExpanded(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = ['Account', 'Security', 'Notification'];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">30</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="font-bold text-gray-900">K</span>
                  <span className="text-red-500 font-bold">O</span>
                </div>
              </div>
            </div>
            <div className="w-8 h-8 border-2 border-gray-300 rounded flex items-center justify-center">
              <Calendar className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">2</span>
            </div>
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">1</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                <img src="/api/placeholder/32/32" alt="Guy Hawkins" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">Guy Hawkins</span>
                <span className="text-xs text-gray-500">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm h-screen overflow-y-auto">
          <div className="p-6">
            <div className="space-y-6">
              {/* General Section */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">General</h3>
                <nav className="space-y-1">
                  <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                    <BarChart3 className="w-4 h-4 mr-3 text-gray-400" />
                    Dashboard
                  </a>
                  
                  <div>
                    <button 
                      onClick={() => toggleSidebar('users')}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-3 text-gray-400" />
                        Users
                      </div>
                      {sidebarExpanded.users ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  <div>
                    <button 
                      onClick={() => toggleSidebar('sellers')}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <ShoppingCart className="w-4 h-4 mr-3 text-gray-400" />
                        Sellers
                      </div>
                      {sidebarExpanded.sellers ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  <div>
                    <button 
                      onClick={() => toggleSidebar('customers')}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-3 text-gray-400" />
                        Customers
                      </div>
                      {sidebarExpanded.customers ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                    <CreditCard className="w-4 h-4 mr-3 text-gray-400" />
                    Transaction (441)
                  </a>
                  
                  <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                    <Users className="w-4 h-4 mr-3 text-gray-400" />
                    Customers
                  </a>
                  
                  <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                    <ShoppingCart className="w-4 h-4 mr-3 text-gray-400" />
                    Product
                  </a>
                </nav>
              </div>
              
              {/* Tools Section */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Tools</h3>
                <nav className="space-y-1">
                  <a href="#" className="flex items-center px-3 py-2 text-sm text-white bg-red-500 rounded-lg">
                    <Settings className="w-4 h-4 mr-3 text-white" />
                    Account & Settings
                  </a>
                </nav>
              </div>
            </div>
          </div>
          
          {/* Bottom User Section */}
          <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                <img src="/api/placeholder/32/32" alt="Guy Hawkins" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Guy Hawkins</p>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Dashboard</span>
              <span>•</span>
              <span>Profile</span>
            </div>
          </nav>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">Account & Settings</h1>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'border-red-500 text-red-600 bg-red-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'Account' && (
                <div className="space-y-8">
                  {/* Profile Information */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
                    
                    {/* Profile Picture */}
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                        <img src="/api/placeholder/64/64" alt="Profile" className="w-full h-full object-cover" />
                      </div>
                      <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                        <span>Change Pictures</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="........"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder-gray-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="........"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder-gray-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="........"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder-gray-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select
                          value={formData.gender}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date Birthday</label>
                        <input
                          type="text"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                        Update
                      </button>
                      <button className="px-6 py-2 text-gray-700 hover:text-gray-900 transition-colors">
                        Cancel
                      </button>
                    </div>
                  </div>

                  {/* Contact Detail */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-gray-900">Contact Detail</h2>
                      <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                        <span>Edit</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
                          readOnly
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input
                          type="text"
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
                          readOnly
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Security' && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Security Settings</h3>
                  <p className="text-gray-500">Configure your security preferences here.</p>
                </div>
              )}

              {activeTab === 'Notification' && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Notification Settings</h3>
                  <p className="text-gray-500">Manage your notification preferences here.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}