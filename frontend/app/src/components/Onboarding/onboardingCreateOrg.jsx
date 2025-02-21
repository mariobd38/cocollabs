import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { motion } from "framer-motion";

import { FormControl,Form,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form"
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';
import { Button } from "@/components/ui/button"

import { handleOrgCreation } from '@/api/organizations/createOrg';

import createOrgIllustration from '@/assets/illustrations/onboarding/createOrg.svg';


const getSanitizedUrl = (url) => {
    return url.toLowerCase()
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

const formSchema = z.object({
    name: z.string().nonempty({ message: "Name is required." }),
    slug: z.string()
        .nonempty({ message: "URL is required." })
        .superRefine((val, ctx) => {
            if (getSanitizedUrl(val) !== val.toLowerCase()) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Invalid URL format.",
                });
            }
        }),
    description: z.string().optional(),
    type: z.string().nonempty({
        message: "Please select a type for your organization.",
    }),
});
const organizationType = [
    { label: 'Personal', size: '0-1 members', value: 'personal' },
    { label: 'Small team', size: '2-5 members', value: 'small_team' },
    { label: 'Startup', size: '5-100 members', value: 'startup' },
    { label: 'Company', size: '100+ members', value: 'company' },
]

const OnboardingCreateOrg = ({stepNumProps,fullName,setIsOnboardingComplete}) => {
    const { stepNum,setStepNum,stepDisplay } = stepNumProps;
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            slug: "",
            description: "",
            type: "personal",
        },
    });

    const { watch, setValue } = form;
    const name = watch("name");
    useEffect(() => {
        if (name) {
            setValue("slug", getSanitizedUrl(name), { shouldValidate: true });
        }
        
    }, [name, setValue]);

    // const { formState: { isValid } } = form;

    const onSubmit = async (data) => {
        // e.preventDefault();
        // const clickedButton = e.nativeEvent.submitter; // Get the button that was clicked
    // const action = clickedButton?.value; // Get its value

    if (Object.keys(data).length === 0) {
        console.log("User clicked Skip");
        // Handle skip logic
    } else  {
        console.log("User clicked Continue");
        try {
            console.log(form.getValues())
            const response = await handleOrgCreation({
                name: form.getValues('name'),
                description: form.getValues('description'),
                slug: form.getValues('slug'),
                type: form.getValues('type'),
            });

            if (response && response.status === 200) {
                setStepNum(stepNum + 1);
            }
        } catch (error) {
            console.log(error);
        }
    }
        // try {
        //     const response = await handleSpaceCreation({
        //         name: form.getValues('name'),
        //         description: form.getValues('description'),
        //         type: form.getValues('type'),
        //     });

        //     if (response && response.status === 200) {
        //         setStepNum(stepNum + 1);
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }

    const main = <>
        <div className="flex flex-col gap-2" >
            <h1 className="text-gray-100 w-full text-wrap text-left text-2xl">
            Create an organization
            </h1>
            <p className="text-gray-400 text-wrap leading-5 text-sm">
            Finish up by entering your organization&apos;s details.
            </p>
        </div>
        <Form {...form}>
        <form onSubmit={(event) => {
            const action = event.nativeEvent.submitter?.value;
            if (action === "skip") {
                event.preventDefault(); // Prevent normal validation
                onSubmit({}, event); // Call submit handler with empty data
            } else {
                form.handleSubmit(onSubmit)(event); // Run validation for "Continue"
            }
        }} className='w-full pt-5'>
                <div className='flex flex-col sm:flex-row gap-12 sm:gap-16'> 
                    <div className='flex flex-col w-full'>
                        <div className='flex flex-col gap-3'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel className='text-gray-200'>Name</FormLabel>
                                    <div className='gap-2.5 flex flex-col sm:flex-row'>
                                        <Input
                                            autoComplete="off"
                                            placeholder={`Name of company or organization`} 
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
                            name="slug"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel className='text-gray-200'>URL</FormLabel>
                                    <div className='gap-2.5 flex flex-col sm:flex-row'>
                                        <div className="relative w-full">
                                            <div className='absolute z-10 top-2.5 px-2.5 text-sm text-muted-foreground'>
                                                cocollabs.dev/
                                            </div>
                                            <Input
                                                autoComplete="off"
                                                className='pb-2 pl-[106px] placeholder:text-muted-foreground text-gray-100'
                                                {...field} 
                                                // onInput={(e) => {
                                                //     e.target.value = getSanitizedUrl(e.target.value);
                                                //     form.setValue("slug", e.target.value, { shouldValidate: true });
                                                // }}
                                            />
                                        </div>
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
                                            {organizationType.map((type) => (
                                                <SelectItem key={type.value} value={type.value}>{type.label} <span className='text-muted-foreground/80 pl-2.5 text-[13px]'>{type.size}</span></SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex gap-5 mt-8'>
                    <Button type="submit" name='action' value='skip' className='w-16 h-5 bg-zinc-800/90 text-zinc-400 hover:bg-zinc-700/80 transition-all duration-300'>Skip</Button>
                    <Button type="submit" name='action' value='continue' className='w-16 h-5 bg-zinc-100 text-zinc-800 hover:bg-white/80 transition-all duration-300'>Continue</Button>
                </div>

            </form>
        </Form>
    </>;

    const illustration = (
        <div className='w-2/5 items-center justify-center min-h-screen bg-cyan-700 hidden lg:flex'>
            <img src={createOrgIllustration} alt='create profile' className='w-3/4' />
        </div>
    );

    const transitionVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    return (
        <>
            <div className='flex flex-col py-20 sm:py-[120px] gap-10 px-6 sm:px-12 lg:w-1/2 sm:w-2/3 w-5/6' >

                {/* <Flex direction='column' gap={40} py={100} px={{base: 20, xs: 40}} align={{base: 'center', md: 'start'}} > */}
                    {stepDisplay}
                    <motion.div
                        key="orgStep"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={transitionVariants}
                        transition={{ duration: 0.5 }}
                    >
                        <div className='bg-danger-400'>

                        {main}
                        </div>
                    </motion.div> 
                {/* </Flex> */}
            </div>
            {illustration}
        </>
    );
};

export default OnboardingCreateOrg;