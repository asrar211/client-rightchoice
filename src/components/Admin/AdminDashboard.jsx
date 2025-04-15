import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const AdminDashboard = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg md:block transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-40" : "w-0 overflow-hidden"
        }`}
      >
        {isSidebarOpen && (
          <>
            <div className="p-6 text-2xl font-bold text-blue-600">
              Admin Panel
            </div>
            <nav className="mt-4">
              <ul className="space-y-2 px-4">
                <li>
                  <Link
                    to="/admin/users"
                    className="block p-2 rounded hover:bg-blue-100"
                    onClick={closeSidebar}
                  >
                    Users
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/products"
                    className="block p-2 rounded hover:bg-blue-100"
                    onClick={closeSidebar}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categories"
                    className="block p-2 rounded hover:bg-blue-100"
                    onClick={closeSidebar}
                  >
                    Categories
                  </Link>
                </li>
              </ul>
            </nav>
          </>
        )}
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow px-4 py-4 flex justify-between items-center">
          <button onClick={toggleSidebar} className="md:hidden text-gray-600">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <h1 className="text-xl font-semibold">Dashboard</h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
