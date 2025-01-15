import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { authStatusInfo } from '@/api/Auth/status';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        isOnboarded: false,
    });
    const [pending, setPending] = useState(true);
    const location = useLocation();

    // const checkAuthStatus = useCallback(async () => {
    //     try {
    //         const response = await authStatusInfo();
    //         setAuthState({
    //             isAuthenticated: response.isAuthenticated,
    //             isOnboarded: response.isOnboarded,
    //         });
    //     } catch (error) {
    //         console.error('Auth check failed:', error);
    //         setAuthState({
    //             isAuthenticated: false,
    //             isOnboarded: false,
    //         });
    //     } 
    //     finally {
    //         setPending(false); // Auth check is done
    //     }
    // }, []);
    const authStatusInfo = async () => {
        try {
            const response = await fetch('/api/auth/status', {
                credentials: 'include'
            });
            
            // Log the response status
            //console.log('Auth status response:', response.status);
            
            if (response.status === 401) {
                //console.log("Token expired or missing, attempting refresh");
                
                const refreshResponse = await fetch('/api/auth/refresh', {
                    method: 'POST',
                    credentials: 'include'
                });
                
                //console.log('Refresh response status:', refreshResponse.status);
                
                if (!refreshResponse.ok) {
                    const errorText = await refreshResponse.text();
                    //console.log('Refresh failed:', errorText);
                    throw new Error(`Refresh failed: ${errorText}`);
                }
                
                // After successful refresh, retry auth status
                //console.log('Refresh successful, retrying auth status');
                const newResponse = await fetch('/api/auth/status', {
                    credentials: 'include'
                });
                
                //console.log('New auth status response:', newResponse.status);
                return newResponse.json();
            }
            
            return response.json();
        } catch (error) {
            console.error('Auth error:', error);
            throw error;
        }
    };
    
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