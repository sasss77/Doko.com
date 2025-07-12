// import React, { useState } from 'react';
// import { ChevronDown, Bell, Menu, X } from 'lucide-react';

// const AddSellerForm = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     contact: '',
//     registrationDate: '01/02/2025',
//     shopName: 'Namaste handicraft',
//     address: ''
//   });

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     // Handle form submission
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//       {/* Mobile Sidebar Overlay */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
      
//       {/* Sidebar */}
//       <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
//         sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//       } lg:translate-x-0`}>
//         <div className="p-4 border-b">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold text-sm">30</span>
//               </div>
//               <span className="font-bold text-lg">KO</span>
//             </div>
//             <button 
//               onClick={() => setSidebarOpen(false)}
//               className="lg:hidden p-1 rounded hover:bg-gray-100"
//             >
//               <X size={20} />
//             </button>
//           </div>
//         </div>
        
//         <nav className="mt-6">
//           <div className="px-4 mb-4">
//             <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">GENERAL</h3>
//           </div>
          
//           <div className="space-y-1">
//             <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
//               <span className="text-sm">📊 Dashboard</span>
//             </a>
            
//             <div className="bg-red-500 text-white">
//               <div className="flex items-center px-4 py-2 cursor-pointer">
//                 <span className="text-sm">👥 Users</span>
//                 <ChevronDown size={16} className="ml-auto" />
//               </div>
//               <div className="bg-red-400 pl-8 py-2">
//                 <span className="text-sm">Sellers</span>
//               </div>
//               <div className="pl-8 py-2 text-red-100 hover:text-white cursor-pointer">
//                 <span className="text-sm">Customers</span>
//               </div>
//             </div>
            
//             <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
//               <span className="text-sm">💳 Transaction (441)</span>
//             </a>
            
//             <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
//               <span className="text-sm">📦 Product</span>
//             </a>
//           </div>
          
//           <div className="px-4 mt-8 mb-4">
//             <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">TOOLS</h3>
//           </div>
          
//           <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
//             <span className="text-sm">⚙️ Account & Settings</span>
//           </a>
//         </nav>
        
//         <div className="absolute bottom-4 left-4 right-4">
//           <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
//             <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
//               <span className="text-xs font-semibold">GH</span>
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium text-gray-900 truncate">Guy Hawkins</p>
//             </div>
//             <ChevronDown size={16} className="text-gray-500" />
//           </div>
//         </div>
//       </div>
      
//       {/* Main Content */}
//       <div className="lg:ml-64">
//         {/* Header */}
//         <header className="bg-white shadow-sm border-b">
//           <div className="flex items-center justify-between px-4 py-3">
//             <div className="flex items-center space-x-4">
//               <button 
//                 onClick={() => setSidebarOpen(true)}
//                 className="lg:hidden p-2 rounded-md hover:bg-gray-100"
//               >
//                 <Menu size={20} />
//               </button>
//               <div className="flex items-center space-x-2 text-sm text-gray-600">
//                 <span>Dashboard</span>
//                 <span>▶</span>
//                 <span>Seller</span>
//                 <span>▶</span>
//                 <span className="font-medium">Add Sellers</span>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <Bell size={20} className="text-gray-600" />
//                 <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//               </div>
//               <div className="relative">
//                 <Bell size={20} className="text-gray-600" />
//                 <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
//                   <span className="text-xs font-semibold">GH</span>
//                 </div>
//                 <div className="hidden sm:block">
//                   <p className="text-sm font-medium">Guy Hawkins</p>
//                   <p className="text-xs text-gray-500">Admin</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>
        
//         {/* Page Content */}
//         <main className="p-4 lg:p-6">
//           <div className="mb-6">
//             <h1 className="text-2xl font-bold text-gray-900 mb-1">Sellers</h1>
//             <div className="flex items-center space-x-2 text-sm text-gray-600">
//               <span>Dashboard</span>
//               <span>▶</span>
//               <span>Seller</span>
//               <span>▶</span>
//               <span>Add Sellers</span>
//             </div>
//           </div>
          
//           {/* Form Container */}
//           <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8 max-w-4xl">
//             <div className="mb-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-2">Seller</h2>
//               <p className="text-sm text-gray-500">
//                 Lorem ipsum dolor sit amet consectetur. Non ac nulla aliquam senean ut velit mattis.
//               </p>
//             </div>
            
//             <div className="space-y-6">
//               {/* Name Seller */}
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                   Name Seller
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   placeholder="Input name"
//                   value={formData.name}
//                   onChange={(e) => handleInputChange('name', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
//                 />
//               </div>
              
