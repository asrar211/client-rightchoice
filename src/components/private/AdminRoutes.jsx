import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) return <p>Loading...</p>;

  if (!user|| !user.isAdmin) {
    return <Navigate to="/" replace/>;
  }

  return children;
};

export default AdminRoute;
