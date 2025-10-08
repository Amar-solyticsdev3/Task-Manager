import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {
  const user = useSelector((state) => state.user); // from your Redux slice

  if (user === null) return null; // wait for Redux to update

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are defined and user role is not allowed, redirect
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
