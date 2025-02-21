import React, { useState,Suspense,lazy } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

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
    }).refine((data) => data.avatar !== null || data.image !== null,{
        message: "Please select an avatar or image.",
        path: ["avatar"], // ✅ Attach error message to avatar field
    }
);

const LoadingFallback = () => <></>;
const CustomDialog = lazy(() => import('@/components/customDialog'));
const ImageCropperContent = lazy(() => import('@/components/imageCropperContent'));

 const OnboardingCreateProfile = ({data, stepNumProps, profileProps}) => {
    const { stepNum, setStepNum,stepDisplay } = stepNumProps;
    const { activeProfile, setActiveProfile } = profileProps;
    const [imageToCrop, setImageToCrop] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [croppedFile, setCroppedFile] = useState(null);
    const [openImageCropper, setOpenImageCropper] = useState(false);
    const [isAvatarPopoverOpen, setIsAvatarPopoverOpen] = useState(false);
    let navigate = useNavigate(); 
    // const [activeProfile, setActiveProfile] = useState(null);
    // const [previewUrl, setPreviewUrl] = useState(null);

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
    // const { formState: { isValid } } = form;

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
        <div className="flex flex-col gap-2" >
            <h1 className="text-gray-100 w-full text-wrap text-left text-2xl">
            Complete your profile
            </h1>
            <p className="text-gray-400 text-wrap leading-5 text-sm">
            Add your name, username, and profile picture to personalize your experience
            </p>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full pt-5'>
                <div className='flex flex-col sm:flex-row gap-12 sm:gap-16'> 
                    <div className={`flex items-center justify-center relative w-28 w-28 sm:h-36 sm:w-36 bg-transparent cursor-pointer !border ${(activeProfile || previewUrl) ? 'border-solid' : 'border-dashed'} transition-all duration-500 linear hover:border-gray-100 border-zinc-700 rounded-full`}>
                        <Popover open={isAvatarPopoverOpen} onOpenChange={(isOpen) => {setIsAvatarPopoverOpen(isOpen);}}>
                            <PopoverTrigger asChild>
                                <div>
                                    {activeProfile ? <img src={activeProfile.svg} alt="avatar" className="w-full h-full rounded-full" /> 
                                    : previewUrl ? 
                                    <img src={previewUrl} alt="Preview" className="w-full h-full rounded-full object-cover"/>
                                    : <div className="flex items-center justify-center h-32 w-32 rounded-full bg-neutral-800 ">
                                        {Icons('IconUser',40,40,'#c0c0c0')}
                                    </div>}
                                </div>
                            
                            </PopoverTrigger>
                            <PopoverContent className="absolute w-[300px] sm:w-[334px] bg-background" onClose={() => setIsAvatarPopoverOpen(false)} side='bottom' align='start' >
                                <div className="grid gap-4">
                                    <div className="space-y-2 grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="avatar"
                                            render={({ field: { value, onChange, ...fieldProps } }) => (
                                                <FormItem>
                                                    <div className='flex justify-between items-center pb-2.5'>
                                                        <FormLabel className='text-gray-200'>Avatar</FormLabel>
                                                    </div>

                                                    <div className='flex flex-wrap gap-[10px]'>
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
                                                    </div>
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
                                                                    setIsAvatarPopoverOpen(false);
                                                                    setImageToCrop(imageUrl);
                                                                    setTimeout(() => { setOpenImageCropper(true); },50);
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
                    </div>

                    <div className='flex flex-col w-3/4 sm:w-72'>
                        <div className='flex flex-col gap-3'>
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className='text-gray-200'>Full name <span className='text-muted-foreground'>*</span></FormLabel>
                                        <Input
                                            autoComplete="off"
                                            placeholder="John Doe"
                                            className='h-9 pb-2 px-2.5 placeholder:text-muted-foreground text-gray-100'
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
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-3 mt-8'>
                    {(form.formState.errors.avatar || form.formState.errors.image) &&
                    <p className='text-red-700 text-[13px] font-medium'>{form.formState.errors.avatar?.message}</p>}
                    <Button type="submit" className='w-16 h-5 bg-gray-100 text-zinc-800 hover:bg-white/80 transition-all duration-300'>Continue</Button>
                </div>

            </form>
        </Form>
        <div className='gap-1 flex flex-col w-full text-[13px]'>
            <p className="text-gray-400 text-wrap leading-5">
            You&apos;re signing up with email <span className='text-white'>{data?.user.email}</span>
            </p>
            <p className="text-gray-400 text-wrap leading-5">
                Wrong account? 
                <a className='px-1 text-gray-100 hover:text-blue-400' onClick={() => navigate('/login')} href={() => false}>Login</a>
                instead.
            </p>
        </div>
        </>;

    const illustration = (
        <div className='w-2/5 items-center justify-center min-h-screen bg-cyan-700 hidden lg:flex'>
            <img src={createProfileIllustration} alt='create profile' className='w-3/4' />
        </div>
    );

    return (
        <>
            <div className='flex flex-col py-20 sm:py-[120px] gap-10 px-6 sm:px-12' >
                {stepDisplay}
                {main}
            </div>
            {illustration}

            <Suspense fallback={<LoadingFallback />}>
            {imageToCrop &&
                <CustomDialog
                    trigger={openImageCropper}
                    content={
                        <ImageCropperContent 
                        imageCropperProps={{ imageToCrop,setCroppedFile }}
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