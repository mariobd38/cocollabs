import React, { useState, useEffect,lazy,Suspense } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

import { Progress,useMantineColorScheme } from '@mantine/core';

// import OnboardingCreateSpace from '@/components/Onboarding/onboardingCreateSpace';
// import AuthHeader from '@/components/Auth/authHeader';
import { motion, AnimatePresence } from "framer-motion";

import { getUserProfileInfo } from '@/api/Users/getUserProfileInfo';
import { completeOnboarding } from '@/api/Users/completeOnboarding';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
// import { authStatusInfo } from '@/api/Auth/status';

import './onboarding.css';

const LoadingFallback = () => <></>;
const OnboardingCreateProfile = lazy(() => import('@/components/Onboarding/onboardingCreateProfile'));
const OnboardingCreateSpacev2 = lazy(() => import('@/components/Onboarding/onboardingCreateSpacev2'));

const Onboarding = () => {
    const [userInfo, setUserInfo] = useState({ email: '', fullName: '', picture: null, profile: null});
    const [spaceInfo, setSpaceInfo] = useState({ name: '', icon: null, description: '', visibility: ''});
    const location = useLocation();
    const [picture, setPicture] = useState(location.state?.data?.picture ?? null);
    const [stepNum, setStepNum] = useState(1);
    const navigate = useNavigate();
    const { setColorScheme } = useMantineColorScheme();
    setColorScheme('dark');

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
        className='bg-zinc-800'
        styles={{ section: { transition: 'all 1s ease-in-out' } }}
        value={progressPercentage}
        size={6}
        color='teal'
        radius='xl'
    />

    const stepDisplay = <div className='flex flex-col w-full' >
        {bars}
    </div>;

    

    const data = {
        user: {
            email: userInfo?.userDto?.email,
            fullName: userInfo?.userDto?.fullName,
            picture: userInfo?.userDto?.picture,
            profile: userInfo?.userDto?.profile,
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
                            const spaceList = response.userSpaceDto;
                            navigate(`/${spaceList[spaceList.length - 1]?.slug}`, { 
                                state: { 
                                    userInfo: response.userDto, 
                                    spaceInfo: response.userSpaceDto 
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

    const transitionVariants = {
        initial: { opacity: 0, x: 50 }, // Start position (offscreen)
        animate: { opacity: 1, x: 0 }, // Animate to visible
        exit: { opacity: 0, x: -50 }, // Exit position (slide out)
    };

    return (<>
        {data?.user && (
            <div className="w-full bg-background ">
                <div className='flex font-["Geist"] flex-col justify-center min-h-screen '>
                {steps.map((step, index) => (
                    <div className='flex' key={index} >
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
                            <div className='flex justify-center lg:justify-between' >
                                {step.profileStep.component}
                            </div>
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
                                <div className='flex justify-center lg:justify-between' >
                                {step.spaceStep.component}
                                </div>
                            }
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </div>
                ))}
                </div>
            </div>
        )}
    </>
    );
};

export default Onboarding;
