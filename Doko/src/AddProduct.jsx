import React, { useState } from 'react';
import { Search, Filter, Download, Plus, Eye, Edit, Trash2, Bell, Menu, X, ChevronDown, ChevronLeft, ChevronRight, Upload, Image as ImageIcon } from 'lucide-react';

const AddProductPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
  const [uploadedImages, setUploadedImages] = useState([]);

  const sidebarItems = [
    { icon: '📊', label: 'Dashboard', active: false },
    { icon: '👤', label: 'Users', active: false, hasSubmenu: true },
    { icon: '🏪', label: 'Sellers', active: false, hasSubmenu: true },
    { icon: '👥', label: 'Customers', active: false, hasSubmenu: true },
    { icon: '💳', label: 'Transaction (441)', active: false },
    { icon: '👥', label: 'Customers', active: false },
    { icon: '📦', label: 'Product', active: true }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (photoNumber) => {
    // Simulate image upload
    const newImage = {
      id: photoNumber,
      name: `Photo ${photoNumber}`,
      url: '/api/placeholder/120/120'
    };
    setUploadedImages(prev => [...prev.filter(img => img.id !== photoNumber), newImage]);
  };

  const handleSaveProduct = () => {
    console.log('Saving product:', formData);
    // Add save logic here
  };

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
                  <span>▶</span>
                  <span className="text-gray-700">Add Product</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Product Information */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Product Information</h2>
                  <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur. Non ac nulla aliquam semper in velit mattis.</p>
                </div>

                <div className="space-y-6">
                  {/* SKU */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                    <input
                      type="text"
                      placeholder="Input no SKU"
                      value={formData.sku}
                      onChange={(e) => handleInputChange('sku', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    />
                  </div>

                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                    <input
                      type="text"
                      placeholder="Input product name"
                      value={formData.productName}
                      onChange={(e) => handleInputChange('productName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    />
                  </div>

                  {/* Size and Color */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                      <input
                        type="text"
                        placeholder="Input Price"
                        value={formData.size}
                        onChange={(e) => handleInputChange('size', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                      <input
                        type="text"
                        placeholder="Color"
                        value={formData.color}
                        onChange={(e) => handleInputChange('color', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Product Category and Price */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product Category</label>
                      <div className="relative">
                        <select
                          value={formData.category}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 appearance-none bg-white text-gray-400"
                        >
                          <option value="">Select product category</option>
                          <option value="sneakers">Sneakers</option>
                          <option value="jacket">Jacket</option>
                          <option value="tshirt">T-Shirt</option>
                          <option value="bag">Bag</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                      <input
                        type="text"
                        placeholder="Input Price"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                    <input
                      type="text"
                      placeholder="Input stock"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange('quantity', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    />
                  </div>

                  {/* Status Product */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status Product</label>
                    <div className="relative">
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 appearance-none bg-white text-gray-400"
                      >
                        <option value="">Select status product</option>
                        <option value="available">Available</option>
                        <option value="out-of-stock">Out of Stock</option>
                        <option value="discontinued">Discontinued</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Product */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Image Product</h2>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Note:</span> Format photos: SVG, PNG, or JPG (Max size 4mb)
                  </p>
                </div>

                {/* Image Upload Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[1, 2, 3, 4].map((photoNumber) => (
                    <div key={photoNumber} className="relative group">
                      <div 
                        onClick={() => handleImageUpload(photoNumber)}
                        className="w-full h-24 border-2 border-dashed border-blue-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                      >
                        <ImageIcon className="h-6 w-6 text-blue-400 mb-1" />
                        <span className="text-xs text-blue-500 font-medium">Photo {photoNumber}</span>
                      </div>
                      {uploadedImages.find(img => img.id === photoNumber) && (
                        <div className="absolute inset-0 bg-green-100 border-2 border-green-300 rounded-lg flex items-center justify-center">
                          <span className="text-xs text-green-600 font-medium">Uploaded</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSaveProduct}
                  className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Save Product
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

export default AddProductPage;