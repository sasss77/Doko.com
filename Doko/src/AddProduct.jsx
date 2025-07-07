import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Package, BarChart3, Users, TrendingUp, Settings, HelpCircle, ChevronDown, Upload, ShoppingCart, Bell } from 'lucide-react';

const AddProductPage = () => {
 const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
 const [formData, setFormData] = useState({
 sku: '',
 productName: '',
 size: '',
 color: '',
 category: '',
 price: '',
 quantity: '',
 status: ''
 });

 const handleInputChange = (e) => {
 setFormData({
 ...formData,
 [e.target.name]: e.target.value
 });
 };

 return (
 <div className="min-h-screen bg-gray-50 flex">
 {/* Sidebar */}
 <div className={`bg-white shadow-sm transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'} flex-shrink-0`}>
 {/* Logo */}
 <div className="p-4 border-b border-gray-100">
 <div className="flex items-center space-x-2">
 <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
 <span className="text-white font-bold text-sm">3D</span>
 </div>
 {!sidebarCollapsed && <span className="font-semibold text-gray-800">kō</span>}
 </div>
 </div>

 {/* Navigation */}
 <nav className="mt-6">
 <div className={`px-4 ${sidebarCollapsed ? 'hidden' : 'block'}`}>
 <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">GENERAL</p>
 </div>

 <div className="space-y-1">
 <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200">
 <BarChart3 className="w-5 h-5" />
 {!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
 </a>

 <a href="#" className="flex items-center px-4 py-2 bg-red-50 text-red-600 border-r-2 border-red-500 transition-colors duration-200">
 <Package className="w-5 h-5" />
 {!sidebarCollapsed && (
 <div className="ml-3 flex items-center justify-between w-full">
 <span>Product (119)</span>
 <ChevronDown className="w-4 h-4" />
 </div>
 )}
 </a>

 <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200">
 <TrendingUp className="w-5 h-5" />
 {!sidebarCollapsed && <span className="ml-3">Transaction (441)</span>}
 </a>

 <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200">
 <Users className="w-5 h-5" />
 {!sidebarCollapsed && <span className="ml-3">Customers</span>}
 </a>

 <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200">
 <BarChart3 className="w-5 h-5" />
 {!sidebarCollapsed && <span className="ml-3">Sales Report</span>}
 </a>
 </div>

 <div className={`px-4 mt-8 ${sidebarCollapsed ? 'hidden' : 'block'}`}>
 <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">TOOLS</p>
 </div>

 <div className="space-y-1">
 <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200">
 <Settings className="w-5 h-5" />
 {!sidebarCollapsed && <span className="ml-3">Account & Settings</span>}
 </a>

 <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200">
 <HelpCircle className="w-5 h-5" />
 {!sidebarCollapsed && <span className="ml-3">Help</span>}
 </a>
 </div>
 </nav>

 {/* User Profile */}
 <div className="absolute bottom-4 left-4 right-4">
 <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
 <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
 <span className="text-xs font-medium text-gray-600">GH</span>
 </div>
 {!sidebarCollapsed && (
 <div className="flex-1 min-w-0">
 <p className="text-sm font-medium text-gray-900 truncate">Guy Hawkins</p>
 <p className="text-xs text-gray-500 truncate">Admin</p>
 </div>
 )}
 {!sidebarCollapsed && <ChevronDown className="w-4 h-4 text-gray-400" />}
 </div>
 </div>
 </div>

 {/* Main Content */}
 <div className="flex-1 flex flex-col min-w-0">
 {/* Header */}
 <header className="bg-white shadow-sm border-b border-gray-200">
 <div className="flex items-center justify-between px-6 py-4">
 <div className="flex items-center space-x-4">
 <button
 onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
 className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
 >
 <Package className="w-5 h-5 text-gray-600" />
 </button>

 <div className="relative">
 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
 <input
 type="text"
 placeholder="Search product"
 className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 w-80"
 />
 </div>
 </div>

 <div className="flex items-center space-x-4">
 <div className="relative">
 <ShoppingCart className="w-6 h-6 text-gray-600" />
 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
 </div>

 <div className="relative">
 <Bell className="w-6 h-6 text-gray-600" />
 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">1</span>
 </div>

 <div className="flex items-center space-x-3">
 <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
 <span className="text-xs font-medium text-gray-600">GH</span>
 </div>
 <div>
 <p className="text-sm font-medium text-gray-900">Guy Hawkins</p>
 <p className="text-xs text-gray-500">Admin</p>
 </div>
 </div>
 </div>
 </div>
 </header>

 {/* Page Content */}
 <main className="flex-1 p-6">
 {/* Breadcrumb */}
 <div className="mb-6">
 <h1 className="text-2xl font-semibold text-gray-900 mb-2">Product</h1>
 <nav className="text-sm text-gray-500">
 <span>Dashboard</span>
 <span className="mx-2">▶</span>
 <span>Product</span>
 <span className="mx-2">▶</span>
 <span className="text-gray-900">Add Product</span>
 </nav>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 {/* Product Information */}
 <div className="lg:col-span-2">
 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
 <h2 className="text-lg font-semibold text-gray-900 mb-1">Product Information</h2>
 <p className="text-sm text-gray-500 mb-6">Lorem ipsum dolor sit amet consectetur. Non ac nulla aliquam senectus in vestibulum mauris.</p>

 <div className="space-y-6">
 {/* SKU */}
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
 <input
 type="text"
 name="sku"
 value={formData.sku}
 onChange={handleInputChange}
 placeholder="Input no SKU"
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
 />
 </div>

 {/* Product Name */}
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
 <input
 type="text"
 name="productName"
 value={formData.productName}
 onChange={handleInputChange}
 placeholder="Input product name"
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
 />
 </div>

 {/* Size and Color */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
 <input
 type="text"
 name="size"
 value={formData.size}
 onChange={handleInputChange}
 placeholder="Input Price"
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
 <input
 type="text"
 name="color"
 value={formData.color}
 onChange={handleInputChange}
 placeholder="Color"
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
 />
 </div>
 </div>

 {/* Product Category and Price */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Product Category</label>
 <select
 name="category"
 value={formData.category}
 onChange={handleInputChange}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
 >
 <option value="">Select product category</option>
 <option value="electronics">Electronics</option>
 <option value="clothing">Clothing</option>
 <option value="home">Home & Garden</option>
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
 <input
 type="text"
 name="price"
 value={formData.price}
 onChange={handleInputChange}
 placeholder="Input Price"
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
 />
 </div>
 </div>

 {/* Quantity */}
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
 <input
 type="text"
 name="quantity"
 value={formData.quantity}
 onChange={handleInputChange}
 placeholder="Input stock"
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
 />
 </div>

 {/* Status Product */}
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-2">Status Product</label>
 <select
 name="status"
 value={formData.status}
 onChange={handleInputChange}
 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
 >
 <option value="">Select status product</option>
 <option value="active">Active</option>
 <option value="inactive">Inactive</option>
 <option value="draft">Draft</option>
 </select>
 </div>
 </div>
 </div>
 </div>

 {/* Image Product */}
 <div className="lg:col-span-1">
 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
 <h2 className="text-lg font-semibold text-gray-900 mb-1">Image Product</h2>
 <p className="text-sm text-gray-500 mb-6">Note : Format photos SVG, PNG, or JPG (Max size 4mb)</p>

 <div className="grid grid-cols-2 gap-4 mb-6">
 {[1, 2, 3, 4].map((num) => (
 <div key={num} className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-red-400 transition-colors duration-200 cursor-pointer group">
 <Upload className="w-8 h-8 text-gray-400 group-hover:text-red-400 transition-colors duration-200 mb-2" />
 <span className="text-sm text-gray-500 group-hover:text-red-500 transition-colors duration-200">Photo {num}</span>
 </div>
 ))}
 </div>

 <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
 Save Product
 </button>
 </div>
 </div>
 </div>
 </main>
 </div>
 </div>
 );
};

export default AddProductPage;