//               {/* Email and Contact Row */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     placeholder="Input email"
//                     value={formData.email}
//                     onChange={(e) => handleInputChange('email', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
//                     Contact
//                   </label>
//                   <input
//                     type="tel"
//                     id="contact"
//                     placeholder="Input no handphone"
//                     value={formData.contact}
//                     onChange={(e) => handleInputChange('contact', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
//                   />
//                 </div>
//               </div>
              
//               {/* Registration Date and Shop Name Row */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="registrationDate" className="block text-sm font-medium text-gray-700 mb-2">
//                     Registration Date
//                   </label>
//                   <input
//                     type="text"
//                     id="registrationDate"
//                     value={formData.registrationDate}
//                     onChange={(e) => handleInputChange('registrationDate', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50"
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="shopName" className="block text-sm font-medium text-gray-700 mb-2">
//                     Shop name
//                   </label>
//                   <input
//                     type="text"
//                     id="shopName"
//                     value={formData.shopName}
//                     onChange={(e) => handleInputChange('shopName', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50"
//                   />
//                 </div>
//               </div>
              
//               {/* Address */}
//               <div>
//                 <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
//                   Address
//                 </label>
//                 <textarea
//                   id="address"
//                   rows={4}
//                   placeholder="Input address"
//                   value={formData.address}
//                   onChange={(e) => handleInputChange('address', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none"
//                 />
//               </div>
              
//               {/* Submit Button */}
//               <div className="pt-4">
//                 <button
//                   onClick={handleSubmit}
//                   className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 font-medium"
//                 >
//                   Save Seller
//                 </button>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AddSellerForm;



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

const AddSellerForm = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    registrationDate: '01/02/2025',
    shopName: 'Namaste handicraft',
    address: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
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
            <div
              onClick={() => navigate('/AdminDashboard')}
              className="flex items-center p-3 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100"
            >
              <span className="mr-3">📊</span>
              <span className="text-sm font-medium">Dashboard</span>
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center p-3 rounded-lg cursor-pointer bg-red-500 text-white shadow">
                <span className="mr-3">👥</span>
                <span className="text-sm font-medium">Users</span>
              </div>
              <div
                onClick={() => navigate('/Customer')}
                className="cursor-pointer rounded px-6 py-2 text-sm hover:bg-gray-100 text-gray-700"
              >
                Customers
              </div>
              <div
                onClick={() => navigate('/Seller')}
                className="cursor-pointer rounded px-6 py-2 text-sm hover:bg-gray-100 text-gray-700"
              >
                Sellers
              </div>
            </div>
            <div
              onClick={() => navigate('/Transaction')}
              className="flex items-center p-3 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100"
            >
              <span className="mr-3">💳</span>
              <span className="text-sm font-medium">Transaction (441)</span>
            </div>
            <div
              onClick={() => navigate('/ProductAdmin')}
              className="flex items-center p-3 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100"
            >
              <span className="mr-3">📦</span>
              <span className="text-sm font-medium">Product</span>
            </div>
            <div
              onClick={() => navigate('/PersonalAccount')}
              className="flex items-center p-3 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100"
            >
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
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 p-2 rounded hover:bg-gray-200"
          >
            {sidebarOpen ? (
              <ChevronLeftCircle className="w-6 h-6" />
            ) : (
              <ChevronRightCircle className="w-6 h-6" />
            )}
          </button>

          <div className="flex items-center space-x-4">
            <Bell className="h-5 w-5 text-gray-600" />
            <MessageSquare className="h-5 w-5 text-gray-600" />
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full" />
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-800">Guy Hawkins</div>
                  <div className="text-xs text-gray-500">Admin</div>
                </div>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-50">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate('/Login');
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {/* Top Breadcrumb - PRESERVED */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Sellers</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Dashboard</span>
              <span>▶</span>
              <span>Seller</span>
              <span>▶</span>
              <span className="font-medium">Add Sellers</span>
            </div>
          </div>

          {/* Form Content - Unchanged */}
          <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8 max-w-4xl">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Seller</h2>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur. Non ac nulla aliquam senean ut velit mattis.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name Seller</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Input name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Input email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact</label>
                  <input
                    type="tel"
                    value={formData.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                    placeholder="Input no handphone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Registration Date</label>
                  <input
                    type="text"
                    value={formData.registrationDate}
                    onChange={(e) => handleInputChange('registrationDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Shop name</label>
                  <input
                    type="text"
                    value={formData.shopName}
                    onChange={(e) => handleInputChange('shopName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  rows={4}
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Input address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Save Seller
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddSellerForm;
