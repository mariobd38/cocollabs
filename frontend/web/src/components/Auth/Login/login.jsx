import React, { useState } from 'react';

import { useLocalStorage } from '@mantine/hooks';

// import { GOOGLE_AUTH_URL } from '../../../constants';

import AuthHeader from './../authHeader';
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
        <div className='w-100'>
            <AuthHeader />
            <LoginContent 
                handleGoogleLogin={handleGoogleLogin}
                inputEmail={inputEmail}
                setInputEmail={setInputEmail}
                showOAuth2Buttons={true}
            />
        </div>
    );
};

export default Login;