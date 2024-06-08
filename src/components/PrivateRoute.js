import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth();
  const { allowedRoles = ['reader'] } = rest;

  return (user && allowedRoles.find((role) => role === user.role) ? (
      element
    ) : (
      <Navigate
        to="/" replace
      />
    )
  )
};

export default PrivateRoute;
