import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {Icons} from '@/components/Logo/logo2';
import { GoogleButton } from '@/components/Auth/OAuthButtons/googleButton';

import {TextInput,PasswordInput,Text,Paper,Group,Button,Divider,Anchor,Stack,Image} from '@mantine/core';
import { useForm } from '@mantine/form';

import { userExists } from '@/api/Users/userExists';
import { isOAuthUser } from '@/api/Users/isOAuthUser';

import { VerifyEmailRegex } from '@/utils/emailRegexFormat';
import { UseAuth } from '@/AuthContext/authProvider';

import login from '../../../assets/illustrations/login/login.png';

const validatePassword = (value) => {
    if (!value.trim()) {
        return 'Password is required';
    }
    return null;
};

const LoginContent = (props) => {
    
    const { handleGoogleLogin,setInputEmail,showOAuth2Buttons,inputEmail,nextSteps } = props;

    const { setIsAuthenticated, setIsOnboarded } = UseAuth();

    const [invalidEmailErrorText, setInvalidEmailErrorText] = useState('');
    const [invalidPasswordErrorText, setInvalidPasswordErrorText] = useState('');
    const navigate = useNavigate(); 

    const routeChange = (path) =>{ 
        navigate(path);
    }
    const validateEmailLogin = async () => {
        let userExistsVar = false;
        let isOAuth = false;
        if (inputEmail) {
            try {
                userExistsVar = await userExists(inputEmail);
                isOAuth = await isOAuthUser(inputEmail);
            } catch (error) {
                console.error(error); 
            }
        }
        if (inputEmail === '' || !VerifyEmailRegex(inputEmail)) {
            setInvalidEmailErrorText('Please enter a valid email address.');
        } else if (!userExistsVar) {
            setInvalidEmailErrorText(`The email you entered is not registered. Please create an account.`);
        } else if (isOAuth) {
            setInvalidEmailErrorText(`You have no password set. Please login with a third party provider.`);
        } else {
            setInvalidEmailErrorText('');
            navigate(`/app/login?email=${inputEmail}`);
        }
    }

    const form = useForm({
        initialValues: {
            password: '',
        },

        validate: {
            password: validatePassword
        },
    });


    // const handleLoginWithEmailRequest = async (values) => {

    //     const password = values.password;
    //     const reqBody = {
    //         email: inputEmail,
    //         password: password,
    //     };
    //     try {
    //         const response = await fetch("/api/auth/login", {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             method: "post",
    //             body: JSON.stringify(reqBody),
    //         });

    //         if (response.status === 200) {
    //             const data = await response.json();
    //             setIsAuthenticated(true);
    //             navigate('/home', { state: { data }});
    //         } else if (response.status === 401) {
    //             setInvalidPasswordErrorText('Invalid Password');
    //         } else {
    //             throw new Error("Invalid login attempt");
    //         }
    //     } catch (error) {
    //         //console.error(error);
    //     }
    // }
    const handleLoginWithEmailRequest = async (values) => {
        const password = values.password;
        const reqBody = {
            email: inputEmail,
            password: password,
        };
    
        try {
            // First, make the login request
            const loginResponse = await fetch("/api/auth/login", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(reqBody),
            });
    
            if (loginResponse.status === 200) {
                const loginData = await loginResponse.json();
                setIsAuthenticated(true);
    
                // After login, check if the user is onboarded
                const onboardResponse = await fetch(`/api/user/isUserOnboarded?email=${inputEmail}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
    
                if (onboardResponse.status === 200) {
                    const isOnboarded = await onboardResponse.json();
                    if (isOnboarded) {
                        setIsOnboarded(true);
                        
                        navigate('/home', { state: { loginData } });
                    } else {
                        setIsOnboarded(false);
                        // navigate('/onboarding');
                        navigate('/onboarding', { state: { loginData } });
                    }
                } else {
                    throw new Error("Failed to check onboarding status");
                }
    
            } else if (loginResponse.status === 401) {
                setInvalidPasswordErrorText('Invalid Password');
            } else {
                throw new Error("Invalid login attempt");
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    };
    

    return (

        <div className='w-100'>
            <div className='d-flex flex-column flex-lg-row'>
                <div className='w-100' style={{background: "#fff", minHeight: "94.6dvh"}}>
                    <Paper px="xl" py="xl" bg='#fff'>
                        <div className='pt-4'>
                            <Text fz={33} fw={600} ta="center" mb="xs" c='#121212' ff='Lato'>
                                Welcome to Cocollabs
                            </Text>

                            {showOAuth2Buttons &&
                                <div>
                                    <Group mt="lg" className='d-flex flex-column login-container-block' w='100%'>
                                        <GoogleButton onClick={handleGoogleLogin} size="md" radius="md" px="0" className='py-2 login-oauth-button ' style={{fontSize: "17px",background: "#fafafa"}}>
                                            Continue with Google
                                        </GoogleButton>
                                    </Group>
                                    <Divider label="OR" color='dimmed' className='login-paper-divider' labelPosition="center" my="xl" />

                                </div> 
                            }



                        {nextSteps ? 
                        <div className='d-flex flex-column align-items-center w-100'>
                            <form  className='auth-user-info-block' 
                            onSubmit={(e) => {
                                e.preventDefault();
                                setInvalidPasswordErrorText('');
                                form.onSubmit((values) => handleLoginWithEmailRequest(values))(e);
                            }}>
                                <div className='d-flex align-items-center mb-4 justify-content-between'>
                                    <div className='login-back-arrow-icon' onClick={() => routeChange('/login')}>
                                        {Icons('IconArrowBack',30,30)}
                                    </div>

                                    <div className='text-center' style={{ flex: 1 }}>
                                        <Button className='signup-user-info-block-email' radius="xl" fw={800}>
                                            <div className='me-2'>
                                                {Icons('IconMail',18,18)}
                                            </div>
                                            {inputEmail}
                                        </Button>
                                    </div>
                                </div>

                                <Stack className='d-flex align-items-center'>
                                    <div className='w-100'>
                                        <PasswordInput
                                            label="Enter your password"
                                            type="password"
                                            autoComplete='off'
                                            placeholder=""
                                            // leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={2.5}/>}
                                            leftSection={Icons('IconLock',18,18,'#717171',2.5)}
                                            className='w-100 auth-user-input-field login'
                                            size="lg"
                                            radius="md"
                                            key={form.key('password')}
                                            {...form.getInputProps('password')}
                                        />
                                    </div>
                                </Stack>
                                {
                                    invalidPasswordErrorText.length > 0 && 
                                    <Text fz={14.5} c='#ec4848' pt='5' fw={400} >
                                        {invalidPasswordErrorText}
                                    </Text>
                                }                                

                                <Group mt="xl" mb="lg">
                                    
                                    <Button type="submit" bg='teal' className='auth-content-signup-button' radius="md" px="18" py="3" fw={700} w="100%" fz="15" >
                                        Log In
                                    </Button>
                                </Group>

                            </form>
                        </div>
                        :
                        <div className='auth-content-block login-container-block'>
                            <div style={{width: "100%", minHeight: "50px"}} className='pb-4'>
                                <Stack className='d-flex align-items-center'>
                                    <TextInput
                                        label="Enter your email"
                                        type="text"
                                        placeholder=""
                                        leftSection={Icons('IconMail',18,18,'#717171',2.5)}
                                        autoComplete='off'
                                        value={inputEmail}
                                        onChange={(e) => setInputEmail(e.target.value)}
                                        radius="md"
                                        className='w-100 auth-user-input-field login'
                                        size="lg"
                                        // key={form.key('email')}
                                        // {...form.getInputProps('email')}
                                    />
                                </Stack>
                                {
                                    invalidEmailErrorText.length > 0 && 
                                    <Text fz={14.5} c='#ec4848' pt='5' fw={400} ta='center'>
                                        {invalidEmailErrorText}
                                    </Text>
                                }
                            </div>

                            <Group className='d-flex justify-content-between py-3'>
                                <Anchor href='/signup'  c="#898b8d" size="sm">
                                    Don&apos;t have an account? Sign Up
                                </Anchor>
                                
                                <Button bg='teal' type="submit" className='auth-content-signup-button' radius="xl" px="18" py="3" fw={700} fz={15} onClick={validateEmailLogin}>
                                    Continue
                                </Button>
                            </Group>
                        </div>
                        }

                            
                        </div>
                    </Paper>
                </div>

                <div className='w-100 login-illustration-block'>
                    <div className='d-flex justify-content-center'>
                        <Image src={login} w={700} className='login-image'/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LoginContent;