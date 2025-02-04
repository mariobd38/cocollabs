import React, {useState} from 'react';
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { motion, AnimatePresence } from "framer-motion";

import { Avatar,Flex,Box } from '@mantine/core';

import { FormControl,FormDescription,Form,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form"
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';
import { Button } from "@/components/ui/button"
import { IconsFilled } from '@/components/icons/iconsFilled';
import Logo2 from '@/components/Logo/logo2';

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

const OnboardingCreateSpacev2 = ({stepNumProps,fullName,setIsOnboardingComplete}) => {
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
    const { formState: { isValid } } = form;

    // const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-4'>
                <Flex align='start' gap={{base: 50, xs: 65}} direction={{base: 'column', xs: 'row'}}> 

                    <Flex direction='column' gap={30} w='100%'>
                        <Flex direction='column' >
                            <Flex direction='column' className='space-y-2.5' >
                                <Flex align='center' gap={15}>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel className='text-gray-200'>Icon & Name</FormLabel>
                                                <Flex gap={10} direction={{base: 'column', xs: 'row'}}>
                                                    <Flex>
                                                        <SpaceCreationIconsPopover 
                                                            color={color}
                                                            setColor={setColor}
                                                            spaceIcon={spaceIcon}
                                                            setSpaceIcon={setSpaceIcon}
                                                            colorMode='dark'
                                                        />
                                                    </Flex>
                                                    <Input
                                                        autoComplete="off"
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
                            </Flex>
                        </Flex>


                        <Flex direction='column'>
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
                                        <SelectItem value="personal">Personal</SelectItem>
                                        <SelectItem value="small_team">Small team</SelectItem>
                                        <SelectItem value="startup">Startup</SelectItem>
                                        <SelectItem value="company">Company</SelectItem>
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
                    <Button disabled={!isValid} type="submit" className='w-12 h-5 bg-gray-100 hover:bg-gray-300 transition-all duration-300' >Continue</Button>
                </Flex>
            </form>
        </Form>
    </>;

    const illustration = (
        <Flex w='40%' justify='center' align='center' className='bg-teal-600 min-h-screen' display={{base: 'none', md: 'flex'}}>
            <img src={createSpaceIllustration} alt='create profile' className='w-3/4' />
        </Flex>
    );

    const transitionVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    return (
        <>
            {/* {!isOnboardingComplete ?
            <>
            
            <Flex direction='column' gap={40} py={120} px={{base: 20, xs: 40}} align={{base: 'center', md: 'start'}} >
                <div className='w-36 '>
                <Logo2 strokeColor='#f0f0f0'/>
                </div>

                
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
                
            </Flex>
            {illustration}</>

            :
                <motion.div
                    className='w-full'
                    key="spaceStep"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={transitionVariants}
                    transition={{ duration: 0.5 }}
                  >
                    {completed}
                  </motion.div>} */}


{/* {!isOnboardingComplete ? */}
            <>
            
            <Flex direction='column' align={{base: 'center', md: 'start'}} >
                <Flex px={{base: 20, xs: 40}} pt={30}>
                <div className='w-36 '>
                    <Logo2 strokeColor='#f0f0f0'/>
                </div>
                </Flex>

                <Flex direction='column' gap={40} py={100} px={{base: 20, xs: 40}} align={{base: 'center', md: 'start'}} >


                
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
                </Flex>
                
            </Flex>
            {illustration}</>

            {/* :
                <motion.div
                    className='w-full'
                    key="spaceStep"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={transitionVariants}
                    transition={{ duration: 0.5 }}
                  >
                    {completed}
                  </motion.div>} */}
        </>
    );
};

export default OnboardingCreateSpacev2;