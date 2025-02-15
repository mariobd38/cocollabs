import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '@mantine/hooks';
import { Title,Flex,TextInput,PasswordInput,Text,Paper,Group,Button,Divider,Anchor } from '@mantine/core';
import {Icons} from '@/components/icons/icons';
import { useForm } from '@mantine/form';

// import { GOOGLE_AUTH_URL } from '../../../constants';
// import { GoogleButton } from '@/components/Auth/OAuthButtons/googleIcon';
import { GithubButton } from '@/components/Auth/OAuthIcons/githubButton';

import { UseAuth } from '@/hooks/authProvider';
import { VerifyEmailRegex } from '@/utils/emailRegexFormat';
import { isOAuthUser } from '@/api/Users/isOAuthUser';
import { authStatusInfo } from '@/api/Auth/status';
import { getLastActiveSpaceInfo } from '@/api/Spaces/getLastActiveSpace';
// import { UseLastActiveSpace } from '@/hooks/useLastActiveSpace';
import AuthSideBlock from '@/components/Auth/authSideBlock';

import './../auth.css';
import './login.css'


const validatePassword = (value) => {
    if (!value.trim()) {
        return 'Password is required';
    }
    return null;
};

const validateEmail = (value) => {
    if (!value.trim()) {
        return 'Email is required';
    }
    if (!VerifyEmailRegex(value)) {
        return 'Please enter a valid email address';
    }
    return null;
}

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

    //from login content
    const [invalidEmailErrorText, setInvalidEmailErrorText] = useState('');
    const [invalidPasswordErrorText, setInvalidPasswordErrorText] = useState('');
    // const { setIsAuthenticated, setIsOnboarded } = UseAuth();
    const { updateAuthStatus } = UseAuth();

    const navigate = useNavigate(); 
    const routeChange = (path) => { 
        navigate(path);
    }

    const validateEmailLogin = async () => {
        // Clear previous error messages
        setInvalidEmailErrorText('');
        setInvalidPasswordErrorText('');

        // Skip backend validation if basic validation fails
        const email = form.values.email;
        const basicValidation = validateEmail(email);
        if (basicValidation) {
            setInvalidEmailErrorText(basicValidation);
            return false;
        }

        try {
            const isOAuth = await isOAuthUser(email);
            
            if (isOAuth) {
                setInvalidEmailErrorText('Invalid credentials. Try signing in with Google or GitHub.');
            }
            return !isOAuth;
        } catch (error) {
            console.error(error);
            setInvalidEmailErrorText('An error occurred while validating email.');
            return false;
        }
    };

    const form = useForm({
        initialValues: {
            email: inputEmail || '',
            password: '',
        },
        validate: {
            email: (value) => null, // Remove form-level email validation
            password: validatePassword
        },
    });

    // Update both form and parent state when email changes
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setInputEmail(value);
        form.setFieldValue('email', value);
        if (invalidEmailErrorText) {
            setInvalidEmailErrorText('');
        }
    };
    

    const handleSubmit = async (values) => {
        const { email,password } = values;
        const reqBody = {
            email,
            password,
        };
    
        try {
            setInvalidPasswordErrorText('');
            setInvalidEmailErrorText('');

            // Perform email validation before attempting login
            const validationSuccess = await validateEmailLogin();

            if (!validationSuccess) {
                return;
            }

            const loginResponse = await fetch("/api/auth/login", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(reqBody),
            });
    
            if (loginResponse.status === 200) {
                const loginData = await loginResponse.json();
                await updateAuthStatus();

                const { isAuthenticated, isOnboarded } = await authStatusInfo();
                if (isAuthenticated) {
                    if (isOnboarded) {
                        try {
                            const activeUserSpace = await getLastActiveSpaceInfo();
                            navigate(`/${activeUserSpace.slug}`, { state: { loginData } });
                        } catch(error) {
                            console.error("Could not redirect to user space:", error);
                        }
                        // navigate('/home', { state: { loginData } });
                    } else {
                        navigate('/onboarding', { state: { loginData } });
                    }
                }
    
            } else if (loginResponse.status === 401) {
                setInvalidPasswordErrorText('Invalid credentials');
            } else {
                throw new Error("Invalid login attempt");
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    return (
        <div className='min-h-dvh'>
            <div className='w-full bg-background'>
                <Flex w={{xs: 530, md: '100%'}} m='auto' >
                    
                    <AuthSideBlock isLogin={true} />

                    <div className='flex flex-col items-center justify-center w-full min-h-screen' >
                        <Paper w={{base: '100%', xs: 580}}  bg='transparent' >
                                
                            <Flex gap={5} direction='column' align='center'>
                                <Title className='signup-welcome-title' w='90%' fz={{base: '2rem', xs: '2.2rem', md: '2.3rem'}} fw={800} ta="center" c='#fafafa' ff='Nunito Sans'>
                                    Welcome back to Cocollabs
                                </Title>

                                <Text className='signup-welcome-subtitle' fz={{base: '0.8rem', xs: '0.93rem', md: '.95rem'}} c="#97999c" w='90%' fw={500} ta="center" mb="xl" ff='Nunito Sans'>
                                    Log in to continue where you left off.
                                </Text>
                            </Flex>
                                
                                
                            <div className='flex flex-col m-auto sm:w-[80%]' >
                                <div>
                                    <Flex mb="lg" gap={20} direction='column' >
                                        {/* <GoogleButton bd='1px solid #5c5c5c' c='#f0f0f0' size="sm" onClick={handleGoogleLogin} radius={6} p='8px 0' className='sign-up-oauth-button' fz={17} bg="transparent">
                                            <Text className='ms-2 oauth-button-text' fw={700} fz={{base: 16, xs: 17}}>Continue with Google</Text>
                                        </GoogleButton> */}
                                            
                                        {/* <GithubButton bd='1px solid #5c5c5c' c='#f0f0f0' size="sm" onClick={handleGoogleLogin} radius={6} p='8px 0' className='sign-up-oauth-button' fz={17} bg="transparent">
                                            <Text className='ms-2 oauth-button-text' fw={700} fz={{base: 16, xs: 17}}>Continue with Github</Text>
                                        </GithubButton> */}

                                        {/* <SlackButton size="md" radius="md" px="0" className='py-2 sign-up-oauth-button' style={{fontSize: "17px",background: "#fafafa"}}>Continue with Slack</SlackButton> */}
                                    </Flex>

                                    <Divider label="or" color='#929292' className='auth-content-wrapper-paper-divider' labelPosition="center" my={30} />
                                </div>
                                
                                <form onSubmit={form.onSubmit(handleSubmit)}>
                                    <div>
                                        <Flex align='flex-start' gap={10} direction='column'>
                                            <div className='w-full'>
                                                <TextInput
                                                    label='Email'
                                                    type="text"
                                                    placeholder=""
                                                    leftSection={Icons('IconMail',18,18,'#a2a2a2',2)}
                                                    autoComplete='off'
                                                    value={inputEmail}
                                                    onChange={(e) => {
                                                        handleEmailChange(e);
                                                        form.getInputProps('email').onChange(e);
                                                    }}
                                                    // onChange={(e) => setInputEmail(e.target.value)}
                                                    className='auth-user-input-field'
                                                    key={form.key('email')}
                                                    {...form.getInputProps('email')}
                                                    size="lg"
                                                />
                                                { invalidEmailErrorText.length > 0 && 
                                                <Text fz={14.5} c='#dc5050' py={5} fw={400}>
                                                    {invalidEmailErrorText}
                                                </Text> }
                                            </div>

                                            <div className='w-full'>
                                                <PasswordInput
                                                    label="Password"
                                                    type="password"
                                                    autoComplete='off'
                                                    placeholder=""
                                                    // leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={2.5}/>}
                                                    leftSection={Icons('IconLock',18,18,'#717171',2.5)}
                                                    className='auth-user-input-field '
                                                    size="lg"
                                                    radius="md"
                                                    key={form.key('password')}
                                                    {...form.getInputProps('password')}
                                                />
                                                { invalidPasswordErrorText.length > 0 && 
                                                <Text fz={14.5} c='#ec4848' pt={5} fw={400} >
                                                    {invalidPasswordErrorText}
                                                </Text> }  
                                            </div>
                                        </Flex>
                                        
                                    </div>

                                    <Group justify='space-between' pt={30} >
                                        <div className='flex items-center'>
                                            <Text c="#97999c" size="sm" ff='Nunito Sans'>
                                                Don&apos;t have an account?
                                            </Text>
                                            <Anchor className='cursor-pointer' onClick={() => routeChange('/signup')} ps={5} c="#2b93f0" size="sm" ff='Nunito Sans'>
                                                Sign up
                                            </Anchor>
                                        </div>
                                        
                                        <Button bg='transparent' bd='1px solid #5c5c5c' c='#f0f0f0' type="submit" className='auth-content-signup-button' radius={6} px="18" py="3" fw={700} fz={15} onClick={validateEmailLogin}>
                                            Continue
                                        </Button>
                                    </Group>
                                </form>
                            </div>
                        </Paper>
                    </div>
                </Flex>
            </div>
        </div>
    );
};

export default Login;