import React, { useState } from 'react';

import { useLocalStorage } from '@mantine/hooks';

// import { GOOGLE_AUTH_URL } from '../../../constants';

import AuthHeader from './../authHeader';
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
        <div className='w-100'>
            <AuthHeader />
            <SignupContent 
                handleGoogleLogin={handleGoogleLogin}
                inputEmail={inputEmail}
                setInputEmail={setInputEmail}
                showOAuth2Buttons={true}
            />
        </div>
    );
};

export default SignUp;