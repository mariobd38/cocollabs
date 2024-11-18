import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import AuthHeader from '../../authHeader';
import LoginContent from '../loginContent';

import { VerifyEmailRegex } from '../../../../utils/emailRegexFormat';
import { userExists } from '../../../../api/Users/userExists';
import { isOAuthUser } from '../../../../api/Users/isOAuthUser';

const LoginNextSteps = (props) => {
    let navigate = useNavigate();
    const location = useLocation();

    // Extract email from the query parameters
    const queryParams = new URLSearchParams(location.search);
    const inputEmail = queryParams.get('email') || '';
    useEffect(() => {

    const checkUserExists = async () => {
        if (!inputEmail || !VerifyEmailRegex(inputEmail)) {
            navigate('/login');
            return;
        }

        try {
            const exists = await userExists(inputEmail);
            const isOAuth = await isOAuthUser(inputEmail);
            if (exists && !isOAuth) {
                navigate(`/app/login?email=${inputEmail}`);
            } else {
                navigate('/login');
            }
        } catch (error) {
            // console.error(error);
            navigate('/login');
        }
    };

    checkUserExists();
    }, [inputEmail, navigate]);

    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className='w-100'>
            <AuthHeader />
            <LoginContent 
                inputEmail={inputEmail}
                isFocused={isFocused}
                setIsFocused={setIsFocused}
                showOAuth2Buttons={false}
                nextSteps={true}
            />
        </div>
    );
};

export default LoginNextSteps;