import React, {useState} from 'react';
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
    .map(([, avatar]) => ({
        svg: avatar.default,
    }));

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
//image validation
const FormSchema = z.object({
    images: z.any()
        .refine(files => {return Array.from(files).every(file => file instanceof File)}, { message: "Expected a file" })
        .refine(files => Array.from(files).every(file => ACCEPTED_IMAGE_TYPES.includes(file.type)), "Only these types are allowed .jpg, .jpeg, .png and .webp")
})

//full name and username validation
const formSchema = z.object({
    fullName: z.string()
    .refine((value) => value.trim().split(/\s+/).length >= 2, {
        message: "Full name must include first and last name.",
    }),
    username: z.string().min(4, {
        message: "Username must be at least 4 characters.",
    }).max(40, {
        message: "Username is too long (maximum 40 characters).",
    }),
});

export const OnboardingCreateProfilev2 = ({data,stepNum,setStepNum}) => {
    const [activeProfile, setActiveProfile] = useState(null);
    // const [stepNum, setStepNum] = useState(0);
    const [isAvatarPopoverOpen, setIsAvatarPopoverOpen] = useState(false);
    const form = useForm({
        resolver: zodResolver(FormSchema)
    });

    const onboardingForm = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            username: ""
        },
        
    });
    const onSubmit = async (data) => {
        try {
            switch(stepNum) {
                case 0: {
                    const response = await handleProfileCreation({
                        fullName: onboardingForm.getValues('fullName'),
                        username: onboardingForm.getValues('username'),
                    }, onboardingForm);
                    if (response && response.status === 200) {
                        setStepNum(stepNum + 1);
                    } else {
                        console.error("Profile creation failed:", response);
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
        <Flex align={{base: 'start', xs: 'start'}}  gap={{base: 50, xs: 65}} direction={{base: 'column', xs: 'row'}}>

            <Flex justify='center' align='center' className={`relative h-36 w-36 bg-transparent ${activeProfile ? 'border-solid' : 'border-dotted'} border-2 border-gray-200 rounded-full text-white`}>
                {activeProfile ? <img src={activeProfile.svg} alt="avatar" className="w-full h-full rounded-full" /> : Icons('IconUser',44,44,'#c0c0c0')}
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
                                                        alt="avatar" className={`cursor-pointer w-8 h-8 rounded-full border-solid border-[1.5px]  ${activeProfile?.svg === item.svg ? 'border-white' : 'border-transparent'}`} />
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
                <Flex direction='column' gap={20}>
                    <Form {...onboardingForm} >
                        <form onSubmit={onboardingForm.handleSubmit(onSubmit)} >
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
                                                <FormMessage className='py-0 text-red-800 text-[13px]'/>
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
                                                    This is your public display name.
                                                </FormDescription>
                                                <FormMessage className='py-0 text-red-800 text-[13px]'/>
                                            </FormItem>
                                        )}
                                    />
                                </Flex>
                                
                            {/* </FormProvider> */}
                            <Button type="submit" className='mt-4 w-28 h-5 bg-gray-100' >Continue</Button>

                        </form>
                    </Form>

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
        </Flex></>;

    const illustration = (
        <Flex w='40%' justify='center' align='center' style={{minHeight: 'calc(100vh - 65px)'}} className='bg-gray-600' display={{base: 'none', md: 'flex'}}>
            <img src={createProfileIllustration} alt='create profile' className='w-3/4' />
        </Flex>
    );

    return {main,illustration};
};

