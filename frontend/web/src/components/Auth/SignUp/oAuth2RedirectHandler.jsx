import { useEffect } from 'react';

import { readLocalStorageValue } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { OAUTH2_CALLBACK_URI } from '../../../constants';

import { UseAuth } from '../../../AuthContext/authProvider';

const OAuth2RedirectHandler = () => {
    const { setIsAuthenticated, setIsOnboarded } = UseAuth();
    
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
                        setIsAuthenticated(true);
            
                        // Fetch onboarding status based on the email or user ID
                        const onboardResponse = await fetch(`/api/user/isUserOnboarded?email=${loginData.email}`, {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });
            
                        if (onboardResponse.status === 200) {
                            const isOnboarded = await onboardResponse.json();
            
                            if (isOnboarded) {
                                setIsOnboarded(true);
                                // If the user is onboarded, navigate to the home page
                                navigate('/home', { state: { loginData } });
                            } else {
                                setIsOnboarded(false);
                                // If the user is not onboarded, navigate to onboarding
                                navigate('/onboarding', { state: { loginData } });
                            }
                        } else {
                            throw new Error("Failed to check onboarding status");
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
    }, [navigate, setIsAuthenticated, setIsOnboarded]);
};

export default OAuth2RedirectHandler;
