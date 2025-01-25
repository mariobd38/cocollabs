import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {Text,Avatar,Box,Flex} from '@mantine/core';

import * as z from "zod";
import { Icons } from '@/components/icons/icons';
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider,useForm } from "react-hook-form";

import OnboardingCreateProfile from '@/components/Onboarding/onboardingCreateProfile';
import OnboardingCreateSpace from '@/components/Onboarding/onboardingCreateSpace';
import AuthHeader from '@/components/Auth/authHeader';
import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { UseAuth } from '@/hooks/authProvider';

import { generateSpaceIconJson } from '@/utils/generateSpaceIconJson';

import { getUserProfileInfo } from '@/api/Users/getUserProfileInfo';
import { completeOnboarding } from '@/api/Users/completeOnboarding';
// import { authStatusInfo } from '@/api/Auth/status';

import './onboarding.css';
const avatars = import.meta.glob('@/assets/avatars/*.svg', { eager: true });
// const avatarList = Object.values(avatars);
const avatarList = Object.entries(avatars)
  .sort(([a], [b]) => {
    // Extract numbers from file names to ensure correct order
    const numA = parseInt(a.match(/\d+/)?.[0] || 0, 10);
    const numB = parseInt(b.match(/\d+/)?.[0] || 0, 10);
    return numA - numB;
  })
  .map(([, avatar]) => ({
    svg: avatar.default,
  }));


const Onboarding = () => {
    const { updateAuthStatus } = UseAuth();
    const [userInfo, setUserInfo] = useState({ email: '', fullName: '', picture: null, profile: null});
    const [spaceInfo, setSpaceInfo] = useState({ name: '', icon: null, description: '', visibility: ''});
    const navigate = useNavigate();
    const location = useLocation();
    const [picture, setPicture] = useState(location.state?.data?.picture ?? null);
    const [initials, setInitials] = useState('');
    const [missingProfileError, setMissingProfileError] = useState(false);
    const [missingSpaceNameError, setMissingSpaceNameError] = useState(false);
    const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const FormSchema = z.object({
        images: z.any()
            .refine(files => {return Array.from(files).every(file => file instanceof File)}, { message: "Expected a file" })
            .refine(files => Array.from(files).every(file => ACCEPTED_IMAGE_TYPES.includes(file.type)), "Only these types are allowed .jpg, .jpeg, .png and .webp")
    })

    useEffect(() => {
        const fetchUserData = async () => {
            setUserInfo(await getUserProfileInfo());
        };
        fetchUserData();
    },[]);

    const form = useForm({
        resolver: zodResolver(FormSchema)
    })

    function onSubmit(data) {
        console.log(data);
    }

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

            const updatedUserInfo = {
                ...response.profileData, 
            };
            
            const updatedSpaceInfo = response.spaceData.body;
            
            await updateAuthStatus();
            
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

    const steps = [
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
    ];

    const [isAvatarPopoverOpen, setIsAvatarPopoverOpen] = useState(false);
    const [activeProfile, setActiveProfile] = useState(null);

    return (
        <>
        {data?.user &&
        <div className="w-full bg-background">
            <AuthHeader />
            <Box px={40} className="w-full min-h-screen bg-background">

                <Flex py={40} gap={80} direction="column" h="8rem" ff="Geist">
                    <Flex direction='column' gap={40}>
                        <Flex direction="column" gap={10} >
                            <h1 className="text-white text-2xl sm:text-3xl text-wrap">
                            Welcome to Cocollabs
                            </h1>
                            <p className="text-gray-400 text-sm text-wrap">
                            You&apos;re signing up with email <span className='text-white'>{data?.user.email}</span>
                            </p>
                        </Flex>
                        <Flex align={{base: 'start', xs: 'center'}}  gap={{base: 50, xs: 65}} direction={{base: 'column', xs: 'row'}}>

                            <Flex justify='center' align='center' className={`relative h-36 w-36 bg-transparent ${activeProfile ? 'border-solid' : 'border-dotted'} border-2 border-gray-400 rounded-full text-white`}>
                                {/* {initials} */}
                                {activeProfile ? <img src={activeProfile.svg} alt="avatar" className="w-full h-full rounded-full" /> : Icons('IconUser',44,44,'#c0c0c0')}
                                {/* {Icons('IconUser',44,44,'#c0c0c0')} */}
                                <Popover open={isAvatarPopoverOpen} onOpenChange={(isOpen) => {setIsAvatarPopoverOpen(isOpen);}}>
                                    <PopoverTrigger asChild>
                                        <Flex justify='center' align='center' className='cursor-pointer absolute bottom-0 right-0 rounded-full w-9 h-9 bg-background border-1 border-gray-500'>
                                            {Icons('IconEdit',15,15,'#f0f0f0')}
                                        </Flex>
                                    </PopoverTrigger>
                                    <PopoverContent className="absolute w-[270px] sm:w-[365px]" onClose={() => setIsAvatarPopoverOpen(false)} side='bottom' align='start' >
                                    <div className="grid gap-4">
                                            <div className="space-y-2 grid gap-3">
                                                {/* <Input id="picture" type="file" className='cursor-pointer' text='s' /> */}
                                                
                                                <FormProvider {...form}>
                                                    <FormField
                                                        control={form.control}
                                                        name="avatar"
                                                        render={({ field: { value, onChange, ...fieldProps } }) => (
                                                            <FormItem >
                                                                <Flex justify='space-between' align='center' pb={10}>
                                                                    <FormLabel>Avatar</FormLabel>
                                                                </Flex>

                                                                <Flex wrap='wrap' gap={10}>
                                                                    {avatarList.map((item, index) => (
                                                                        <img onClick={() => setActiveProfile(item)} key={index} src={item.svg} 
                                                                        alt="avatar" className={`cursor-pointer w-9 h-9 rounded-full border-solid border-[1.5px]  ${activeProfile?.svg === item.svg ? 'border-white' : 'border-transparent'}`} />
                                                                    ))}
                                                                </Flex>
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="picture"
                                                        render={({ field: { value, onChange, ...fieldProps } }) => (
                                                            <FormItem>
                                                                <FormLabel>Picture</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...fieldProps}
                                                                        placeholder="Picture"
                                                                        type="file"
                                                                        accept="image/*"
                                                                        className='cursor-pointer h-9 py-1.5 text-muted-foreground'
                                                                        onChange={(event) =>
                                                                            onChange(event.target.files && event.target.files[0])
                                                                        }
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </FormProvider>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            
                            </Flex>


                            <Flex direction='column' gap={30} className='w-72'>
                                <Flex direction='column' gap={10}>

                                <Label>Full Name</Label>
                                <Input
                                    placeholder="John Doe"
                                    className='h-9 px-2.5 text-muted-foreground'
                                />
                                </Flex>

                                <Flex direction='column' gap={10}>

                                <Label>Password</Label>
                                <Input
                                    type='password'
                                    className='h-9 px-2.5 text-muted-foreground'
                                />
                                </Flex>

                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </div>}
        </>
    );
};

export default Onboarding;
