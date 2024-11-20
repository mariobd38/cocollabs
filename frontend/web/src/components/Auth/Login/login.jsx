import React, { useState } from 'react';

import { useLocalStorage } from '@mantine/hooks';
import { Box } from '@mantine/core';

// import { GOOGLE_AUTH_URL } from '../../../constants';

import LoginContent from './loginContent';

import './../auth.css';
import './login.css'

const Login = () => {
    const [inputEmail,setInputEmail] = useState("");
    const [authOrigin, setAuthOrigin] = useLocalStorage({
        key: 'auth_origin',
        defaultValue: '',
    });

    const handleGoogleLogin = async () => {
        // window.location.href = `${GOOGLE_AUTH_URL}`;
        setAuthOrigin('login');
    };

    return (
        <Box w='100%' mih='100dvh' >
            <LoginContent
                handleGoogleLogin={handleGoogleLogin}
                inputEmail={inputEmail}
                setInputEmail={setInputEmail}
                showOAuth2Buttons={true}
            />
        </Box>
    );
};

export default Login;