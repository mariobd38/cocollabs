import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { authStatusInfo } from '@/api/Auth/status';

const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     // State for checking if user is authenticated
//     const [isAuthenticated, setIsAuthenticated] = useState(() => {
//         const storedIsAuthenticated = Cookies.get('isAuthenticated');
//         return storedIsAuthenticated === 'true';
//     });

//     // State for checking if user has completed onboarding
//     const [isOnboarded, setIsOnboarded] = useState(() => {
//         const storedIsOnboarded = Cookies.get('isOnboarded');
//         return storedIsOnboarded === 'true';
//     });

//     // Store isAuthenticated in a cookie
//     useEffect(() => {
//         Cookies.set('isAuthenticated', isAuthenticated, { expires: 31 });
//     }, [isAuthenticated]);

//     // Store isOnboarded in a cookie
//     useEffect(() => {
//         Cookies.set('isOnboarded', isOnboarded, { expires: 31 });
//     }, [isOnboarded]);

//     return (
//         <AuthContext.Provider 
//             value={{ 
//                 isAuthenticated, 
//                 setIsAuthenticated, 
//                 isOnboarded, 
//                 setIsOnboarded 
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const UseAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        isOnboarded: false,
    });
    const [pending, setPending] = useState(true);
    const location = useLocation();

    const checkAuthStatus = useCallback(async () => {
        try {
            const response = await authStatusInfo();
            setAuthState({
                isAuthenticated: response.isAuthenticated,
                isOnboarded: response.isOnboarded,
            });
        } catch (error) {
            console.error('Auth check failed:', error);
            setAuthState({
                isAuthenticated: false,
                isOnboarded: false,
            });
        } 
        finally {
            setPending(false); // Auth check is done
        }
    }, []);

    // Initial auth check
    useEffect(() => {
        if (location.pathname !== '/')
            checkAuthStatus();
    }, [checkAuthStatus,location]);

    const updateAuthStatus = useCallback(async () => {
        await checkAuthStatus();
    }, [checkAuthStatus]);

    return (
        <AuthContext.Provider 
            value={{ 
                isAuthenticated: authState.isAuthenticated,
                isOnboarded: authState.isOnboarded,
                updateAuthStatus,
                pending
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const UseAuth = () => useContext(AuthContext);