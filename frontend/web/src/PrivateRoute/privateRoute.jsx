import React from 'react';
import { Navigate } from 'react-router-dom';
import { UseAuth } from '@/AuthContext/authProvider';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isOnboarded,pending } = UseAuth();
    if (pending) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (isAuthenticated && !isOnboarded) {
        return <Navigate to="/onboarding" replace />;
    }

    return children;
};

export default PrivateRoute;