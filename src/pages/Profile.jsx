import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg text-gray-600">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md text-center">

        {user?.isAdmin && (
          <div className="mb-4 text-right">
            <Link to="/admin">
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-200 inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-base">dashboard</span>
                Admin Dashboard
              </button>
            </Link>
          </div>
        )}

        <div className="flex justify-center mb-6">
          <span className="material-symbols-outlined text-gray-400 text-7xl">
            account_circle
          </span>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
        <p className="text-gray-500 mb-6">{user.email}</p>

        <button
          onClick={handleLogout}
          className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition duration-200 inline-flex justify-center items-center gap-2"
        >
          <span className="material-symbols-outlined text-base">logout</span>
          Logout
        </button>
      </div>
    </div>
  );
};
