import React, { useState, useEffect,useCallback } from 'react';
import { Navigate, useParams, useLocation, useNavigate } from 'react-router-dom';
import { UseAuth } from '@/hooks/authProvider';
import { useUserSpaces } from '@/hooks/useUserSpaces';
import { UseLastActiveSpace } from '@/hooks/useLastActiveSpace';

const PrivateRoute = ({ children }) => {
    const { slug } = useParams();
    const { userSpaces } = useUserSpaces();
    const location = useLocation();
    const { activeSpaceSlug } = UseLastActiveSpace();
    const navigate = useNavigate();
    const { isAuthenticated, isOnboarded, pending } = UseAuth();
    const [currentSlug, setCurrentSlug] = useState(activeSpaceSlug);

    const isExplorePage = useCallback(() => location.pathname.endsWith('/explore'), [location.pathname]);

    // Update the currentSlug if the user has permission for the space
    useEffect(() => {
        if (userSpaces.length > 0 && slug) {
            const isPermittedSpace = userSpaces.some(space => space.slug === slug);
            if (isPermittedSpace) {
                setCurrentSlug(slug);
            }
        }
    }, [slug, userSpaces]);

    // Redirect logic based on permissions and active space
    useEffect(() => {
        if (activeSpaceSlug && userSpaces.length > 0) {
            const isPermittedSpace = userSpaces.some(space => space.slug === slug);

            if (!isPermittedSpace) {
                const targetPath = isExplorePage()
                    ? `/${activeSpaceSlug}/explore`
                    : `/${activeSpaceSlug}`;

                if (location.pathname !== targetPath) {
                    navigate(targetPath, { replace: true });
                }
            }
        }
    }, [activeSpaceSlug, isExplorePage, location.pathname, navigate, slug, userSpaces]);

    if (pending) { return ''; }

    if (!isAuthenticated) { return <Navigate to="/login" replace />; }

    if (isAuthenticated && !isOnboarded && location.pathname !== '/onboarding') { return <Navigate to="/onboarding" replace />; }

    // Redirect to notFound if slug is invalid and spaces have loaded
    if (slug && !userSpaces.some(space => space.slug === slug) && userSpaces.length > 0 && !currentSlug) {
        return <Navigate to="/notFound" replace />;
    }

    return children;
};

export default PrivateRoute;
