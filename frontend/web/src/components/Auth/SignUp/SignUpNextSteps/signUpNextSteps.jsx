import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import AuthHeader from '../../authHeader';
import SignupContent from '../signupContent';
import SignupContentv2 from '../signupContentv2';

import { VerifyEmailRegex } from '../../../../utils/emailRegexFormat';
import { userExists } from '../../../../DataManagement/Users/userExists';

const SignUpNextSteps = (props) => {
    let navigate = useNavigate();
    const location = useLocation();

    // Extract email from the query parameters
    const queryParams = new URLSearchParams(location.search);
    const inputEmail = queryParams.get('email') || '';
    useEffect(() => {

    const checkUserExists = async () => {
        if (!inputEmail || !VerifyEmailRegex(inputEmail)) {
            navigate('/signup');
            return;
        }

        try {
            const exists = await userExists(inputEmail);
            if (exists) {
                navigate('/signup');
            } else {
                navigate(`/app/signup?email=${inputEmail}`);
            }
        } catch (error) {
            console.error(error);
            navigate('/signup');
        }
    };

        checkUserExists();
        
    }, [inputEmail, navigate]);

    // const [email,setEmail] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className='w-100'>
            {/* <AuthHeader /> */}
            <SignupContentv2
                inputEmail={inputEmail}
                isFocused={isFocused}
                setIsFocused={setIsFocused}
                showOAuth2Buttons={false}
                nextSteps={true}
            />
        </div>
    );
};

export default SignUpNextSteps;