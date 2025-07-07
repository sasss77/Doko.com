import React, { useState } from 'react';
import { Search, Filter, Download, Plus, Eye, Edit, Trash2, Bell, Menu, X, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const CustomerPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    {
      id: 1,
      customerId: 'ID 12451',
      name: 'Leslie Alexander',
      contact: 'georgia@examp...',
      phone: '+62 819 1314 1435',
      purchases: '$21.78',
      orders: '30 Order',
      address: '2972 Westheimer Rd. Santa Ana, Illinois 85486'
    },
    {
      id: 2,
      customerId: 'ID 12452',
      name: 'Guy Hawkins',
      contact: 'guy@examp. com',
      phone: '+62 819 1314 1435',
      purchases: '$21.78',
      orders: '30 Order',
      address: '4517 Washington Ave. Manchester, Kentucky 39495'
    },
    {
      id: 3,
      customerId: 'ID 12453',
      name: 'Kristin Watson',
      contact: 'kristin@examp...',
      phone: '+62 819 1314 1435',
      purchases: '$21.78',
      orders: '30 Order',
      address: '2118 Thornridge Cir. Syracuse, Connecticut 35624'
    },
    {
      id: 4,
      customerId: 'ID 12453',
      name: 'Kristin Watson',
      contact: 'kristin@examp...',
      phone: '+62 819 1314 1435',
      purchases: '$21.78',
      orders: '30 Order',
      address: '2118 Thornridge Cir. Syracuse, Connecticut 35624'
    },
    {
      id: 5,
      customerId: 'ID 12452',
      name: 'Guy Hawkins',
      contact: 'guy@examp.com',
      phone: '+62 819 1314 1435',
      purchases: '$21.78',
      orders: '30 Order',
      address: '4517 Washington Ave. Manchester, Kentucky 39495'
    },
    {
      id: 6,
      customerId: 'ID 12451',
      name: 'Leslie Alexander',
      contact: 'georgia@examp...',
      phone: '+62 819 1314 1435',
      purchases: '$21.78',
      orders: '30 Order',
      address: '2972 Westheimer Rd. Santa Ana, Illinois 85486'
    },
    {
      id: 7,
      customerId: 'ID 12345',
      name: 'Kristin Watson',
      contact: 'kristin@examp...',
      phone: '+62 819 1314 1435',
      purchases: '$21.78',
      orders: '30 Order',
      address: '2118 Thornridge Cir. Syracuse, Connecticut 35624'
    },
    {
      id: 8,
      customerId: 'ID 12451',
      name: 'Leslie Alexander',
      contact: 'georgia@examp...',
      phone: '+62 819 1314 1435',
      purchases: '$21.78',
      orders: '30 Order',
      address: '2972 Westheimer Rd. Santa Ana, Illinois 85486'
    }
  ];

  const sidebarItems = [
    { icon: '📊', label: 'Dashboard', active: false },
    { icon: '👤', label: 'Users', active: false, hasSubmenu: true },
    { icon: '🏪', label: 'Sellers', active: false, hasSubmenu: true },
    { icon: '👥', label: 'Customers', active: true },
    { icon: '💳', label: 'Transaction (441)', active: false },
    { icon: '👥', label: 'Customer', active: false },
    { icon: '📦', label: 'Product', active: false }
  ];

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleSelectAll = () => {
    setSelectedCustomers(
      selectedCustomers.length === customers.length ? [] : customers.map(c => c.id)
    );
  };

  const totalPages = Math.ceil(customers.length / itemsPerPage);

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
                <h1 className="text-xl font-semibold text-gray-800">Customer</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Dashboard</span>
                  <span>▶</span>
                  <span className="text-gray-700">Customer</span>
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
                placeholder="Search for id, name Customer"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                <span className="text-sm">Add Customer</span>
              </button>
            </div>
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
                        checked={selectedCustomers.length === customers.length}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Purchases
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order QTY
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <input 
                          type="checkbox"
                          checked={selectedCustomers.includes(customer.id)}
                          onChange={() => handleSelectCustomer(customer.id)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-xs text-red-500 font-medium">{customer.customerId}</div>
                          <div className="text-sm text-gray-900 font-medium">{customer.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm text-gray-900">{customer.contact}</div>
                          <div className="text-sm text-gray-500">{customer.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{customer.purchases}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{customer.orders}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{customer.address}</td>
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
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
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

export default CustomerPage;