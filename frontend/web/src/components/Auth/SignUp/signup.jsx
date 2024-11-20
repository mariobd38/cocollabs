import React, { useState } from 'react';

import { useLocalStorage } from '@mantine/hooks';
// import { GOOGLE_AUTH_URL } from '../../../constants';
import { Box } from '@mantine/core';
import SignupContent from './signupContent';

import './../auth.css';
import './signup.css'

const SignUp = () => {
    const [inputEmail,setInputEmail] = useState("");
    const [authOrigin, setAuthOrigin] = useLocalStorage({
        key: 'auth_origin',
        defaultValue: '',
    });

    const handleGoogleLogin = async () => {
        // window.location.href = `${GOOGLE_AUTH_URL}`;
        setAuthOrigin('signup');
    };

    return (
        <Box w='100%' mih='100dvh' >
            <SignupContent
                handleGoogleLogin={handleGoogleLogin}
                inputEmail={inputEmail}
                setInputEmail={setInputEmail}
                showOAuth2Buttons={true}
            />
        </Box>
    );
};

export default SignUp;