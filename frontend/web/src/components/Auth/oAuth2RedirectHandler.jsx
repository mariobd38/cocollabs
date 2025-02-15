import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { readLocalStorageValue } from '@mantine/hooks';
import { OAUTH2_CALLBACK_URI } from '@/constants';

import { UseAuth } from '@/hooks/authProvider';

import { authStatusInfo } from '@/api/Auth/status';

const OAuth2RedirectHandler = () => {
    const { updateAuthStatus } = UseAuth();
    
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const error = params.get('error');
        const authOrigin = readLocalStorageValue({ key: 'auth_origin' });

        if (code) {
            // fetch(`${OAUTH2_CALLBACK_URI}?code=${code}&authOrigin=${authOrigin}`, {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     credentials: 'include',
            // }).then((response) => {
            //     if (!response.ok) {
            //         throw new Error("Network response was not ok");
            //     }
            //     return response.json();
            // })
            // .then((data) => {
            //     setIsAuthenticated(true);
            //     if (authOrigin === 'login') {
            //         navigate('/home', { state: { data: data } });
            //     } else if (authOrigin === 'signup') {
            //         navigate('/onboarding', { state: { data: data } });
            //     } else {
            //         navigate('/');
            //     }
            //     localStorage.removeItem('auth_origin');
            // })
            // .catch((error) => {
            //     console.error(error); 
            // });
            fetch(`${OAUTH2_CALLBACK_URI}?code=${code}&authOrigin=${authOrigin}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(async (loginData) => {
                    if (loginData) {
                        await updateAuthStatus();

                        const { isAuthenticated, isOnboarded } = await authStatusInfo();
                        if (isAuthenticated) {
                            if (isOnboarded) {
                                navigate('/home', { state: { loginData } });
                            } else {
                                navigate('/onboarding', { state: { loginData } });
                            }
                        }
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    localStorage.removeItem('auth_origin');
                });

            
        } 
        else {
        console.error('Error during authentication:', error);
        //   navigate('/login');
        }
    }, [navigate,updateAuthStatus]);
};

export default OAuth2RedirectHandler;
