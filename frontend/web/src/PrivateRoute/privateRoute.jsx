import React from 'react';
import { Navigate, useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { UseAuth } from '@/hooks/authProvider';
import { useUserSpaces } from '@/hooks/useUserSpaces';
import { UseLastActiveSpace } from '@/hooks/useLastActiveSpace';

const PrivateRoute = ({ children }) => {
    const { slug } = useParams();
    const { userSpaces } = useUserSpaces();
    const location = useLocation();
    const { activeSpaceSlug } = UseLastActiveSpace();
    const navigate = useNavigate();

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
        // Avoid unnecessary re-renders by checking the pathname only once
        const targetPath = location.pathname.endsWith('/explore')
            ? `/${activeSpaceSlug}/explore`
            : `/${activeSpaceSlug}`;

        // Redirect the user only if the target path is different from the current path
        if (location.pathname !== targetPath) {
            navigate(targetPath, { replace: true });
        }
    }

    return children;
};

export default PrivateRoute;