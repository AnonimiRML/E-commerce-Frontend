import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component }) => {
  const { user, token } = useAuth();

  if (!token || !user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return <Component />;
};

export default ProtectedRoute;
