import React, { useState, useEffect,useCallback } from 'react';
import { Navigate, useParams, useLocation, useNavigate } from 'react-router-dom';
import { UseAuth } from '@/hooks/authProvider';
import { useUserSpaces } from '@/hooks/useUserSpaces';
import { UseLastActiveSpace } from '@/hooks/useLastActiveSpace';

// const PrivateRoute = ({ children }) => {
//     const { slug } = useParams();
//     const { userSpaces } = useUserSpaces();
//     const location = useLocation();
//     const { activeSpaceSlug } = UseLastActiveSpace();
//     const navigate = useNavigate();
//     const { isAuthenticated,isOnboarded,pending } = UseAuth();
//     const [currentSlug, setCurrentSlug] = useState(activeSpaceSlug);


//     useEffect(() => {
//         const isPermittedSpace = userSpaces.some(space => space.slug === slug);
        
//         if (isPermittedSpace) {
//             setCurrentSlug(slug);
//         }

//     },[slug,userSpaces])
    
//     if (pending) {
//         return '';
//     }
    
//     if (!isAuthenticated) {
//         return <Navigate to="/login" replace />;
//     }
    
//     //check onboarding
//     if (isAuthenticated && !isOnboarded) {
//         return <Navigate to="/onboarding" replace />;
//     }

//     //check space permissions
//     const isPermittedSpace = userSpaces.some(space => space.slug === slug);


//     if (currentSlug && !isPermittedSpace && isAuthenticated && isOnboarded) {
//         // Avoid unnecessary re-renders by checking the pathname only once
//         const targetPath = location.pathname.endsWith('/explore')
//             ? `/${currentSlug}/explore`
//             : `/${currentSlug}`;

//         // Redirect the user only if the target path is different from the current path
//         if (location.pathname !== targetPath) {
//             navigate(targetPath, { replace: true });
//         }
//     }

//     return children;
// };

// export default PrivateRoute;

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
        if (currentSlug && userSpaces.length > 0) {
            const isPermittedSpace = userSpaces.some(space => space.slug === slug);

            if (!isPermittedSpace) {
                const targetPath = isExplorePage()
                    ? `/${currentSlug}/explore`
                    : `/${currentSlug}`;

                if (location.pathname !== targetPath) {
                    navigate(targetPath, { replace: true });
                }
            }
        }
    }, [currentSlug, isExplorePage, location.pathname, navigate, slug, userSpaces]);

    if (pending) {
        return '';
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (isAuthenticated && !isOnboarded) {
        return <Navigate to="/onboarding" replace />;
    }

    // Redirect to notFound if slug is invalid and spaces have loaded
    if (slug && !userSpaces.some(space => space.slug === slug) && userSpaces.length > 0 && !currentSlug) {
        return <Navigate to="/notFound" replace />;
    }

    // Redirect to explore page if no slug is present but a currentSlug exists
    if (isExplorePage() && !slug && currentSlug) {
        return <Navigate to={`/${currentSlug}/explore`} replace />;
    }

    return children;
};

export default PrivateRoute;
