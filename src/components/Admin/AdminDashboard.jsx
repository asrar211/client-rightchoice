import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-40 bg-white shadow-lg  md:block">
        <div className="p-6 text-2xl font-bold text-blue-600">
          Admin Panel
        </div>
        <nav className="mt-4">
          <ul className="space-y-2 px-4">
            <li>
              <Link to='/admin/users' className="block p-2 rounded hover:bg-blue-100">
                Users
              </Link>
            </li>
            <li>
              <Link to='/admin/products' className="block p-2 rounded hover:bg-blue-100">
                Products
              </Link>
            </li>
            <li>
              <Link to='/admin/categories' className="block p-2 rounded hover:bg-blue-100">
                Categories
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Admin</span>
            <img
              src="https://i.pravatar.cc/30"
              alt="Avatar"
              className="rounded-full w-8 h-8"
            />
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
