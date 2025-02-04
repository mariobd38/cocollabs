import React, { useState,Suspense,lazy } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import { Flex,Box } from '@mantine/core';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover"
import { Icons } from '@/components/icons/icons';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import createProfileIllustration from '@/assets/illustrations/onboarding/createProfile.svg';
import { handleProfileCreation } from '@/api/onboarding/handleProfileCreation';

import { getAvatars } from '@/utils/getProfileAvatarList';
const avatarList = getAvatars();

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

//full name and username validation
const formSchema = z.object({
    fullName: z.string()
        .refine((value) => value.trim().split(/\s+/).length >= 2, {
            message: "Full name must include first and last name.",
        }),
    username: z.string()
        .min(3, {
            message: "Username must be at least 3 characters.",
        })
        .max(40, {
            message: "Username is too long (maximum 40 characters).",
        }),
    avatar: z.any().nullable(),
    image: z.union([
        z.instanceof(File).refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: "Only these types are allowed: .jpg, .jpeg, .png, and .webp",
        }),
        z.null(),
    ]),
    }).refine(
        (data) => data.avatar !== null || data.image !== null,
        {
            message: "Please select an avatar or image.",
            path: ["avatar"], // ✅ Attach error message to avatar field
        }
);

const LoadingFallback = () => <></>;
const CustomDialog = lazy(() => import('@/components/customDialog'));
const ImageCropperContent = lazy(() => import('@/components/imageCropperContent'));

 const OnboardingCreateProfile = ({data, stepNumProps, imageCropperProps, avatarPopoverProps, profileProps}) => {
    const { stepNum, setStepNum,stepDisplay } = stepNumProps;
    const { openImageCropper,imageToCrop, setOpenImageCropper, setImageToCrop, previewUrl, setPreviewUrl } = imageCropperProps;
    const { isAvatarPopoverOpen, setIsAvatarPopoverOpen } = avatarPopoverProps;
    const { activeProfile, setActiveProfile } = profileProps;
    const [croppedFile, setCroppedFile] = useState(null);
    let navigate = useNavigate(); 
    const routeChange = (path) =>{ 
        navigate(path);
    }
    // const [activeProfile, setActiveProfile] = useState(null);
    // const [previewUrl, setPreviewUrl] = useState(null);
    // const [openImageCropper, setOpenImageCropper] = useState(false);
    //const [isAvatarPopoverOpen, setIsAvatarPopoverOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            username: "",
            avatar: null,
            picture: null,
            image: null,
        },
    });
    const imageRef = form.register("file");
    // ✅ Disable button only if all fields are empty
    const { formState: { isValid } } = form;

    const onSubmit = async (data) => {
        try {
            const response = await handleProfileCreation({
                fullName: form.getValues('fullName'),
                username: form.getValues('username'),
                avatarName: form.getValues('avatar'),
            }, form,croppedFile);
            if (response && response.status === 200) {
                setStepNum(stepNum + 1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const main = <>
        <Flex direction="column" gap={10}>
            <Flex fz={{base: 26, xs: 30}} lh={{base: 32, xs: 36}}>
                <h1 className="text-gray-100 w-full text-wrap text-left">
                Complete your profile
                </h1>
            </Flex>
            <Box fz={{base: 13, xs: 14}} lh={1}>
                <p className="text-gray-400 text-wrap leading-5">
                Add your name, username, and profile picture to personalize your experience
                </p>
            </Box>
        </Flex>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                <Flex gap={{base: 50, xs: 65}} direction={{base: 'column', xs: 'row'}}> 

                    <Flex justify='center' align='center' className={`relative h-36 w-36 bg-transparent ${(activeProfile || previewUrl) ? 'border-solid' : 'border-dashed'} transition-all duration-500 linear hover:border-gray-100 border-1 border-gray-700 rounded-full text-white`}>
                        <Popover open={isAvatarPopoverOpen} onOpenChange={(isOpen) => {setIsAvatarPopoverOpen(isOpen);}}>
                            <PopoverTrigger asChild>
                                <Box>
                                    {activeProfile ? <img src={activeProfile.svg} alt="avatar" className="w-full h-full rounded-full" /> 
                                    : previewUrl ? 
                                    <img src={previewUrl} alt="Preview" className="w-full h-full rounded-full object-cover"/>
                                    : <Flex justify='center' align='center' className="h-32 w-32 rounded-full bg-neutral-800 ">
                                        {Icons('IconUser',40,40,'#c0c0c0')}
                                    </Flex>}
                                    {/* <Flex justify='center' align='center' className='cursor-pointer absolute bottom-0 right-0 rounded-full w-9 h-9 bg-background border-1 border-gray-500'>
                                        {Icons('IconEdit',15,15,'#f0f0f0')}
                                    </Flex> */}
                                </Box>
                            
                            </PopoverTrigger>
                            <PopoverContent className="absolute w-[300px] sm:w-[334px] bg-background" onClose={() => setIsAvatarPopoverOpen(false)} side='bottom' align='start' >
                                <div className="grid gap-4">
                                    <div className="space-y-2 grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="avatar"
                                            render={({ field: { value, onChange, ...fieldProps } }) => (
                                                <FormItem>
                                                    <Flex justify='space-between' align='center' pb={10}>
                                                        <FormLabel className='text-gray-200'>Avatar</FormLabel>
                                                    </Flex>

                                                    <Flex wrap='wrap' gap={10}>
                                                        {avatarList.map((item, index) => (
                                                            <img 
                                                                onClick={async () => {
                                                                    try {
                                                                        setActiveProfile(item);
                                                                        onChange(item.name);
                                                                        setPreviewUrl(null);
                                                                        form.setValue('image', null);
                                                                        setCroppedFile(null);
                                                                    } catch (error) {
                                                                        console.error("Error fetching SVG content:", error);
                                                                    }
                                                                }} 
                                                                key={index} 
                                                                src={item.svg} 
                                                                alt="avatar" 
                                                                className={`cursor-pointer w-8 h-8 rounded-full border-solid border-[1.5px]  
                                                                    ${activeProfile?.svg === item.svg ? 'border-white' : 'border-transparent'}`}
                                                            />
                                                        ))}
                                                    </Flex>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="image"
                                            render={({ field: { value, onChange, ...fieldProps } }) => (
                                                <FormItem>
                                                    <FormLabel className='text-gray-200'>Picture</FormLabel>

                                                    <FormControl>
                                                        <Input
                                                            {...fieldProps}
                                                            {...imageRef}
                                                            placeholder="Picture"
                                                            type="file"
                                                            accept="image/*"
                                                            className='cursor-pointer h-9 py-1.5 text-muted-foreground'
                                                            onChange={(event) => {
                                                                const file = event.target.files?.[0];
                                                                onChange(file);

                                                                if (file) {
                                                                const imageUrl = URL.createObjectURL(file);
                                                                    //setPreviewUrl(imageUrl);
                                                                    setIsAvatarPopoverOpen(false);
                                                                    setImageToCrop(imageUrl);
                                                                    // setActiveProfile(null);
                                                                    setTimeout(() => {
                                                                        
                                                                        setOpenImageCropper(true);
                                                                    },50);
                                                                }
                                                            }}
                                                            
                                                        />
                                                    </FormControl>
                                                    
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </Flex>

                            
                    <Flex direction='column' gap={30} className='w-72'>
                        <Flex direction='column' gap={20}>
                            <Flex direction='column' gap={15}>
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel className='text-gray-200'>Full name <span className='text-muted-foreground'>*</span></FormLabel>
                                            <Input
                                                autoComplete="off"
                                                placeholder="John Doe"
                                                className='h-9  pb-2 px-2.5 placeholder:text-muted-foreground text-gray-100'
                                                {...field} 
                                            />
                                            <FormMessage className='py-0 text-red-700 text-[13px]'/>
                                        </FormItem>
                                        
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel className='text-gray-200'>Username <span className='text-muted-foreground'>*</span></FormLabel>
                                            <Input
                                                autoComplete="off"
                                                placeholder="johndoe123"
                                                className='h-9 px-2.5 placeholder:text-muted-foreground text-gray-100'
                                                {...field} 
                                            />
                                            <FormDescription className='text-[13px]'>
                                                This will be your public display name.
                                            </FormDescription>
                                            <FormMessage className='py-0 text-red-700 text-[13px]'/>
                                        </FormItem>
                                    )}
                                />
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex direction='column' mt={40} gap={20}>
                    {(form.formState.errors.avatar || form.formState.errors.image) &&
                    <p className='text-red-700 text-[13px] font-medium'>{form.formState.errors.avatar?.message}</p>}
                    <Button disabled={!isValid} type="submit" className='w-12 h-5 bg-gray-100 hover:bg-gray-300 transition-all duration-300' >Continue</Button>
                </Flex>

            </form>
        </Form>
        <Flex direction='column' fz={{base: 13, xs: 14}} lh={1} gap={6} w='100%'>
            <p className="text-gray-400 text-wrap leading-5">
            You&apos;re signing up with email <span className='text-white'>{data?.user.email}</span>
            </p>
            <p className="text-gray-400 text-wrap leading-5">
                Wrong account? 
                <a className='px-1 text-gray-100 underline underline-offset-[3px] hover:text-blue-400' onClick={() => routeChange('/login')} href={() => false}>Login</a>
                instead.
            </p>
        </Flex>
        </>;

    const illustration = (
        <Flex w='40%' justify='center' align='center' className='min-h-screen bg-cyan-700' display={{base: 'none', md: 'flex'}}>
            <img src={createProfileIllustration} alt='create profile' className='w-3/4' />
        </Flex>
    );

    return (
        <>
        {/* <Flex direction='column' gap={40} py={40} px={40}> */}
            <Flex direction='column' gap={40} py={120} px={{base: 20, xs: 40}} align={{base: 'center', md: 'start'}} >
                {stepDisplay}
                {main}
            </Flex>
            {illustration}

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

export default OnboardingCreateProfile;