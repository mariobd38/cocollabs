import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Icons } from '../icons/icons';

import {Text,Button,Avatar,Stepper, Group,Box,Flex} from '@mantine/core';
import { theme } from 'antd';

import { UseAuth } from '../../AuthContext/authProvider';
import { generateSpaceIconJson } from '../../utils/generateSpaceIconJson';
import AuthHeader from '../../../src/components/Auth/authHeader';
import { getUserInfo } from '../../DataManagement/Users/getUserInfo';
import { completeOnboarding } from '../../DataManagement/Users/completeOnboarding';
import OnboardingCreateProfile from './onboardingCreateProfile';
import OnboardingCreateSpace from './onboardingCreateSpace';

import './onboarding.css';

const Onboarding = () => {
    const { setIsOnboarded } = UseAuth();
    const [userInfo, setUserInfo] = useState({ email: '', fullName: '', picture: null, profile: null});
    const [spaceInfo, setSpaceInfo] = useState({ name: '', icon: null, description: '', visibility: ''});
    const navigate = useNavigate();
    const location = useLocation();
    const [picture, setPicture] = useState(location.state?.data?.picture ?? null);
    const [initials, setInitials] = useState('');
    const [fullName, setFullName] = useState('');
    const [missingProfileError, setMissingProfileError] = useState(false);
    const [missingSpaceNameError, setMissingSpaceNameError] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setUserInfo(await getUserInfo());
        };
        fetchUserData();
    },[]);

    useEffect(() => {
        if (userInfo && userInfo.fullName) {
            setFullName(userInfo.fullName);
            const nameParts = userInfo.fullName.split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
            setInitials(firstName[0] + (lastName[0] || ''));
        }
    }, [userInfo]);


    useEffect(() => {
        if (location.state && location.state.picture) {
            setPicture(location.state.picture);
        }
    }, [location.state]);

    const [profileOptions, setProfileOptions] = useState(picture ? [{
        option: (
            <Avatar className='onboarding-new-profile-parent'
                    style={{ backgroundImage: picture ? `url(${picture})` : 'none', backgroundSize: 'cover', overflow: "visible" }}>
                
                <div className="onboarding-profile-selected">
                    <div className='onboarding-profile-selected-icon'>
                        {Icons('IconCheck', 20,20, '#fafafa')}
                    </div>
                </div>
            </Avatar>
        ),
        text: <Text pt={10} fw={500} fz={17}>Default</Text>,
        color: null, avatarType: 'default', thumbUrl: null, file: null
    }] : []);
    const [selectedProfile, setSelectedProfile] = useState(picture ? profileOptions[0] : []);

    //upload

    const handleContinueWithProfileAvatar = () => {
        
        // localStorage.removeItem('onboarding_active_step')
        setMissingProfileError(false);
        setMissingSpaceNameError(false)
        completeOnboarding(selectedProfile,setUserInfo);
        setIsOnboarded(true);
        navigate('/home', { state: { userInfo }});
    }
    //steps
    const [activeStep, setActiveStep] = useState(0);
    // const [activeStep, setActiveStep] = useLocalStorage({
    //     key: 'onboarding_active_step',
    //     defaultValue: 0,
    // });

    

    const nextStep = async () => {
        setMissingSpaceNameError(false);
        if (activeStep === 0 && selectedProfile.length === 0) {
            setMissingProfileError(true);
            return;
        } 
        else if (activeStep === 1 && spaceName.length === 0) {
            setMissingSpaceNameError(true);
            return;
        } else if (activeStep === 1) {
            setMissingProfileError(false);
            setMissingSpaceNameError(false);
            const profileData = {
                color: selectedProfile.color,
                pfd: {
                    name: selectedProfile && selectedProfile.file ? selectedProfile.file.response.name : null,
                    type: selectedProfile && selectedProfile.file ? selectedProfile.file.response.type : null,
                    data: selectedProfile && selectedProfile.file ? selectedProfile.file.response.data : null,
                },
                avatarType: selectedProfile.avatarType
            };
            const spaceData = {
                name: spaceName,
                icon: generateSpaceIconJson(spaceIcon),
                description: spaceDescription
            };
            const response = await completeOnboarding(profileData,spaceData,setUserInfo,setSpaceInfo);

                setIsOnboarded(true);
                const updatedUserInfo = {
                    ...response.profileData, 
                };
                
                // Update spaceInfo with the response from the API
                const updatedSpaceInfo = response.spaceData.body;
                
                // Use navigate with the updated userInfo and spaceInfo objects
                navigate('/home', { state: { userInfo: updatedUserInfo, spaceInfo: updatedSpaceInfo } });
        }
        else
            setActiveStep((current) => (current < 3 ? current + 1 : current))
    };

    const prevStep = () => setActiveStep((current) => (current > 0 ? current - 1 : current));
    const [color, setColor] = useState('#303030');
    const [firstLetter, setFirstLetter] = useState('');
    const [spaceName, setSpaceName] = useState('Personal workspace');
    const [spaceIcon, setSpaceIcon] = useState(null);
    const [spaceDescription, setSpaceDescription] = useState('');

    useEffect(() => {
        if (fullName) {
            const firstLetter = fullName.split(' ')[0].charAt(0).toUpperCase();
            setFirstLetter(firstLetter);
            setSpaceIcon(<Avatar color={color} variant='light' radius="md" h='inherit'>{firstLetter}</Avatar>);
        }
    }, [fullName,color]);

    const steps = [
        {
          label: 'Create a profile',
          description: 'Set up an avatar to get started',
          icon: Icons('IconUser',22,22,'#252525'),
          content: 
            <OnboardingCreateProfile 
                picture={picture}
                initials={initials}
                fullName={fullName}
                setSelectedProfile={setSelectedProfile}
                profileOptions={profileOptions}
                setProfileOptions={setProfileOptions}
                missingProfileError={missingProfileError}
                setMissingProfileError={setMissingProfileError}
            />
        },
        {
            label: 'Select a personal space',
            description: 'This will be your default workspace',
            icon: Icons('IconPlanet',22,22,'#252525'),
            content: 
                <OnboardingCreateSpace 
                    color={color}
                    setColor={setColor}
                    spaceIcon={spaceIcon}
                    setSpaceIcon={setSpaceIcon}
                    firstLetter={firstLetter}
                    spaceName={spaceName}
                    setSpaceName={setSpaceName}
                    spaceDescription={spaceDescription}
                    setSpaceDescription={setSpaceDescription}
                    missingSpaceNameError={missingSpaceNameError}
                    setMissingSpaceNameError={setMissingSpaceNameError}
                />
        }
    ];

    const { token } = theme.useToken();
    const contentStyle = {
        // lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };
    

    return (
        <div className='w-100' style={{height: "100dvh", background: "#fafafa"}}>
            <AuthHeader />

            <div>
                <div className="py-4 px-5" >
                    <>
                        <Stepper color='teal' active={activeStep} onStepClick={setActiveStep} allowNextStepsSelect={false} completedIcon={Icons('IconCheck',26,26)}
                        >
                            {steps.map((item, index) => (
                                <Stepper.Step py={10} key={index} label={item.label} description={item.description}  icon={item.icon} >
                                    <Box py={25} className='onboarding-steps-inner-content' style={contentStyle}>{item.content}</Box>
                                </Stepper.Step>
                            ))}
                            
                            <Stepper.Completed>
                                {/* Completed, click back button to get to previous step */}
                                <div className='onboarding-steps-inner-content py-5' style={contentStyle}>
                                    You&apos;re all set, {fullName.split(' ')[0]}!
                                </div>

                            </Stepper.Completed>
                        </Stepper>

                        <Group justify="center" mt="xl" pt={25}>
                            <Flex gap={0}  w={{ base: '100%', sm: '60%' }} justify='space-between' >
                                <Button onClick={prevStep} className='onboarding-bottom-button' ff='Lato' fz={16} py={3} radius='md' bg='teal' bd='1.5px solid teal'>
                                    Back
                                </Button>
                                <Button onClick={nextStep} className='onboarding-bottom-button' ff='Lato' fz={16} py={3} radius='md' bg='teal' bd='1.5px solid teal'>
                                    {activeStep===2 ? 'Finish' : 'Next'}
                                </Button>
                            </Flex>
                        </Group>
                    </>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;