import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        isOnboarded: false,
    });
    const [pending, setPending] = useState(true);
    const location = useLocation();

    const authStatusInfo = async () => {
        try {
            const response = await fetch('/api/auth/status', {
                credentials: 'include'
            });
            
            const data = await response.json();
            
            // If not authenticated, try refresh
            if (!data.isAuthenticated) {
                try {
                    const refreshResponse = await fetch('/api/auth/refresh', {
                        method: 'POST',
                        credentials: 'include'
                    });
                    
                    if (!refreshResponse.ok) {
                        return { isAuthenticated: false, isOnboarded: false };
                    }
                    
                    // After successful refresh, retry auth status
                    const newResponse = await fetch('/api/auth/status', {
                        credentials: 'include'
                    });
                    
                    return newResponse.json();
                } catch (error) {
                    return { isAuthenticated: false, isOnboarded: false };
                }
            }
            
            return data;
        } catch (error) {
            return { isAuthenticated: false, isOnboarded: false };
        }
    };
    
    const checkAuthStatus = useCallback(async () => {
        try {
            const response = await authStatusInfo();
            setAuthState({ isAuthenticated: response.isAuthenticated, isOnboarded: response.isOnboarded });
        } catch (error) {
            setAuthState({ isAuthenticated: false, isOnboarded: false });
        } finally {
            setPending(false);
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