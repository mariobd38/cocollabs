import React from 'react';
import { FormProvider,useForm } from "react-hook-form";

import { Icons } from '@/components/icons/icons';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import { Flex,Box } from '@mantine/core';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import createProfileIllustration from '@/assets/illustrations/onboarding/createProfile.svg';
import { handleProfileCreation } from '@/api/Users/handleProfileCreation';

const avatars = import.meta.glob('@/assets/avatars/*.svg', { eager: true });
const avatarList = Object.entries(avatars)
    .sort(([a], [b]) => {
        // Extract numbers from file names to ensure correct order
        const numA = parseInt(a.match(/\d+/)?.[0] || 0, 10);
        const numB = parseInt(b.match(/\d+/)?.[0] || 0, 10);
        return numA - numB;
    })
    .map(([path, avatar]) => ({
        name: path.split('/').pop(), // Extract file name
        svg: avatar.default, // Actual SVG content
    }));


const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
//image validation

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
    // avatar: z.any().nullable().refine(value => value !== null, {
    //     message: "Please select an avatar.",
    // }),
    // image: z.instanceof(File).refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    //     message: "Only these types are allowed: .jpg, .jpeg, .png, and .webp",
    // }).nullable(),
    avatar: z.any().nullable(),  // Can be null
    image: z.union([
        z.instanceof(File).refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: "Only these types are allowed: .jpg, .jpeg, .png, and .webp",
        }),
        z.null(),
    ]),
    }).refine(
        (data) => data.avatar !== null || data.image !== null,
        {
            message: "Please select an avatar.",
            path: ["avatar"], // ✅ Attach error message to avatar field

        }
);

 const OnboardingCreateProfilev2 = ({data, stepNumProps, imageCropperProps, avatarPopoverProps, profileProps}) => {
    const { stepNum, setStepNum } = stepNumProps;
    const { setOpenImageCropper, setImageToCrop, previewUrl, setPreviewUrl,croppedFile,setCroppedFile } = imageCropperProps;
    const { isAvatarPopoverOpen, setIsAvatarPopoverOpen } = avatarPopoverProps;
    const { activeProfile, setActiveProfile } = profileProps;
    // const [activeProfile, setActiveProfile] = useState(null);
    // const [previewUrl, setPreviewUrl] = useState(null);
    // const [openImageCropper, setOpenImageCropper] = useState(false);
    //const [isAvatarPopoverOpen, setIsAvatarPopoverOpen] = useState(false);
    // const form = useForm({
    //     resolver: zodResolver(FormSchema)
    // });

    const onboardingForm = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            username: "",
            avatar: null,
            picture: null,
            image: null,
        },
    });
    const imageRef = onboardingForm.register("file");


    const onSubmit = async (data) => {
        console.log(croppedFile);
        try {
            switch(stepNum) {
                case 0: {
                    const response = await handleProfileCreation({
                        fullName: onboardingForm.getValues('fullName'),
                        username: onboardingForm.getValues('username'),
                        avatarName: onboardingForm.getValues('avatar'),
                    }, onboardingForm,croppedFile);
                    if (response && response.status === 200) {
                        setStepNum(stepNum + 1);
                    }
                    break;
                }
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const main = <>
        <Flex direction="column" gap={10}>
            <Box fz={{base: 26, xs: 30}} lh={{base: 32, xs: 36}}>
                <h1 className="text-gray-100  text-wrap">
                Welcome to Cocollabs
                </h1>
            </Box>
            <Box fz={{base: 12, xs: 14}} lh={1}>
                <p className="text-gray-400 text-wrap">
                You&apos;re signing up with email <span className='text-white'>{data?.user.email}</span>
                </p>
            </Box>
        </Flex>
        <Form {...onboardingForm}>
            <form onSubmit={onboardingForm.handleSubmit(onSubmit)} >
                <Flex align={{base: 'start', xs: 'start'}}  gap={{base: 50, xs: 65}} direction={{base: 'column', xs: 'row'}}> 

                    <Flex justify='center' align='center' className={`relative h-36 w-36 bg-transparent ${(activeProfile || previewUrl) ? 'border-solid' : 'transition-all duration-500 linear border-dashed hover:border-gray-100'} border-1 border-gray-700 rounded-full text-white`}>
                        {activeProfile ? <img src={activeProfile.svg} alt="avatar" className="w-full h-full rounded-full" /> 
                        : previewUrl ? 
                        <img src={previewUrl} alt="Preview" className="w-full h-full rounded-full object-cover"/>
                        // <img src={previewUrl} alt="avatar" className="w-full h-full rounded-full" />
                        : <Flex justify='center' align='center' className="h-32 w-32 rounded-full bg-neutral-800 ">

                            {Icons('IconUser',40,40,'#c0c0c0')}
                        </Flex>}
                        {/* {Icons('IconUser',44,44,'#c0c0c0')} */}
                        <Popover open={isAvatarPopoverOpen} onOpenChange={(isOpen) => {setIsAvatarPopoverOpen(isOpen);}}>
                            <PopoverTrigger asChild>
                                <Flex justify='center' align='center' className='cursor-pointer absolute bottom-0 right-0 rounded-full w-9 h-9 bg-background border-1 border-gray-500'>
                                    {Icons('IconEdit',15,15,'#f0f0f0')}
                                </Flex>
                            </PopoverTrigger>
                            <PopoverContent className="absolute w-[270px] sm:w-[334px]" onClose={() => setIsAvatarPopoverOpen(false)} side='bottom' align='start' >
                                <div className="grid gap-4">
                                    <div className="space-y-2 grid gap-3">
                                    {/* <FormProvider {...form}> */}
                                        {/* <FormField
                                            control={onboardingForm.control}
                                            name="avatar"
                                            render={({ field: { value, onChange, ...fieldProps } }) => (
                                                <FormItem >
                                                    <Flex justify='space-between' align='center' pb={10}>
                                                        <FormLabel>Avatar</FormLabel>
                                                    </Flex>

                                                    <Flex wrap='wrap' gap={10}>
                                                        {avatarList.map((item, index) => (
                                                            <img onClick={() => setActiveProfile(item)} key={index} src={item.svg} 
                                                            alt="avatar" className={`cursor-pointer w-8 h-8 rounded-full border-solid border-[1.5px]  ${activeProfile?.svg === item.svg ? 'border-white' : 'border-transparent'}`} />
                                                        ))}
                                                    </Flex>
                                                </FormItem>
                                            )}
                                        /> */}
                                        <FormField
                                            control={onboardingForm.control}
                                            name="avatar"
                                            render={({ field: { value, onChange, ...fieldProps } }) => (
                                                <FormItem>
                                                    <Flex justify='space-between' align='center' pb={10}>
                                                        <FormLabel className='text-gray-100'>Avatar</FormLabel>
                                                    </Flex>


                                                    <Flex wrap='wrap' gap={10}>
                                                        {avatarList.map((item, index) => (
                                                            <img 
                                                                // onClick={() => {onChange(item); setActiveProfile(item)}} 
                                                                onClick={async () => {
                                                                    try {
                                                                        setActiveProfile(item);
                                                                        onChange(item.name);
                                                                        setPreviewUrl(null);
                                                                        onboardingForm.setValue('image', null);
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
                                                    {/* <FormMessage className='py-0 text-red-800 text-[13px]'/> */}
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={onboardingForm.control}
                                            name="image"
                                            render={({ field: { value, onChange, ...fieldProps } }) => (
                                                <FormItem>
                                                    <FormLabel className='text-gray-100'>Picture</FormLabel>

                                                    <FormControl>
                                                        <Input
                                                            {...fieldProps}
                                                            {...imageRef}
                                                            placeholder="Picture"
                                                            type="file"
                                                            accept="image/*"
                                                            className='cursor-pointer h-9 py-1.5 text-muted-foreground'
                                                            onChange={(event) => {
                                                                // onChange(event.target.files && event.target.files[0])
                                                                // console.log(event.target.files && event.target.files[0])
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
                                            {/* </FormProvider> */}
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        
                    </Flex>

                            
                    <Flex direction='column' gap={30} className='w-72'>
                        <Flex direction='column' gap={20}>
                            {/* <Form {...onboardingForm} >
                                <form onSubmit={onboardingForm.handleSubmit(onSubmit)} > */}
                                    {/* <FormProvider {...onboardingForm} > */}
                                        <Flex direction='column' gap={15}>
                                            <FormField
                                                control={onboardingForm.control}
                                                name="fullName"
                                                render={({ field }) => (
                                                    <FormItem >
                                                        <FormLabel className='text-gray-100'>Full name <span className='text-muted-foreground'>*</span></FormLabel>
                                                        <Input
                                                            placeholder="John Doe"
                                                            className='h-9  pb-2 px-2.5 placeholder:text-muted-foreground text-gray-100'
                                                            {...field} 
                                                        />
                                                        <FormMessage className='py-0 text-red-700 text-[13px]'/>
                                                    </FormItem>
                                                    
                                                )}
                                            />

                                            <FormField
                                                control={onboardingForm.control}
                                                name="username"
                                                render={({ field }) => (
                                                    <FormItem >
                                                        <FormLabel className='text-gray-100'>Username <span className='text-muted-foreground'>*</span></FormLabel>
                                                        <Input
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
                                        
                                    {/* </FormProvider> */}
                                    {/* <Button type="submit" className='mt-4 w-28 h-5 bg-gray-100' >Continue</Button> */}

                                {/* </form>
                            </Form> */}

                            {/* <FormProvider {...onboardingForm}>
                                <FormField
                                    control={onboardingForm.control}
                                    name="occupation"
                                    render={({ field }) => (
                                        <FormItem >
                                            <Label>Job Title <span className='text-muted-foreground'>*</span></Label>
                                            <Input
                                                placeholder="Software Engineer"
                                                className='h-9 px-2.5 placeholder:text-muted-foreground text-gray-100'
                                                {...field} 
                                            />
                                        </FormItem>
                                    )}
                                />

                                
                            </FormProvider> */}

                        </Flex>
                    </Flex>
                </Flex>
                <Flex direction='column' mt={20} gap={20}>
                    {(onboardingForm.formState.errors.avatar || onboardingForm.formState.errors.image) &&
                    <p className='text-red-700 text-[13px] font-medium'>{onboardingForm.formState.errors.avatar?.message}</p>}
                    {/* <Box>{onboardingForm.formState.errors.avatar?.message}</Box> */}
                    <Button type="submit" className='w-28 h-5 bg-gray-100' >Continue</Button>
                </Flex>

            </form>
        </Form>
        </>;

    const illustration = (
        <Flex w='40%' justify='center' align='center' style={{minHeight: 'calc(100vh - 65px)'}} className='bg-gray-600' display={{base: 'none', md: 'flex'}}>
            <img src={createProfileIllustration} alt='create profile' className='w-3/4' />
        </Flex>
    );

    // return {main,illustration};
    return (
        <>
        <Flex direction='column' gap={40} py={40} px={40}>
            <Flex gap={20}>
                {[...Array(3)].map((_, i) => <div key={i} className={`w-20 h-1 ${i < stepNum ? 'bg-green-700' : 'bg-gray-500'} rounded-full`} />)}
            </Flex>
            {main}
        </Flex>
        {illustration}
        </>
    );
};

export default OnboardingCreateProfilev2;