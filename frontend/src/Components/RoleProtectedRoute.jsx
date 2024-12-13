import React from 'react';
import { Navigate } from 'react-router-dom';

export const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem('role'); 

  if (!allowedRoles.includes(userRole)) {
    alert('Access Denied: You do not have the required role to view this page.');
    return <Navigate to="/" />; 
  }

  return children; 
};