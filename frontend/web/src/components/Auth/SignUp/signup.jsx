import React, { useState } from 'react';

import { useLocalStorage } from '@mantine/hooks';
// import { GOOGLE_AUTH_URL } from '../../../constants';
import SignupContent from '@/components/Auth/SignUp/signupContent';

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
        <SignupContent
            handleGoogleLogin={handleGoogleLogin}
            inputEmail={inputEmail}
            setInputEmail={setInputEmail}
            showOAuth2Buttons={true}
        />
    );
};

export default SignUp;