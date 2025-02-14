import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import { Icons } from '@/components/icons/icons';
import {  GoogleIcon } from '@/components/Auth/OAuthButtons/googleIcon';
import { GithubButton } from '@/components/Auth/OAuthButtons/githubButton';
import AuthSideBlock from '@/components/Auth/authSideBlock';

// import { SlackButton } from './slackButton';

const formSchema = z.object({
    email: z.string()
        .min(1, { message: "Email is required." })
        .email({ message: "Email is invalid or already in use."}),
    password: z.string()
        .min(1, { message: "Password is required." })
        .min(8, { message: "Password must be at least 8 characters."})
        .max(128, { message: "Password is too long (maximum 128 characters)." })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one number." })
        .regex(/[\W_]/, { message: "Password must contain at least one special character." })
});

const SignupContentv2 = (props) => {
    const { handleGoogleLogin,showOAuth2Buttons } = props;

    const navigate = useNavigate();

    const form = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
                email: "",
                password: "",
            },
    });
    const { formState: { isValid } } = form;

    const onSubmit = async (data) => {
        const reqBody = {
            email: form.getValues('email'),
            password: form.getValues('password'),
        };
        try {
            const response = await fetch("/api/auth/signup", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "post",
                body: JSON.stringify(reqBody),
            });

            if (response.status === 200) {
                // setIsAuthenticated(true);
                // setIsOnboarded(false);
                navigate('/onboarding');
            } else {
                console.error("Unexpected error with user registration");
            }
        } catch (error) {
            console.error(error);
            console.error("Error with API call to register user");
        }
    }

    return (
        <div className='min-h-dvh'>
            <div className='w-full bg-background'>
                <div className='flex m-auto md:grid lg:grid-cols-2' >
                    <div className='flex flex-col items-center justify-center w-full min-h-screen py-32'>
                        {/* <div className='py-8 bg-transparent sm:w-[560px] w-full px-12 sm:px-0'  > */}
                        <div className='mx-auto px-10 sm:px-4 py-8 max-w-[660px] w-full'  >
                                
                            <div className='flex flex-col items-center gap-1 font-["Nunito_Sans"]' >
                                <h1 className='text-3xl font-semibold text-white tracking-light text-center'>
                                    Welcome to Cocollabs
                                </h1>

                                <p className='text-sm text-center mb-5 text-white/60'>
                                    Sign up for free. No credit card required.
                                </p>
                            </div>

                            <div className='flex flex-col m-auto sm:w-[80%]' >
                                {showOAuth2Buttons &&
                                    <div>
                                        <a className="px-2 flex h-10 py-1 border !border-[#424345] hover:bg-zinc-900/5 text-zinc-950/70 rounded-lg justify-center items-center gap-2.5" href="/#" onClick={e => { e.preventDefault(); handleGoogleLogin();}}>
                                            <div className="w-4 h-4">
                                                <GoogleIcon />
                                            </div>
                                            <div className="text-center font-semibold text-sm text-gray-100">Continue with Google</div>
                                        </a>

                                        <div className='py-[30px]'>
                                            <Divider text='or' theme='dark' />
                                        </div>
                                    </div>
                                }
                                
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                                        <div className='flex flex-col gap-3'>
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem >
                                                        <FormLabel className='text-gray-200'>Email address</FormLabel>
                                                        <Input
                                                            startIcon={Icons('IconMail',18,18,'#929292')}
                                                            autoComplete="off"
                                                            placeholder="Enter your email"
                                                            className='rounded-lg placeholder:text-muted-foreground bg-transparent border border-[#424345] text-gray-100'
                                                            {...field} 
                                                        />
                                                        <FormMessage className='py-0 text-red-700 text-[13px]'/>
                                                    </FormItem>
                                                    
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem >
                                                        <FormLabel className='text-gray-200'>Password</FormLabel>
                                                        <Input
                                                            startIcon={Icons('IconLock',18,18,'#929292')}
                                                            placeholder="Enter your password"
                                                            autoComplete="off"
                                                            type='password'
                                                            className='rounded-lg placeholder:text-muted-foreground bg-transparent border border-[#424345] text-gray-100'
                                                            {...field} 
                                                        />
                                                        <FormMessage className='py-0 text-red-700 text-[13px]'/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className='font-["Nunito_Sans"] flex flex-col-reverse sm:flex-row justify-between mt-6 gap-4' >
                                            <div className='flex items-center'>
                                                <p className='text-sm text-white/60'>
                                                    Already have an account?
                                                </p>
                                                <a className='cursor-pointer pl-2 text-sm text-white/100 hover:text-blue-400 bg-transparent border-none' onClick={(e) => {e.preventDefault(); navigate('/login')}} href="/#">
                                                    Log In
                                                </a>
                                            </div>
                                            <Button type="submit" className='h-5 sm:w-16 bg-gray-100 text-zinc-800 hover:bg-white/80 transition-all duration-300 font-semibold rounded-lg'>Continue</Button>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <AuthSideBlock  />
                </div>
            </div>
        </div>
    );
};

export default SignupContentv2;