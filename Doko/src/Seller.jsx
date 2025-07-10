import React, { useState } from 'react';
import { Search, Filter, Download, Plus, Eye, Edit, Trash2, ChevronDown, ChevronLeft, ChevronRight, Bell, Menu, X } from 'lucide-react';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('Sellers');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSellers, setSelectedSellers] = useState([]);

  const sellers = [
    {
      id: 'ID1241',
      name: 'Leslie Alexander',
      contact: 'georgia@example.com\n+62 819 1314 1435',
      regDate: '01/03/2025',
      status: 'Active',
      address: '44600 sudarskathmandu'
    },
    {
      id: 'ID1242',
      name: 'Guy Hawkins',
      contact: 'guy@example.com\n+62 819 1314 1435',
      regDate: '01/03/2025',
      status: 'Active',
      address: '44600 Baneshworkathmandu'
    },
    {
      id: 'ID1243',
      name: 'Kristin Watson',
      contact: 'kristin@example.com\n+62 819 1314 1435',
      regDate: '01/03/2025',
      status: 'Active',
      address: '44600 yakukathmandu'
    },
    {
      id: 'ID1244',
      name: 'Kristin Watson',
      contact: 'kristin@example.com\n+62 819 1314 1435',
      regDate: '01/03/2025',
      status: 'Unactive',
      address: '44600 ason kathmandu'
    },
    {
      id: 'ID1245',
      name: 'Guy Hawkins',
      contact: 'guy@example.com\n+62 819 1314 1435',
      regDate: '01/03/2025',
      status: 'Unactive',
      address: '44600 sangha Banepa'
    },
    {
      id: 'ID1246',
      name: 'Leslie Alexander',
      contact: 'georgia@example.com\n+62 819 1314 1435',
      regDate: '01/03/2025',
      status: 'Active',
      address: '44600 sallaghari Thimi'
    },
    {
      id: 'ID1247',
      name: 'Kristin Watson',
      contact: 'kristin@example.com\n+62 819 1314 1435',
      regDate: '01/03/2025',
      status: 'Active',
      address: '44600 yala lalitpur'
    },
    {
      id: 'ID1248',
      name: 'Leslie Alexander',
      contact: 'georgia@example.com\n+62 819 1314 1435',
      regDate: '01/03/2025',
      status: 'Unactive',
      address: '44600 suryabinayak Bhaktapur'
    }
  ];

  const handleSelectSeller = (id) => {
    setSelectedSellers(prev => 
      prev.includes(id) 
        ? prev.filter(sellerId => sellerId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedSellers(selectedSellers.length === sellers.length ? [] : sellers.map(s => s.id));
  };

  const StatusBadge = ({ status }) => (
    <span className={`px-2 py-1 rounded text-xs font-medium ${
      status === 'Active' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }`}>
      {status}
    </span>
  );

  const ActionButton = ({ icon: Icon, onClick, className = "" }) => (
    <button 
      onClick={onClick}
      className={`p-1.5 rounded hover:bg-gray-100 transition-colors ${className}`}
    >
      <Icon size={16} className="text-gray-600" />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">30</span>
              </div>
              <span className="font-bold text-lg">KO</span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <nav className="mt-6">
          <div className="px-4 mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">GENERAL</h3>
          </div>
          
          <div className="space-y-1">
            <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
              <span className="text-sm">📊 Dashboard</span>
            </a>
            
            <div className="bg-red-500 text-white">
              <div className="flex items-center px-4 py-2 cursor-pointer">
                <span className="text-sm">👥 Users</span>
                <ChevronDown size={16} className="ml-auto" />
              </div>
              <div className="bg-red-400 pl-8 py-2">
                <span className="text-sm">Sellers</span>
              </div>
              <div className="pl-8 py-2 text-red-100 hover:text-white cursor-pointer">
                <span className="text-sm">Customers</span>
              </div>
            </div>
            
            <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
              <span className="text-sm">💳 Transaction (441)</span>
            </a>
            
            <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
              <span className="text-sm">📦 Product</span>
            </a>
          </div>
          
          <div className="px-4 mt-8 mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">TOOLS</h3>
          </div>
          
          <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
            <span className="text-sm">⚙️ Account & Settings</span>
          </a>
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold">GH</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Guy Hawkins</p>
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <Menu size={20} />
              </button>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Dashboard</span>
                <span>▶</span>
                <span className="font-medium">Sellers</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
              <div className="relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold">GH</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">Guy Hawkins</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Seller</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Dashboard</span>
              <span>▶</span>
              <span>Sellers</span>
            </div>
          </div>
          
          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for id, name Seller"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter size={16} />
                <span className="text-sm">Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download size={16} />
                <span className="text-sm">Export</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                <Plus size={16} />
                <span className="text-sm">Add Seller</span>
              </button>
            </div>
          </div>
          
          {/* Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedSellers.length === sellers.length}
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
                      Registration Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Active Seller
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
                  {sellers.map((seller) => (
                    <tr key={seller.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedSellers.includes(seller.id)}
                          onChange={() => handleSelectSeller(seller.id)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-red-500">{seller.id}</div>
                          <div className="text-sm text-gray-900">{seller.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 whitespace-pre-line">
                          {seller.contact}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {seller.regDate}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={seller.status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {seller.address}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          <ActionButton icon={Eye} />
                          <ActionButton icon={Edit} />
                          <ActionButton icon={Trash2} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t">
              <div className="text-sm text-gray-700">
                1 - 10 of 13 Pages
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">The page on</span>
                  <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                    <option>1</option>
                  </select>
                </div>
                <div className="flex items-center space-x-1">
                  <button className="p-1 rounded hover:bg-gray-200 transition-colors">
                    <ChevronLeft size={16} className="text-gray-400" />
                  </button>
                  <button className="p-1 rounded hover:bg-gray-200 transition-colors">
                    <ChevronRight size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;