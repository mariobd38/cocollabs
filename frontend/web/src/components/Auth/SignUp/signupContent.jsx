import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFocusWithin } from '@mantine/hooks';
import { Title,Flex,Box,TextInput,PasswordInput,Text,Paper,Group,Button,Divider,Anchor,Stack,Progress } from '@mantine/core';
import { useForm } from '@mantine/form';

import {Icons} from '@/components/icons/icons';
import { GoogleButton } from '@/components/Auth/OAuthButtons/googleButton';
import { GithubButton } from '@/components/Auth/OAuthButtons/githubButton';
import AuthSideBlock from '@/components/Auth/authSideBlock';

// import { SlackButton } from './slackButton';
import { userExists } from '@/api/Users/userExists';
import { VerifyEmailRegex } from '@/utils/emailRegexFormat';

const requirements = [
    { re: /[0-9]/ },
    { re: /[a-z]/},
    { re: /[A-Z]/ },
    { re: /[$&+,:;~=?@#|'<>.^*({})%!-]/ },
];
const validateFullName = (value) => {
    if (!value.trim()) {
        return 'Full name is required';
    }
    const words = value.trim().split(/\s+/);
    if (words.length < 2) {
        return 'Full name is required';
    }
    return null;
};

const validatePassword = (value) => {
    if (!value.trim()) {
        return 'Password is required';
    }
    if (value.length < 8) {
        return 'Password must be at least 8 characters long';
    }
    if (getStrength(value) < 50) {
        return 'Password is too weak'; 
    }
    return null;
};

function getStrength(password) {
    if (password) {
        let multiplier = password.length >= 8 ? 0 : 1;
  
        requirements.forEach((requirement) => {
            if (!requirement.re.test(password)) {
                multiplier += 1;
            }
        });
        return Math.max(100 - (100 / (requirements.length)) * multiplier, 0);
    }
}

const SignupContent = (props) => {
    
    const { handleGoogleLogin,setInputEmail,showOAuth2Buttons,inputEmail,nextSteps } = props;

    const [invalidEmailErrorText, setInvalidEmailErrorText] = useState('');
    const navigate = useNavigate(); 
    const routeChange = (path) =>{ 
        navigate(path);
    }

    const handleEmailSignUp = async () => {
        setSignupClicked(true);

        let userExistsVar = false;
        if (inputEmail) {
            try {
                userExistsVar = await userExists(inputEmail);
            } catch (error) {
                console.error(error); 
            }
        }
        if (userExistsVar) {
            setInvalidEmailErrorText('A user with that email already exists.');
        } else if (inputEmail === '' || !VerifyEmailRegex(inputEmail)) {
            setInvalidEmailErrorText('Please enter a valid email address.');
        } else {
            setInvalidEmailErrorText('');
            navigate(`/app/signup?email=${inputEmail}`);
        }
    }

    const form = useForm({
        initialValues: {
            fullName: '',
            password: '',
        },

        validate: {
            fullName: validateFullName,
            password: validatePassword
        },
    });

    const [strength, setStrength] = useState(0);
    form.watch('password', ({ value }) => {
        setSignupClicked(false)
        const strengthValue = getStrength({ value }.value);
        setStrength(strengthValue);
    });

    const [hideProgressBars, setHideProgressBars] = useState(true);
    const [signupClicked, setSignupClicked] = useState(false);

    useEffect(() => {
        if (form.values.password.length === 0)
            setHideProgressBars(true);
        else
            setHideProgressBars(false);
    },[form.values,hideProgressBars])

    const bars = Array(1)
        .fill(0)
        .map((_, index) => (
            <Progress
                className='signup-content-progress-bar'
                styles={{ section: { transition: 'all 1s ease-in-out' } }}
                style={{visibility: `${form.values.password.length === 0 ? 'hidden' : 'visible'}` }}
                value={strength}
                color={strength > 80 ? 'teal' : strength > 60 ? 'blue' : strength > 40 ? '#d5c30a' : 'red' }
                key={index}
                bg='#323436'
                size={10}
                radius='xl'
            />
    ));

    const { ref: fullNameRef, focused: isFullNameFocused } = useFocusWithin();
    const { ref: passwordRef, focused: isPasswordFocused } = useFocusWithin();
    // const { setIsAuthenticated, setIsOnboarded } = UseAuth();
    

    const handleSignUpWithEmailRequest = async (values) => {
        setHideProgressBars(true);

        const fullName = values.fullName
            .trim()
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        const password = values.password;
        const reqBody = {
            fullName: fullName,
            email: inputEmail,
            password: password,
        };
        // const data = await signupInfo(reqBody);
        // if (data) {
        //     setIsAuthenticated(true);
        //     setIsOnboarded(false);
        //     navigate('/onboarding');
        // }
        try {
            const response = await fetch("/api/auth/signup", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "post",
                body: JSON.stringify(reqBody),
            });

            if (response.status === 200) {
                // setIsAuthenticated(true);
                // setIsOnboarded(false);
                navigate('/onboarding');
            } else {
                console.error("Unexpected error with user registration");
            }
        } catch (error) {
            console.error(error);
            console.error("Error with API call to register user");
        }

    }

    return (
        <Flex mih='100dvh'>

            <Box w='100%' className='auth-content-wrapper-paper'>
                <Flex w={{xs: 530, md: '100%'}} m='auto' >
                    <Flex align='center' direction='column' w='100%' justify='center' mih='100vh' py={20}>
                        <Paper w={{base: '85%', xs: 580}}  bg='transparent'  >
                                
                            <Flex gap={5} direction='column' align='center'>
                                <Title className='signup-welcome-title' w='90%' fz={{base: '2rem', xs: '2.2rem', md: '2.3rem'}} fw={800} ta="center" c='#fafafa' ff='Nunito Sans'>
                                    Welcome to Cocollabs
                                </Title>

                                <Text className='signup-welcome-subtitle' fz={{base: '0.8rem', xs: '0.93rem', md: '.95rem'}} c="#97999c"  fw={500} ta="center" mb="xl" ff='Nunito Sans'>
                                    Sign up for the free edition. No credit card required.
                                </Text>
                            </Flex>
                                

                            {nextSteps ? 
                            <Flex align='center' direction='column' >
                                <form noValidate style={{width: "80%"}} className='auth-user-info-block' onSubmit={form.onSubmit((values) => handleSignUpWithEmailRequest(values))}>
                                    <div className='d-flex align-items-center mb-4 justify-content-between'>
                                        <div className='signup-back-arrow-icon' onClick={() => routeChange('/signup')}>
                                            {Icons('IconArrowBack',24,24, '#a6a7a9')}
                                        </div>

                                        <div className='text-center' style={{ flex: 1 }}>
                                            <Button className='signup-user-info-block-email' radius="xl" fw={800}>
                                                <Flex align='center'>
                                                    <Box me={10}>
                                                        {Icons('IconMail',18,18,'#f0f0f0',2)}
                                                    </Box>
                                                    <Text fw={600} c='#f0f0f0'>{inputEmail}</Text>
                                                </Flex>
                                            </Button>
                                        </div>
                                    </div>

                                    <Stack className='d-flex align-items-center'>
                                        <div ref={fullNameRef} className='w-100'>
                                            <TextInput
                                                // onClick={() => setSignupClicked(false)}
                                                required
                                                label="Full name"
                                                placeholder={isFullNameFocused ? '' : 'John Doe'}
                                                type="text"
                                                autoComplete='off'
                                                leftSection={Icons('IconUser',18,18,'#717171',2)}
                                                className='w-100 auth-user-input-field'
                                                size="lg"
                                                radius="md"
                                                key={form.key('fullName')}
                                                {...form.getInputProps('fullName')}
                                            />
                                        </div>

                                        <div ref={passwordRef} className='w-100'>
                                            <PasswordInput
                                                required
                                                // onClick={() => setSignupClicked(false)}
                                                label="Password"
                                                placeholder={isPasswordFocused ? '' : 'Minimum 8 characters'}
                                                type="password"
                                                autoComplete='off'
                                                leftSection={Icons('IconLock',18,18,'#717171',2)}
                                                className='w-100 auth-user-input-field'
                                                size="lg"
                                                radius="md"
                                                key={form.key('password')}
                                                {...form.getInputProps('password')}
                                            />
                                        </div>
                                    </Stack>

                                    {!signupClicked && form.values.password && form.values.password.length > 0 && <>
                                            <Text c='#959799' fz='14.5' fw={400}  mt={9} ff='Lato, sans-serif'>
                                                Password strength: {strength > 80 ? 'Excellent' : strength > 60 ? 'Good' : strength > 40 ? 'Fair' : 'Low'}
                                            </Text>

                                            <Group grow mt="sm" mb="md" px='1'>
                                                {bars}
                                            </Group> 
                                        </>}

                                    <Group mt="xl" mb="lg">
                                        
                                        <Button type="submit" bg='transparent'  bd='1px solid #5c5c5c' c='#f0f0f0' className='auth-content-signup-button' radius="md" px="18" py="3" fw={700} w="100%" fz="15" onClick={handleEmailSignUp}>
                                            Sign Up
                                        </Button>
                                    </Group>

                                </form>
                            </Flex>
                            :
                            // className='auth-content-block' w={{xs: '80%'}} 
                            <Flex direction='column' w={{xs: '80%'}} className='auth-content-block' >
                                {showOAuth2Buttons &&
                                    <Box>

                                        <Flex mb="lg" gap={20} direction='column' >
                                            <GoogleButton bd='1px solid #5c5c5c' c='#f0f0f0' size="sm" onClick={handleGoogleLogin} radius={6} p='8px 0' className='sign-up-oauth-button' fz={17} bg="transparent">
                                                <Text className='ms-2 oauth-button-text' fw={700} fz={{base: 16, xs: 17}}>Continue with Google</Text>
                                            </GoogleButton>
                                                
                                            <GithubButton bd='1px solid #5c5c5c' c='#f0f0f0' size="sm" onClick={handleGoogleLogin} radius={6} p='8px 0' className='sign-up-oauth-button' fz={17} bg="transparent">
                                                <Text className='ms-2 oauth-button-text' fw={700} fz={{base: 16, xs: 17}}>Continue with Github</Text>
                                            </GithubButton>
                                            {/* <SlackButton size="md" radius="md" px="0" className='py-2 sign-up-oauth-button' style={{fontSize: "17px",background: "#fafafa"}}>Continue with Slack</SlackButton> */}
                                        </Flex>

                                        <Divider label="or" color='#929292' className='auth-content-wrapper-paper-divider' labelPosition="center" my={30} />
                                    </Box>
                                }
                                
                                <Box>
                                    <Stack align='center'>
                                        <TextInput
                                            label='Email'
                                            type="text"
                                            placeholder=""
                                            leftSection={Icons('IconMail',18,18,'#a2a2a2',2)}
                                            autoComplete='off'
                                            value={inputEmail}
                                            onChange={(e) => setInputEmail(e.target.value)}
                                            className='w-100 auth-user-input-field'
                                            size="lg"
                                        />
                                    </Stack>
                                    { invalidEmailErrorText.length > 0 && 
                                    <Text fz={14.5} c='#dc5050' pt='5' fw={400} >
                                        {invalidEmailErrorText}
                                    </Text> }
                                </Box>

                                <Group justify='space-between' pt={30} >
                                    <Flex align='center'>
                                        <Text c="#97999c" size="sm" ff='Nunito Sans'>
                                            Already have an account?
                                        </Text>
                                        <Anchor onClick={() => routeChange('/login')} ps={5} c="#2b93f0" size="sm" ff='Nunito Sans'>
                                            Log In
                                        </Anchor>
                                    </Flex>
                                    
                                    <Button bg='transparent' bd='1px solid #5c5c5c' c='#f0f0f0' type="submit" className='auth-content-signup-button' radius={6} px="18" py="3" fw={700} fz={15} onClick={handleEmailSignUp}>
                                        Continue
                                    </Button>
                                </Group>
                            </Flex>
                            }
                            
                        </Paper>
                    </Flex>
                    <AuthSideBlock  />

                </Flex>

            </Box>
        </Flex>
    );
};

export default SignupContent;