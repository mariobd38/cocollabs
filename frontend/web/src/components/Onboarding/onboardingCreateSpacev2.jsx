import React, {useState} from 'react';
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Avatar,Flex,Box } from '@mantine/core';

import { FormControl,FormDescription, Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';
import { Button } from "@/components/ui/button"
import { IconsFilled } from '@/components/icons/iconsFilled';

import SpaceCreationIconsPopover from '@/components/Home/SpaceCreationModal/spaceCreationIconsPopover';
import createSpaceIllustration from '@/assets/illustrations/onboarding/createSpace.svg';

const formSchema = z.object({
    name: z.string().nonempty({ message: "Organization name is required." }),
    description: z.string().optional(),
});
const profileSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--mantine-scale')) || 1;
const size = 3 * 0.5 * profileSize * 16;

const OnboardingCreateSpacev2 = ({stepNumProps,fullName}) => {
    const { stepNum,setStepNum,stepDisplay } = stepNumProps;
    
    const [color, setColor] = useState('#848484');
    const [spaceIcon, setSpaceIcon] = useState(<Avatar bg={color} variant='light' radius='calc(0.25rem * 1)' >
        {IconsFilled('IconUserFilled', size, size, '#fafafa')}</Avatar>);
    const [openIconPopover, setOpenIconPopover] = useState(false);

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

    const onSubmit = async (data) => {
        console.log(data);
        // try {
        //     const response = await handleProfileCreation({
        //         fullName: onboardingForm.getValues('fullName'),
        //         username: onboardingForm.getValues('username'),
        //         avatarName: onboardingForm.getValues('avatar'),
        //     }, onboardingForm,croppedFile);
        //     if (response && response.status === 200) {
        //         setStepNum(stepNum + 1);
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }

    const main = <>
        <Flex direction="column" gap={10}  >
            <Flex fz={{base: 26, xs: 30}} lh={{base: 32, xs: 36}} >
                <h1 className="text-gray-100 w-full text-wrap text-left">
                Create your first space
                </h1>
            </Flex>
            <Box fz={{base: 13, xs: 14}} lh={1}>
                <p className="text-gray-400 text-wrap leading-5">
                Add your name, username, and profile picture to personalize your experience
                </p>
            </Box>
        </Flex>
        <Form {...onboardingForm}>
            <form onSubmit={onboardingForm.handleSubmit(onSubmit)} className='w-full'>
                <Flex align={{base: 'start', xs: 'start'}} gap={{base: 50, xs: 65}} direction={{base: 'column', xs: 'row'}}> 

                    <Flex direction='column' gap={30} w='100%'>
                        <Flex direction='column' >
                            <Flex direction='column' className='space-y-2.5' >
                                <Flex align='center' gap={15}>
                                    <FormField
                                        control={onboardingForm.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel className='text-gray-200'>Icon & Name <span className='text-muted-foreground'>*</span></FormLabel>
                                                <Flex gap={10} direction={{base: 'column', xs: 'row'}}>
                                                    <Flex>
                                                        <SpaceCreationIconsPopover 
                                                            color={color}
                                                            setColor={setColor}
                                                            spaceIcon={spaceIcon}
                                                            setSpaceIcon={setSpaceIcon}
                                                            colorMode='dark'
                                                            setOpenIconPopover={setOpenIconPopover}
                                                        />
                                                    </Flex>
                                                    <Input
                                                        placeholder={`Organization name`} 
                                                        className='pb-2 px-2.5 placeholder:text-muted-foreground text-gray-100'
                                                        {...field} 
                                                    />
                                                </Flex>
                                                <FormMessage className='py-0 text-red-700 text-[13px]'/>
                                            </FormItem>
                                        )}
                                    />
                                </Flex>
                            </Flex>
                        </Flex>


                        <Flex direction='column'>
                            <Flex align='center'>
                                <FormField
                                    control={onboardingForm.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel className='text-gray-200'>Description</FormLabel>
                                            <div className='flex'>
                                                <Textarea
                                                    placeholder={`What does your organization do?`} 
                                                    className='px-2.5 placeholder:text-muted-foreground text-gray-100'
                                                    {...field} 
                                                />
                                            </div>
                                            <FormMessage className='py-0 text-red-700 text-[13px]'/>
                                        </FormItem>
                                    )}
                                />
                            </Flex>
                        </Flex>


                        <Flex direction='column'>
                        <FormField
                            control={onboardingForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                <FormLabel>Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className='w-full'>
                                    <SelectTrigger >
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className='w-full'>
                                    <SelectItem defaultValue value="m@example.com">m@example.com</SelectItem>
                                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    What would best describe your organization?
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </Flex>

                    </Flex>
                </Flex>
                <Flex direction='column' mt={40} gap={20}>
                    <Button type="submit" className='w-12 h-5 bg-gray-100 hover:bg-gray-300 transition-all duration-300' >Continue</Button>
                </Flex>

            </form>
        </Form>
        </>;

    const illustration = (
        <Flex w='40%' justify='center' align='center' className='bg-teal-600 min-h-screen' display={{base: 'none', md: 'flex'}}>
            <img src={createSpaceIllustration} alt='create profile' className='w-3/4' />
        </Flex>
    );

    return (
        <>
            <Flex direction='column' gap={40} py={100} px={{base: 20, xs: 40}} align={{base: 'center', md: 'start'}} >
                {stepDisplay}
                {main}
            </Flex>
            {illustration}
        </>
    );
};

export default OnboardingCreateSpacev2;