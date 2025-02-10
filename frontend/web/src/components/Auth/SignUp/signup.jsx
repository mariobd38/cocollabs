import React, { useState } from 'react';

import { useLocalStorage } from '@mantine/hooks';
// import { GOOGLE_AUTH_URL } from '../../../constants';
// import SignupContent from '@/components/Auth/SignUp/signupContent';
import SignupContentv2 from '@/components/Auth/SignUp/signupContentv2';

import './../auth.css';
import './signup.css'

const SignUp = () => {
    const [authOrigin, setAuthOrigin] = useLocalStorage({
        key: 'auth_origin',
        defaultValue: '',
    });

    const handleGoogleLogin = async () => {
        // window.location.href = `${GOOGLE_AUTH_URL}`;
        setAuthOrigin('signup');
    };

    return (
        <SignupContentv2
            handleGoogleLogin={handleGoogleLogin}
            showOAuth2Buttons={true}
        />
    );
};

export default SignUp;