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
  Eye,
  EyeOff,
  Check
} from 'lucide-react';

export default function SecurityPasswordPage() {
  const [sidebarExpanded, setSidebarExpanded] = useState({
    users: true,
    sellers: false,
    customers: false
  });
  
  const [activeTab, setActiveTab] = useState('Security');
  const [passwordVisibility, setPasswordVisibility] = useState({
    old: false,
    new: false,
    confirm: false
  });
  
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '@uysdJj11h'
  });

  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: true,
    upperLower: true,
    specialChars: true
  });

  const toggleSidebar = (item) => {
    setSidebarExpanded(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [field]: !prev[field]
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
                    {sidebarExpanded.users && (
                      <div className="ml-6 mt-1 space-y-1">
                        <a href="#" className="block px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                          Sellers
                        </a>
                        <a href="#" className="block px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                          Customers
                        </a>
                      </div>
                    )}
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
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
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
              {activeTab === 'Security' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Password</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Old Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
                      <div className="relative">
                        <input
                          type={passwordVisibility.old ? 'text' : 'password'}
                          value={formData.oldPassword}
                          onChange={(e) => handleInputChange('oldPassword', e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('old')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {passwordVisibility.old ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    
                    {/* New Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <div className="relative">
                        <input
                          type={passwordVisibility.new ? 'text' : 'password'}
                          value={formData.newPassword}
                          onChange={(e) => handleInputChange('newPassword', e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('new')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {passwordVisibility.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    
                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                      <div className="relative">
                        <input
                          type={passwordVisibility.confirm ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('confirm')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {passwordVisibility.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordRequirements.minLength ? 'bg-green-500' : 'bg-gray-300'}`}>
                        {passwordRequirements.minLength && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-sm ${passwordRequirements.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                        Minimum 8 characters.
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordRequirements.upperLower ? 'bg-green-500' : 'bg-gray-300'}`}>
                        {passwordRequirements.upperLower && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-sm ${passwordRequirements.upperLower ? 'text-green-600' : 'text-gray-500'}`}>
                        Use combination of uppercase and lowercase letters.
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordRequirements.specialChars ? 'bg-green-500' : 'bg-gray-300'}`}>
                        {passwordRequirements.specialChars && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-sm ${passwordRequirements.specialChars ? 'text-green-600' : 'text-gray-500'}`}>
                        Use of special characters (e.g., !, @, #, $, %).
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                      Update Password
                    </button>
                    <button className="px-6 py-2 text-gray-700 hover:text-gray-900 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'Account' && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Account Settings</h3>
                  <p className="text-gray-500">Configure your account preferences here.</p>
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