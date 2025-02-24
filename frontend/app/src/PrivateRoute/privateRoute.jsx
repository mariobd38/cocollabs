import React, { useState, useEffect,useCallback } from 'react';
import { Navigate, useParams, useLocation, useNavigate } from 'react-router-dom';
import { UseAuth } from '@/hooks/authProvider';
// import { useUserSpaces } from '@/hooks/useUserSpaces';
import { useUserOrganizations } from '@/hooks/useUserOrganizations';
// import { UseLastActiveSpace } from '@/hooks/useLastActiveSpace';
import { UseLastActiveOrganization } from '@/hooks/useLastActiveOrg';

const PrivateRoute = ({ children }) => {
    const { slug } = useParams();
    const { userOrganizations } = useUserOrganizations();
    const location = useLocation();
    const { activeOrgSlug } = UseLastActiveOrganization();
    const navigate = useNavigate();
    const { isAuthenticated, isOnboarded, pending } = UseAuth();
    const [currentSlug, setCurrentSlug] = useState(activeOrgSlug);
    const isExplorePage = useCallback(() => location.pathname.endsWith('/explore'), [location.pathname]);

    // Update the currentSlug if the user has permission for the space
    // useEffect(() => {
    //     if (userOrganizations.length > 0 && slug) {
    //         const isPermittedOrg = userOrganizations.some(org => org.slug === slug);
    //         if (isPermittedOrg) {
    //             setCurrentSlug(slug);
    //         }
    //     }
    // }, [slug, userOrganizations]);

    // Redirect logic based on permissions and active space
    //TODO: uncomment
    // useEffect(() => {
    //     if (activeOrgSlug && activeOrgSlug.length > 0) {
    //         const isPermittedOrg = userOrganizations.some(org => org.slug === slug);

    //         if (!isPermittedOrg) {
    //             const targetPath = isExplorePage()
    //                 ? `/${activeOrgSlug}/explore`
    //                 : `/${activeOrgSlug}`;

    //             if (location.pathname !== targetPath) {
    //                 navigate(targetPath, { replace: true });
    //             }
    //         }
    //     }
    // }, [activeOrgSlug, isExplorePage, location.pathname, navigate, slug, userOrganizations]);
    // console.log(pending);
    if (pending) { 
        return ''; 
    }

    if (!isAuthenticated) { 
        return <Navigate to="/login" replace />; 
    }

    if (isAuthenticated && !isOnboarded && location.pathname !== '/onboarding') { 
        return <Navigate to="/onboarding" replace />; 
    }
    // Redirect to notFound if slug is invalid and spaces have loaded
    if (slug && !userOrganizations.some(org => org.slug === slug) && userOrganizations.length > 0 && !currentSlug) {
        return <Navigate to="/notFound" replace />;
    }

    return children;
};

export default PrivateRoute;
