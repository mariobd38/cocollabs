import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFocusWithin } from '@mantine/hooks';
import {TextInput,PasswordInput,Text,Paper,Group,Button,Divider,Anchor,Stack,List, Image,Progress } from '@mantine/core';
import { useForm } from '@mantine/form';

import {Icons} from '@/components/Logo/logo2';
import { GoogleButton } from '@/components/Auth/OAuthButtons/googleButton';
// import { SlackButton } from './slackButton';

import { userExists } from '@/api/Users/userExists';
import { VerifyEmailRegex } from '@/utils/emailRegexFormat';
import { UseAuth } from '@/AuthContext/authProvider';

import achievement from '../../../assets/illustrations/signup/achievement.png';

const requirements = [
    { re: /[0-9]/ },
    { re: /[a-z]/},
    { re: /[A-Z]/ },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/ },
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
        return 'Password must be at least 8 characters';
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
  
        return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
    }
}
const SignupContent = (props) => {
    
    const { handleGoogleLogin,setInputEmail,showOAuth2Buttons,inputEmail,nextSteps } = props;

    const { setIsAuthenticated, setIsOnboarded } = UseAuth();

    const [invalidEmailErrorText, setInvalidEmailErrorText] = useState('');
    const navigate = useNavigate(); 

    const routeChange = (path) =>{ 
        navigate(path);
    }
    const handleEmailSignUp = async () => {
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
        const strengthValue = getStrength({ value }.value);
        setStrength(strengthValue);
    });

    const bars = Array(1)
        .fill(0)
        .map((_, index) => (
            <Progress
                className='signup-content-progress-bar'
                styles={{ section: { transition: 'all 1.2s ease-in-out' } }}
                style={{visibility: `${form.values.password.length === 0 ? 'hidden' : 'visible'}`}}
                value={strength}
                color={strength > 80 ? 'teal' : strength > 60 ? 'blue' : strength > 40 ? 'yellow' : strength > 20 ? 'orange' : 'red'}
                key={index}
                bg='#d7d9db'
                size={15}
                radius='xl'
            />
    ));

    const { ref: fullNameRef, focused: isFullNameFocused } = useFocusWithin();
    const { ref: passwordRef, focused: isPasswordFocused } = useFocusWithin();

    const handleSignUpWithEmailRequest = async (values) => {
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
        try {
            const response = await fetch("/api/auth/signup", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "post",
                body: JSON.stringify(reqBody),
            });

            if (response.status === 200) {
                setIsAuthenticated(true);
                setIsOnboarded(false);
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
        <div className='d-flex flex-column-reverse flex-lg-row'>
            <div className='w-100 py-4 signup-left-info-block' style={{background: "#fafafa"}}>

                <div className='mx-5 pt-4'>
                    <Text pb='20' fw={700} ta="center" fz={27}  m='auto' c='#272839' w='80%'>Trusted, intuitive interface made for productivity</Text>
                    <div className='mb-5 d-flex align-items-center'>
                        <List
                        spacing="sm"
                        className='m-auto'
                        icon={Icons('IconCircleCheck',24,24,'#0f5255')}
                        >
                            <List.Item fw={400} fz={15}>Track and complete tasks </List.Item>
                            <List.Item fw={400} fz={15}>Collaborate with your team </List.Item>
                            <List.Item fw={400} fz={15}>Create documents</List.Item>
                            <List.Item fw={400} fz={15}>Monitor timelines and milestones</List.Item>
                        </List>
                    </div>

                    <div className='col-12 d-flex justify-content-center'>

                        {/* <img src={achievement} className=" " alt="Cocollabs" style={{width: "26rem"}}/> */}
                        <Image src={achievement} w={420} className='signup-image' />
                    </div>
                </div>
            </div>

            <div className='w-100' style={{borderRadius: "7px"}}>
                <Paper px="xl" pb="xl" className='py-4 signup-content-wrapper-paper' style={{minHeight: "94.6dvh"}}>
                    <div className='pt-4'>
                        <Text fz={33} fw={600} ta="center" mb="xs" c='#fafafa' ff='Lato'>
                            Get started with Cocollabs
                        </Text>

                        <Text fz={15.5} c={"#e9ebed"} fw={300} ta="center" mb="xl">
                            It&apos;s free! No credit card required.
                        </Text>

                        {showOAuth2Buttons &&
                        <>
                            <Group mt="lg" className='d-flex flex-column' w='100%'>
                                <GoogleButton bd='1px solid #acacac' c='#252525' size="md" onClick={handleGoogleLogin} radius="md" px="0" className='py-2 sign-up-oauth-button' fz={17} bg={"#fafafa"}>
                                    Continue with Google
                                </GoogleButton>
                                {/* <SlackButton size="md" radius="md" px="0" className='py-2 sign-up-oauth-button' style={{fontSize: "17px",background: "#fafafa"}}>Continue with Slack</SlackButton> */}
                            </Group>

                            <Divider label="OR" color='teal' className='signup-content-wrapper-paper-divider' labelPosition="center" my="xl" />
                        </>}

                        {nextSteps ? 
                        <div className='d-flex flex-column align-items-center w-100'>
                            <form style={{width: "80%"}} className='signup-user-info-block' onSubmit={form.onSubmit((values) => handleSignUpWithEmailRequest(values))}>
                                <div className='d-flex align-items-center mb-4 justify-content-between'>
                                    <div className='signup-back-arrow-icon' onClick={() => routeChange('/signup')}>
                                        {Icons('IconSquareArrowLeft',30,30)}
                                    </div>

                                    <div className='text-center' style={{ flex: 1 }}>
                                        <Button className='signup-user-info-block-email' radius="xl" fw={800}>
                                            <div className='d-flex'>
                                                <div className='me-3'>
                                                    {Icons('IconMail',18,18,'#717171',2.5)}
                                                </div>
                                                <span>{inputEmail}</span>
                                            </div>
                                        </Button>
                                    </div>
                                </div>

                                <Stack className='d-flex align-items-center'>
                                    <div ref={fullNameRef} className='w-100'>
                                        <TextInput
                                            label="Full name"
                                            placeholder={isFullNameFocused ? '' : 'John Doe'}
                                            type="text"
                                            autoComplete='off'
                                            leftSection={Icons('IconUser',18,18,'#717171','2.5')}
                                            className='w-100 auth-user-input-field'
                                            size="lg"
                                            radius="md"
                                            key={form.key('fullName')}
                                            {...form.getInputProps('fullName')}
                                        />
                                    </div>

                                    <div ref={passwordRef} className='w-100'>
                                        <PasswordInput
                                            label="Password"
                                            placeholder={isPasswordFocused ? '' : 'Minimum 8 characters'}
                                            type="password"
                                            autoComplete='off'
                                            // leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={2.5}/>}
                                            leftSection={Icons('IconLock',18,18,'#717171','2.5')}
                                            className='w-100 auth-user-input-field'
                                            size="lg"
                                            radius="md"
                                            key={form.key('password')}
                                            {...form.getInputProps('password')}
                                        />
                                    </div>
                                </Stack>
                                
                                {form.values.password && form.values.password.length > 0 &&
                                    <Text c='#858789' fw={400} align='center' mt={9} ff='Lato, sans-serif'>
                                        Strength: {strength > 80 ? 'Excellent!' : strength > 60 ? 'Good' : strength > 40 ? 'Fair' : strength > 20 ? 'Needs work' : 'Low'}
                                </Text>}

                                <Group grow mt="sm" mb="md" px='1'>
                                    {bars}
                                </Group>

                                <Group mt="xl" mb="lg">
                                    
                                    <Button type="submit" bg='teal' className='auth-content-signup-button' radius="md" px="18" py="3" fw={700} w="100%" fz="15" onClick={handleEmailSignUp}>
                                        Sign Up
                                    </Button>
                                </Group>

                            </form>
                        </div>
                        :
                        <div className='auth-content-block'>
                            <div style={{width: "100%", minHeight: "55px"}}>
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
                                        className='w-100 auth-user-input-field'
                                        size="lg"
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
                                <Anchor href='/login' c="#e9ebed" size="sm">
                                    Already have an account? Login
                                </Anchor>
                                
                                <Button bg='teal' type="submit" className='auth-content-signup-button' radius="xl" px="18" py="3" fw={700} fz={15} onClick={handleEmailSignUp}>
                                    Sign Up
                                </Button>
                            </Group>
                        </div>
                        }

                        
                    </div>
                </Paper>
            </div>
        </div>
    );
};

export default SignupContent;