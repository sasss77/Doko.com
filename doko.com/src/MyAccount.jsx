import React from "react";

const MyAccount = () => {
  return (
    <div className="bg-white font-sans text-sm text-gray-700 min-h-screen">
      <div className="flex justify-between items-center p-4 text-xs text-gray-500">
        <nav className="space-x-1">
          <a href="#" className="hover:underline">Home</a> /
          <span className="text-gray-700 hover:text-black"> My Account</span>
        </nav>
      </div>

      <div className="flex max-w-6xl mx-auto p-6">
        <aside className="w-1/4 pr-6 border-r">
          <div className="mb-6">
            <h3 className="font-semibold text-black mb-2">Manage My Account</h3>
            <ul className="space-y-1 text-sm text-gray-600 pr-12">
              <li className="text-red-500 font-medium">My Profile</li>
              <li><a href="#" className="hover:text-black">Address Book</a></li>
              <li><a href="#" className="hover:text-black">My Payment Options</a></li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold text-black mb-2">My Orders</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">My Returns</a></li>
              <li><a href="#" className="hover:text-black">My Cancellations</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-black mb-2">My Wishlist</h3>
          </div>
        </aside>

        <main className="flex-1 pl-6">
          <h2 className="text-lg font-semibold text-red-600 mb-4">Edit Your Profile</h2>

          <form className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  placeholder="....."
                  className="w-full mt-1 px-3 py-2 border rounded bg-gray-100"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  placeholder="....."
                  className="w-full mt-1 px-3 py-2 border rounded bg-gray-100"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full mt-1 px-3 py-2 border rounded bg-gray-100"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  className="w-full mt-1 px-3 py-2 border rounded bg-gray-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password Changes</label>
              <input
                type="password"
                placeholder="Current Password"
                className="w-full mb-2 px-3 py-2 border rounded bg-gray-100"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full mb-2 px-3 py-2 border rounded bg-gray-100"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full px-3 py-2 border rounded bg-gray-100"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button type="button" className="px-4 py-2 rounded border hover:bg-gray-100">
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 rounded bg-red-500 text-white hover:bg-red-600">
                Save Changes
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default MyAccount;
//My account 