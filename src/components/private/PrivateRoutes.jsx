import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoutes = ({ children }) => {
  const { isAuthenticated, authLoading } = useContext(AuthContext);

  if (authLoading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
