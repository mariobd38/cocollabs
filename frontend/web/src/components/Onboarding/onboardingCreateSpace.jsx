import React, {useState} from 'react';
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { motion } from "framer-motion";

import { Avatar } from '@mantine/core';
import { FormControl,FormDescription,Form,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form"
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';
import { Button } from "@/components/ui/button"
import { IconsFilled } from '@/components/icons/iconsFilled';

import { handleSpaceCreation } from '@/api/onboarding/handleSpaceCreation';

import SpaceCreationIconsPopover from '@/components/Home/SpaceCreationModal/spaceCreationIconsPopover';
import createSpaceIllustration from '@/assets/illustrations/onboarding/createSpace.svg';
import { generateSpaceIconJson } from '@/utils/generateSpaceIconJson';

const formSchema = z.object({
    name: z.string().nonempty({ message: "Organization name is required." }),
    description: z.string().optional(),
    type: z.string().nonempty({
      message: "Please select a space type.",
    }),
});
const profileSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--mantine-scale')) || 1;
const size = 3 * 0.5 * profileSize * 16;
const spaceTyes = [
    { label: 'Personal', value: 'personal' },
    { label: 'Small team', value: 'small_team' },
    { label: 'Startup', value: 'startup' },
    { label: 'Company', value: 'company' },
]

const OnboardingCreateSpace = ({stepNumProps,fullName,setIsOnboardingComplete}) => {
    const { stepNum,setStepNum,stepDisplay } = stepNumProps;
    
    const [color, setColor] = useState('#848484');
    const [spaceIcon, setSpaceIcon] = useState(<Avatar bg={color} variant='light' radius='calc(0.25rem * 1)' >
        {IconsFilled('IconUserFilled', size, size, '#fafafa')}</Avatar>);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            type: "personal",
        },
    });
    // const { formState: { isValid } } = form;

    const onSubmit = async (data) => {
        try {
            const response = await handleSpaceCreation({
                name: form.getValues('name'),
                description: form.getValues('description'),
                icon: generateSpaceIconJson(spaceIcon),
                type: form.getValues('type'),
            });

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
            Create your first space
            </h1>
            <p className="text-gray-400 text-wrap leading-5 text-sm">
            This space will hold your organization&apos;s details. Think of it like a container for your entire project!
            </p>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full pt-5'>
                <div className='flex flex-col sm:flex-row gap-12 sm:gap-16'> 
                    <div className='flex flex-col w-full'>
                        <div className='flex flex-col gap-3'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel className='text-gray-200'>Icon & Name</FormLabel>
                                    <div className='gap-2.5 flex flex-col sm:flex-row'>
                                        <div className='flex'>
                                            <SpaceCreationIconsPopover 
                                                color={color}
                                                setColor={setColor}
                                                spaceIcon={spaceIcon}
                                                setSpaceIcon={setSpaceIcon}
                                                colorMode='dark'
                                            />
                                        </div>
                                        <Input
                                            autoComplete="off"
                                            placeholder={`Organization name`} 
                                            className='pb-2 px-2.5 placeholder:text-muted-foreground text-gray-100'
                                            {...field} 
                                        />
                                    </div>
                                    <FormMessage className='py-0 text-red-700 text-[13px]'/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
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

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Type</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl className='w-full'>
                                        <SelectTrigger >
                                            <SelectValue placeholder="What would best describe your organization?" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className='w-full'>
                                            {spaceTyes.map((spaceType) => (
                                                <SelectItem key={spaceType.value} value={spaceType.value}>{spaceType.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        What would best describe your organization?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-3 mt-8'>
                    <Button type="submit" className='w-16 h-5 bg-gray-100 text-zinc-800 hover:bg-white/80 transition-all duration-300'>Continue</Button>
                </div>

            </form>
        </Form>
    </>;

    const illustration = (
        <div className='w-2/5 items-center justify-center min-h-screen bg-cyan-700 hidden lg:flex'>
            <img src={createSpaceIllustration} alt='create profile' className='w-3/4' />
        </div>
    );

    const transitionVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    return (
        <>
            <div className='flex flex-col py-20 sm:py-[120px] gap-10 px-6 sm:px-12' >

                {/* <Flex direction='column' gap={40} py={100} px={{base: 20, xs: 40}} align={{base: 'center', md: 'start'}} > */}
                    {stepDisplay}
                    <motion.div
                        className='w-full'
                        key="spaceStep"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={transitionVariants}
                        transition={{ duration: 0.5 }}
                    >
                        {main}
                    </motion.div> 
                {/* </Flex> */}
            </div>
            {illustration}
        </>
    );
};

export default OnboardingCreateSpace;