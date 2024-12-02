import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { UseAuth } from '@/hooks/authProvider';
import { useUserSpaces } from '@/hooks/useUserSpaces';
import { UseLastActiveSpace } from '@/hooks/UseLastActiveSpace';

const PrivateRoute = ({ children }) => {
    const { slug } = useParams();
    const { userSpaces } = useUserSpaces();
    const { activeSpaceSlug } = UseLastActiveSpace();

    const { isAuthenticated,isOnboarded,pending } = UseAuth();
    
    if (pending) {
        return null;
    }
    
    //check authentication
    // if (!isAuthenticated) {
    //     return <Navigate to="/notFound" replace />;
    // }
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    //check onboarding
    if (isAuthenticated && !isOnboarded) {
        return <Navigate to="/onboarding" replace />;
    }

    //check space permissions
    const isPermittedSpace = userSpaces.some(space => space.slug === slug);

    if (!isPermittedSpace && isAuthenticated && isOnboarded) {
        // Redirect to a default active space
        return <Navigate to={`/${activeSpaceSlug}`} replace />;
    }

    return children;
};

export default PrivateRoute;