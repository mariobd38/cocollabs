import Cookies from 'js-cookie';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(() => {
//         const storedIsAuthenticated = Cookies.get('isAuthenticated');
//         return storedIsAuthenticated === 'true';
//     });

//     useEffect(() => {
//         Cookies.set('isAuthenticated', isAuthenticated, { expires: 31 });
//     }, [isAuthenticated]);


//     return (
//         <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
export const AuthProvider = ({ children }) => {
    // State for checking if user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedIsAuthenticated = Cookies.get('isAuthenticated');
        return storedIsAuthenticated === 'true';
    });

    // State for checking if user has completed onboarding
    const [isOnboarded, setIsOnboarded] = useState(() => {
        const storedIsOnboarded = Cookies.get('isOnboarded');
        return storedIsOnboarded === 'true';
    });

    // Store isAuthenticated in a cookie
    useEffect(() => {
        Cookies.set('isAuthenticated', isAuthenticated, { expires: 31 });
    }, [isAuthenticated]);

    // Store isOnboarded in a cookie
    useEffect(() => {
        Cookies.set('isOnboarded', isOnboarded, { expires: 31 });
    }, [isOnboarded]);

    return (
        <AuthContext.Provider 
            value={{ 
                isAuthenticated, 
                setIsAuthenticated, 
                isOnboarded, 
                setIsOnboarded 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const UseAuth = () => useContext(AuthContext);