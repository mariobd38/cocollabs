import React, { useState, useEffect,lazy,Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {Box,Flex} from '@mantine/core';

// import OnboardingCreateSpace from '@/components/Onboarding/onboardingCreateSpace';
import AuthHeader from '@/components/Auth/authHeader';

import { UseAuth } from '@/hooks/authProvider';

import { generateSpaceIconJson } from '@/utils/generateSpaceIconJson';

import { getUserProfileInfo } from '@/api/Users/getUserProfileInfo';
import { completeOnboarding } from '@/api/Users/completeOnboarding';
import { handleProfileCreation } from '@/api/Users/handleProfileCreation';
// import { authStatusInfo } from '@/api/Auth/status';

import './onboarding.css';

const LoadingFallback = () => <></>;
const OnboardingCreateProfilev2 = lazy(() => import('@/components/Onboarding/onboardingCreateProfilev2'));
const CustomDialog = lazy(() => import('@/components/customDialog'));
const ImageCropperContent = lazy(() => import('@/components/imageCropperContent'));

const Onboarding = () => {
    const { updateAuthStatus } = UseAuth();
    const [userInfo, setUserInfo] = useState({ email: '', fullName: '', picture: null, profile: null});
    const [spaceInfo, setSpaceInfo] = useState({ name: '', icon: null, description: '', visibility: ''});
    const navigate = useNavigate();
    const location = useLocation();
    const [picture, setPicture] = useState(location.state?.data?.picture ?? null);
    const [missingProfileError, setMissingProfileError] = useState(false);
    const [missingSpaceNameError, setMissingSpaceNameError] = useState(false);
    const [stepNum, setStepNum] = useState(0);

    const [openImageCropper, setOpenImageCropper] = useState(false);
    const [isAvatarPopoverOpen, setIsAvatarPopoverOpen] = useState(false);
    const [imageToCrop, setImageToCrop] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [activeProfile, setActiveProfile] = useState(null);
    const [croppedFile, setCroppedFile] = useState(null);
    

    useEffect(() => {
        const fetchUserData = async () => {
            setUserInfo(await getUserProfileInfo());
        };
        fetchUserData();
    },[]);


    const data = {
        user: {
            email: userInfo?.userDto?.email,
            fullName: userInfo?.userDto?.fullName,
            picture: userInfo?.userDto?.picture,
            profile: userInfo?.userDto?.profile,
            initials: userInfo?.userDto?.fullName.split(' ')[0][0] + userInfo?.userDto?.fullName.split(' ')[1][0]
        },
        space: spaceInfo
    }

    useEffect(() => {
        if (location.state && location.state.picture) {
            setPicture(location.state.picture);
        }
    }, [location.state]);


    // OnboardingCreateProfilev2({ data,stepNum,setStepNum })
    const comp = <Suspense fallback={<LoadingFallback />}>
        <OnboardingCreateProfilev2 
            data={data}
            stepNumProps={{ stepNum, setStepNum }}
            imageCropperProps={{ setOpenImageCropper, imageToCrop, setImageToCrop, previewUrl, setPreviewUrl, croppedFile,setCroppedFile }}
            avatarPopoverProps={{ isAvatarPopoverOpen, setIsAvatarPopoverOpen }}
            profileProps={{ activeProfile, setActiveProfile }}
        />
    </Suspense>;

    const steps = [
        {
            profileStep: {
                component: comp

            },
            spaceStep: {
                component: comp
                // main: <ParentComponent data={data} stepNum={stepNum} setStepNum={setStepNum} />,
                // illustration: <ParentComponent data={data} stepNum={stepNum} setStepNum={setStepNum} />,
            },
        },
    ];

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
            
    //         await updateAuthStatus();
            
    //         navigate('/home', { state: { userInfo: updatedUserInfo, spaceInfo: updatedSpaceInfo } });
    //     }
    //     else
    //         setActiveStep((current) => (current < 3 ? current + 1 : current))
    // };

    //const prevStep = () => setActiveStep((current) => (current > 0 ? current - 1 : current));
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


    return (
        <>
        {data?.user &&
        <Box className="w-full bg-background">
            <AuthHeader />
            <Box className="w-full bg-background" style={{minHeight: 'calc(100vh - 65px)'}}>
                <Flex gap={80} direction="column" ff="Geist" >
                    {steps.map((step, index) => (
                    <Flex justify='space-between' key={index}>
                        {/* <Flex direction='column' gap={40} py={40} px={40}>
                            <Flex gap={20}>
                                {[...Array(3)].map((_, i) => <div key={i} className={`w-20 h-1 ${i < stepNum ? 'bg-green-700' : 'bg-gray-500'} rounded-full`} />)}
                            </Flex>
                            {step.profileStep.main}
                        </Flex>
                        {step.profileStep.illustration} */}
                        {step.profileStep.component}
                    </Flex>
                    ))}
                </Flex>
            </Box>
        </Box>}
        <Suspense fallback={<LoadingFallback />}>
        {imageToCrop &&
            <CustomDialog
                trigger={openImageCropper}
                content={
                    <ImageCropperContent 
                    imageCropperProps={{ imageToCrop, setImageToCrop,setCroppedFile }}
                    setOpen={setOpenImageCropper}
                    profileProps={{ setPreviewUrl,setActiveProfile }}
                    />
                }
                open={openImageCropper} 
                setOpen={setOpenImageCropper} 
                width={800}
            />}
        </Suspense>
        </>
    );
};

export default Onboarding;
