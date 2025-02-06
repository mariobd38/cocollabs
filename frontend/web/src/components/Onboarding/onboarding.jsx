import React, { useState, useEffect,lazy,Suspense } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

import { Box,Flex,Progress } from '@mantine/core';

// import OnboardingCreateSpace from '@/components/Onboarding/onboardingCreateSpace';
// import AuthHeader from '@/components/Auth/authHeader';
import { motion, AnimatePresence } from "framer-motion";

import { UseAuth } from '@/hooks/authProvider';

import { generateSpaceIconJson } from '@/utils/generateSpaceIconJson';
import { getUserProfileInfo } from '@/api/Users/getUserProfileInfo';
import { completeOnboarding } from '@/api/Users/completeOnboarding';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
// import { authStatusInfo } from '@/api/Auth/status';

import './onboarding.css';

const LoadingFallback = () => <></>;
const OnboardingCreateProfile = lazy(() => import('@/components/Onboarding/onboardingCreateProfile'));
const OnboardingCreateSpacev2 = lazy(() => import('@/components/Onboarding/onboardingCreateSpacev2'));

const Onboarding = () => {
    const { updateAuthStatus } = UseAuth();
    const [userInfo, setUserInfo] = useState({ email: '', fullName: '', picture: null, profile: null});
    const [spaceInfo, setSpaceInfo] = useState({ name: '', icon: null, description: '', visibility: ''});
    const location = useLocation();
    const [picture, setPicture] = useState(location.state?.data?.picture ?? null);
    const [stepNum, setStepNum] = useState(1);
    const navigate = useNavigate();

    const [openImageCropper, setOpenImageCropper] = useState(false);
    const [isAvatarPopoverOpen, setIsAvatarPopoverOpen] = useState(false);
    const [imageToCrop, setImageToCrop] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [activeProfile, setActiveProfile] = useState(null);
    const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
    
    
    const stepsObj = [
        {name: 'profile', num: 1},
        {name: 'space', num: 2},
        {name: 'complete', num: 3}
    ];

    const totalSteps = stepsObj.length;
    const progressPercentage = (stepNum / totalSteps) * 100;

    const bars = <Progress
        className='signup-content-progress-bar bg-zinc-800'
        styles={{ section: { transition: 'all 1s ease-in-out' } }}
        value={progressPercentage}
        size={6}
        color='teal'
        radius='xl'
    />


    // const stepDisplay = <Flex gap={20} className=' w-full'>
    //     {[...Array(3)].map((_, i) => <div key={i} className={`w-full h-1 ${i < stepNum ? 'bg-green-700' : 'bg-gray-500'} rounded-full`} />)}
    // </Flex>;
    const stepDisplay = <Flex gap={20} className='w-full' direction='column'>
        {bars}
        {/* {[...Array(3)].map((_, i) => <div key={i} className={`w-full h-1 ${i < stepNum ? 'bg-green-700' : 'bg-gray-500'} rounded-full`} />)} */}
    </Flex>;

    

    const data = {
        user: {
            email: userInfo?.userDto?.email,
            fullName: userInfo?.userDto?.fullName,
            picture: userInfo?.userDto?.picture,
            profile: userInfo?.userDto?.profile,
            // initials: userInfo?.userDto?.fullName?.split(' ')[0][0] + userInfo?.userDto?.fullName?.split(' ')[1][0],
        },
        space: spaceInfo,
        onboardingStep: userInfo?.userDto?.onboardingStep
    }

    useEffect(() => {
        const fetchUserData = async () => {
            setUserInfo(await getUserProfileInfo());
        };
        fetchUserData();
        const step = stepsObj.find(step => step.name === data.onboardingStep);
        setStepNum(step?.num);
    },[data?.onboardingStep]);

    useEffect(() => {
        if (location.state && location.state.picture) {
            setPicture(location.state.picture);
        }
    }, [location.state]);

    const steps = [
        {
            profileStep: { component: 
            <Suspense fallback={<LoadingFallback />}>
                <OnboardingCreateProfile 
                    data={data}
                    stepNumProps={{ stepNum, setStepNum,stepDisplay }}
                    imageCropperProps={{ setOpenImageCropper, openImageCropper,imageToCrop, setImageToCrop, previewUrl, setPreviewUrl }}
                    avatarPopoverProps={{ isAvatarPopoverOpen, setIsAvatarPopoverOpen }}
                    profileProps={{ activeProfile, setActiveProfile }}
                />
            </Suspense>
             },
            spaceStep: { component: <Suspense fallback={<LoadingFallback />}>
                <OnboardingCreateSpacev2 
                    stepNumProps={{ stepNum, setStepNum,stepDisplay }}
                    fullName={data?.user.fullName}
                    setIsOnboardingComplete={setIsOnboardingComplete}
                />
            </Suspense> },
        },
    ];

    useEffect(() => {
        async function sendDataToPlatform() {
            if(stepNum === 3) {
                try {
                    const response = await completeOnboarding();
                    
                    if (response) {
                        setTimeout(() => {
                            setIsOnboardingComplete(true);
                        },1400);

                        setTimeout(() => {
                            setIsOnboardingComplete(false);
                            navigate(`/${response.spaceDto?.slug}`, { 
                                state: { 
                                    userInfo: response.userDto, 
                                    spaceInfo: response.spaceDto 
                                } 
                            });
                        },2000);
                        
                    }
                } catch (error) {
                    console.error('Onboarding completion failed:', error);
                }
            }
        }

        sendDataToPlatform();
    },[stepNum,navigate]);

    // const [profileOptions, setProfileOptions] = useState(picture ? [{
    //     option: (
    //         <Avatar className='onboarding-new-profile-parent'
    //                 style={{ backgroundImage: picture ? `url(${picture})` : 'none', backgroundSize: 'cover', overflow: "visible" }}>
                
    //             <div className="onboarding-profile-selected">
    //                 <div className='onboarding-profile-selected-icon'>
    //                     {Icons('IconCheck', 20,20, '#fafafa')}
    //                 </div>
    //             </div>
    //         </Avatar>
    //     ),
    //     text: <Text pt={10} fw={500} fz={17}>Default</Text>,
    //     color: null, avatarType: 'default', thumbUrl: null, file: null
    // }] : []);
    //const [selectedProfile, setSelectedProfile] = useState(picture ? profileOptions[0] : []);

    //steps
    //const [activeStep, setActiveStep] = useState(0);
    // const [activeStep, setActiveStep] = useLocalStorage({
    //     key: 'onboarding_active_step',
    //     defaultValue: 0,
    // });

    

    // const nextStep = async () => {
    //     setMissingSpaceNameError(false);
    //     if (activeStep === 0 && selectedProfile.length === 0) {
    //         setMissingProfileError(true);
    //         return;
    //     } 
    //     else if (activeStep === 1 && spaceName.length === 0) {
    //         setMissingSpaceNameError(true);
    //         return;
    //     } else if (activeStep === 1) {
    //         setMissingProfileError(false);
    //         setMissingSpaceNameError(false);
    //         const profileData = {
    //             color: selectedProfile.color,
    //             pfd: {
    //                 name: selectedProfile && selectedProfile.file ? selectedProfile.file.response.name : null,
    //                 type: selectedProfile && selectedProfile.file ? selectedProfile.file.response.type : null,
    //                 data: selectedProfile && selectedProfile.file ? selectedProfile.file.response.data : null,
    //             },
    //             avatarType: selectedProfile.avatarType
    //         };
    //         const spaceData = {
    //             name: spaceName,
    //             icon: generateSpaceIconJson(spaceIcon),
    //             description: spaceDescription
    //         };
    //         const response = await completeOnboarding(profileData,spaceData,setUserInfo,setSpaceInfo);

    //         const updatedUserInfo = {
    //             ...response.profileData, 
    //         };
            
    //         const updatedSpaceInfo = response.spaceData.body;
            
            // await updateAuthStatus();
            
    //         navigate('/home', { state: { userInfo: updatedUserInfo, spaceInfo: updatedSpaceInfo } });
    //     }
    //     else
    //         setActiveStep((current) => (current < 3 ? current + 1 : current))
    // };

    // const [spaceName, setSpaceName] = useState('Personal workspace');
    // const [spaceIcon, setSpaceIcon] = useState(null);
    // const [spaceDescription, setSpaceDescription] = useState('');

    /*const steps = [
        {
          label: 'Create a profile',
          description: 'Set up an avatar to get started',
          icon: Icons('IconUser',22,22,'#252525'),
          content: 
            <OnboardingCreateProfile 
                picture={picture}
                initials={initials}
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
    ];*/ 
    const transitionVariants = {
        initial: { opacity: 0, x: 50 }, // Start position (offscreen)
        animate: { opacity: 1, x: 0 }, // Animate to visible
        exit: { opacity: 0, x: -50 }, // Exit position (slide out)
    };

    return (<>
        {data?.user && (
            <Box className="w-full bg-background">
                <Flex gap={80} direction="column" ff="Geist" justify='center' className='min-h-screen'>
                {steps.map((step, index) => (
                    <Flex key={index} >
                    <AnimatePresence mode="wait" >
                        {stepNum === 1 && (
                        <motion.div
                            className='w-full'
                            key="profileStep"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={transitionVariants}
                            transition={{ duration: 0.5 }}
                        >
                            <Flex justify={{base: 'center', md: 'space-between'}} >
                                {step.profileStep.component}
                            </Flex>
                        </motion.div>
                        )}
                        {stepNum >= 2 && (
                        <motion.div
                            className='w-full'
                            key="spaceStep"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={transitionVariants}
                            transition={{ duration: 0.5 }}
                        >
                            {isOnboardingComplete ? <LoadingSpinner /> : 
                                <Flex justify={{base: 'center', md: 'space-between'}} >
                                {step.spaceStep.component}
                                </Flex>
                        }
                            
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </Flex>
                ))}
                </Flex>
            </Box>
        )}
    </>
    );
};

export default Onboarding;
