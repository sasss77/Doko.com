import React, { useState } from 'react';
import { Search, Filter, Download, Plus, Eye, Edit, Trash2, Bell, Menu, X, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductDashboard = () => {
  const [activeTab, setActiveTab] = useState('Sneakers');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const products = [
    {
      id: 1,
      code: '021231',
      name: 'Beigi Coffe (Navy)',
      price: 20.00,
      size: 40,
      qty: 234,
      date: '04/17/23',
      time: '8:25 PM',
      status: 'Available',
      image: '/api/placeholder/40/40'
    },
    {
      id: 2,
      code: '021231',
      name: 'Beigi Coffe (Navy)',
      price: 20.00,
      size: 40,
      qty: 234,
      date: '04/17/23',
      time: '8:25 PM',
      status: 'Out of Stock',
      image: '/api/placeholder/40/40'
    },
    {
      id: 3,
      code: '021231',
      name: 'Story Honzo (Cream)',
      price: 20.00,
      size: 40,
      qty: 234,
      date: '04/17/23',
      time: '8:25 PM',
      status: 'Available',
      image: '/api/placeholder/40/40'
    },
    {
      id: 4,
      code: '021231',
      name: 'Kanky Kitadakate (Green)',
      price: 20.00,
      size: 40,
      qty: 234,
      date: '04/17/23',
      time: '8:25 PM',
      status: 'Out of Stock',
      image: '/api/placeholder/40/40'
    },
    {
      id: 5,
      code: '021231',
      name: 'Story Honzo (Black)',
      price: 20.00,
      size: 40,
      qty: 234,
      date: '04/17/23',
      time: '8:25 PM',
      status: 'Available',
      image: '/api/placeholder/40/40'
    },
    {
      id: 6,
      code: '021231',
      name: 'Story Honzo (Cream)',
      price: 20.00,
      size: 40,
      qty: 234,
      date: '04/17/23',
      time: '8:25 PM',
      status: 'Out of Stock',
      image: '/api/placeholder/40/40'
    },
    {
      id: 7,
      code: '021231',
      name: 'Beigi Coffe (Navy)',
      price: 20.00,
      size: 40,
      qty: 234,
      date: '04/17/23',
      time: '8:25 PM',
      status: 'Out of Stock',
      image: '/api/placeholder/40/40'
    },
    {
      id: 8,
      code: '021231',
      name: 'Kanky Kitadakate (Green)',
      price: 20.00,
      size: 40,
      qty: 234,
      date: '04/17/23',
      time: '8:25 PM',
      status: 'Available',
      image: '/api/placeholder/40/40'
    }
  ];

  const tabs = [
    { name: 'Sneakers', count: 50, active: true },
    { name: 'Jacket', count: 26, active: false },
    { name: 'T-Shirt', count: 121, active: false },
    { name: 'Bag', count: 21, active: false }
  ];

  const sidebarItems = [
    { icon: '📊', label: 'Dashboard', active: false },
    { icon: '👤', label: 'User', active: false, hasSubmenu: true },
    { icon: '🏪', label: 'Seller', active: false, hasSubmenu: true },
    { icon: '👥', label: 'Customers', active: false, hasSubmenu: true },
    { icon: '💳', label: 'Transaction (441)', active: false },
    { icon: '👥', label: 'Customers', active: false },
    { icon: '📦', label: 'Product', active: true }
  ];

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    setSelectedProducts(
      selectedProducts.length === products.length ? [] : products.map(p => p.id)
    );
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">JO</span>
            </div>
            <span className="font-semibold text-gray-800">JOKO</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-4">General</div>
          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <div key={index} className="group">
                <div className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  item.active 
                    ? 'bg-red-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {item.hasSubmenu && (
                    <ChevronDown className={`h-4 w-4 transition-transform ${item.active ? 'text-white' : 'text-gray-400'}`} />
                  )}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">Product</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Dashboard</span>
                  <span>▶</span>
                  <span>Product</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
              <div className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-800">Guy Hawkins</div>
                  <div className="text-xs text-gray-500">Admin</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search for id, name product"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4" />
                <span className="text-sm">Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="h-4 w-4" />
                <span className="text-sm">Export</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors transform hover:scale-105">
                <Plus className="h-4 w-4" />
                <span className="text-sm">New Product</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap border-b border-gray-200 mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.name
                    ? 'border-b-2 border-red-500 text-red-600 bg-red-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{tab.name}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activeTab === tab.name 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input 
                        type="checkbox" 
                        checked={selectedProducts.length === products.length}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QTY</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <input 
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                            <div className="w-8 h-8 bg-gray-300 rounded"></div>
                          </div>
                          <div>
                            <div className="text-xs text-red-500 font-medium">{product.code}</div>
                            <div className="text-sm text-gray-900">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{product.size}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{product.qty}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div>{product.date}</div>
                        <div className="text-xs text-gray-500">at {product.time}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          product.status === 'Available' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-500">
              1 - 10 of 13 Pages
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">The page on</span>
                <select 
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductDashboard;