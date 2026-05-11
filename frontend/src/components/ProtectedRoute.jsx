import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !user?.is_staff) {
    return <Navigate to="/panel" replace />;
  }

  return children;
};

export default ProtectedRoute;
