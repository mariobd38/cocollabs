import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo2 from '@/components/Logo/logo2';

import { useFocusWithin } from '@mantine/hooks';
import {UnstyledButton,Title,Flex,Box,TextInput,PasswordInput,Text,Paper,Group,Button,Divider,Anchor,Stack,List, Image,Progress } from '@mantine/core';
import {Icons} from '../../icons/icons';
import { useForm } from '@mantine/form';

import { GoogleButton } from '../OAuthButtons/googleButton';
import { GithubButton } from '../OAuthButtons/githubButton';
// import { SlackButton } from './slackButton';
import { VerifyEmailRegex } from '../../../utils/emailRegexFormat';
import { userExists } from '../../../DataManagement/Users/userExists';
import { UseAuth } from '../../../AuthContext/authProvider';

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
  
        return Math.max(100 - (100 / (requirements.length)) * multiplier, 0);
    }
}
const SignupContentv2 = (props) => {
    
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
                styles={{ section: { transition: 'all 1s ease-in-out' } }}
                style={{visibility: `${form.values.password.length === 0 ? 'hidden' : 'visible'}` }}
                value={strength}
                color={strength > 80 ? 'teal' : strength > 60 ? 'blue' : strength > 40 ? 'yellow' : 'orange' }
                key={index}
                bg='#d7d9db'
                size={10}
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
        <>
            {/* <Flex w='40%' align='center' justify='center' className='signup-left-info-block' bg='#1012f6a0'>

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
                    

                        <Image src={signup} w={{md: 330, lg: 350}} className='signup-image' />
            </Flex> */}

                
            {/* style={{minHeight: "94.6dvh"}} */}

            <Flex bg='#121212' mih='100dvh'>

                <Paper mih='100dvh' w='100%'  className='signup-content-wrapper-paper'>
                    <Flex  mih='100dvh'   w={{xs: 530, md: '100%'}} m='auto'>
                    {/* <Flex w="100%" pt={10} pb={40} justify='flex-start' align='center'>
                        <Box w='9.5rem'>
                            <Logo2 strokeColor='#f0f0f0'/>
                        </Box>
                    </Flex> */}

                        <Paper radius={0} mih="37rem" bg='#2653a5' style={{borderRight: "1px solid #686868"}} py={30} w='85%'   display={{base: 'none', md: 'block'}} >
                            <Flex  align='flex-start' mx={20} gap={15} direction='column' justify='flex-start' >
                                <Flex pt={10} pb={40} >
                                    <Box w='9.5rem'>
                                        <Logo2 strokeColor='#f0f0f0'/>
                                    </Box>
                                </Flex>
                                <Title order={2} c='#fafafa' ff='Nunito Sans'>Simplify your development workflow, meet your project goals.</Title>
                                
                                <Text order={2} c='#d5d5d5' ff='Nunito Sans' ta='left'>
                                    Cocollabs is designed to ease the project experience for professionals.
                                    With advanced AI capabilities, discover how you can take your project from 0 to 1.
                                </Text>


                            </Flex>
                        </Paper>




                        {/* right half */}
                        {/* w='54.7%'  */}
                        <Flex align='center' direction='column' w='100%' justify='center' mih='100vh'>
                            <Paper py={60}  w={{base: 510, xs: 580}}  bg='transparent' >
                                    
                                    <Flex gap={5} direction='column' >
                                        <Title fz={{base: 35, xs: 36, md: 38}} fw={800} ta="center" c='#fafafa' ff='Nunito Sans'>
                                            Welcome to Cocollabs
                                        </Title>

                                        <Text fz={{base: 14, md: 15}} c={"#97999c"} fw={500} ta="center" mb="xl" ff='Nunito Sans'>
                                            Sign up for the free edition. No credit card required.
                                        </Text>
                                    </Flex>
                                    

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
                                                                {Icons('IconMail',20,20,'#717171',2)}
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
                                                        leftSection={Icons('IconUser',20,20,'#717171',2)}
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
                                                        leftSection={Icons('IconLock',20,20,'#717171',2)}
                                                        className='w-100 auth-user-input-field'
                                                        size="lg"
                                                        radius="md"
                                                        key={form.key('password')}
                                                        {...form.getInputProps('password')}
                                                    />
                                                </div>
                                            </Stack>
                                            
                                            {form.values.password && form.values.password.length > 0 &&
                                            <Text c='#959799' fz='14.5' fw={400}  mt={9} ff='Lato, sans-serif'>
                                                Password strength: {strength > 80 ? 'Excellent!' : strength > 60 ? 'Good' : strength > 40 ? 'Fair' : strength > 20 ? 'Needs work' : 'Low'}
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
                                    <Flex className='auth-content-block' w={{base: '70%', xs: '80%', sm: '80%'}} >
                                        <Box>
                                            <Stack className='d-flex align-items-center'>
                                                <TextInput
                                                    label='Email'
                                                    type="text"
                                                    placeholder=""
                                                    leftSection={Icons('IconMail',20,20,'#a2a2a2',2)}
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
                                        
                                        {showOAuth2Buttons &&
                                            <Box>
                                                <Divider label="or continue with" color='#929292' className='signup-content-wrapper-paper-divider' labelPosition="center" my={30} />

                                                <Flex mb="lg" gap={50} direction={{base: 'column', xs: 'row'}} >
                                                    <GoogleButton bd='1px solid #acacac' c='#f0f0f0' size="sm" onClick={handleGoogleLogin} radius={6} p='8px 0' className='sign-up-oauth-button' fz={17} bg="transparent" />
                                                        
                                                    <GithubButton bd='1px solid #acacac' c='#f0f0f0' size="sm" onClick={handleGoogleLogin} radius={6} p='8px 0' className='sign-up-oauth-button' fz={17} bg="transparent" />
                                                    {/* <SlackButton size="md" radius="md" px="0" className='py-2 sign-up-oauth-button' style={{fontSize: "17px",background: "#fafafa"}}>Continue with Slack</SlackButton> */}
                                                </Flex>
                                            </Box>
                                        }
                                        

                                        <Group className='d-flex justify-content-between py-3'>
                                            <Flex align='center'>
                                                <Text c="#97999c" size="sm" ff='Nunito Sans'>
                                                    Already have an account?
                                                </Text>
                                                <Anchor href='/login' ps={5} c="#2b93f0" size="sm" ff='Nunito Sans'>
                                                    Log In
                                                </Anchor>
                                            </Flex>
                                            
                                            <Button bg='teal' type="submit" className='auth-content-signup-button' radius={6} px="18" py="3" fw={700} fz={15} onClick={handleEmailSignUp}>
                                                {nextSteps ? 'Sign Up' : 'Continue'}
                                            </Button>
                                        </Group>
                                    </Flex>
                                    }
                                
                            </Paper>
                        </Flex>
                    </Flex>

                </Paper>
            </Flex>

        </>
    );
};

export default SignupContentv2;