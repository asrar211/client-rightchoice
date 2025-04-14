import React from "react";
import AdminDashboard from "../../components/Admin/AdminDashboard";

const DashboardHome = ({children}) => {
  return (
    <AdminDashboard>
      <h2 className="text-2xl font-bold mb-4">Welcome, Admin!</h2>
      <p className="text-gray-600">Here’s a quick summary of today’s activity.</p>
      {children}
    </AdminDashboard>
  );
};

export default DashboardHome;
