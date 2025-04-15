import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export const Profile = () => {
  const { user, logout, authLoading } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700 font-medium">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white border border-gray-200 shadow-md rounded-xl p-8 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Admin Button */}
        {user?.isAdmin && (
          <div className="col-span-2 text-right">
            <Link to="/admin">
              <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-md font-medium shadow-sm">
                <span className="material-symbols-outlined text-sm">dashboard</span>
                Admin Dashboard
              </button>
            </Link>
          </div>
        )}

        {/* Profile Icon */}
        <div className="flex justify-center md:justify-start items-center">
          <span className="material-symbols-outlined text-gray-300 text-8xl">
            account_circle
          </span>
        </div>

        {/* User Info */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600 mt-1 text-sm">{user.email}</p>
          <p className="text-gray-500 text-xs mt-1 capitalize">{user.role}</p>
        </div>

        {/* Account Information */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Account Information</h3>
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-md space-y-2 text-sm text-gray-700">
            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            <p><strong>Phone:</strong> {user.phone || 'Not Provided'}</p>
          </div>
        </div>

        {/* Order History */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Order History</h3>
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-md space-y-3 text-sm text-gray-700">
            {user.orders?.length > 0 ? (
              <ul className="space-y-2">
                {user.orders.map((order) => (
                  <li key={order._id}>
                    <Link
                      to={`/order/${order._id}`}
                      className="block bg-white border hover:border-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-blue-700 font-medium"
                    >
                      Order #{order._id.slice(-5)} &mdash; {order.status}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">You have no orders yet.</p>
            )}
          </div>
        </div>


        <div className="col-span-2">
        <button
        type="submit"
        disabled={authLoading}
        onClick={handleLogout}
        className={`w-full py-2 rounded text-white ${
          authLoading ? "bg-blue-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
        } transition-all duration-200 flex justify-center items-center gap-2`}
      >
            {authLoading ? (
          <div className="animate-spin rounded-full border-t-2 border-white w-6 h-6" />
        ) : (
          "Log Out"
        )}
          </button>
        </div>
      </div>
    </div>
  );
};
