import React from 'react';
import { Navigate } from 'react-router-dom';
import { UseAuth } from '../AuthContext/authProvider';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated,isOnboarded } = UseAuth();
    // return isAuthenticated && !isOnboarded ? children : <Navigate to="/login" />;
    return isAuthenticated && isOnboarded ? children : (isAuthenticated) ? <Navigate to="/onboarding" /> : 
    <Navigate to="/login" />;
};

export default PrivateRoute;