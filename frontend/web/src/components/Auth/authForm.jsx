import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '@mantine/hooks';
import {  GoogleIcon } from '@/components/Auth/OAuthIcons/googleIcon';
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Icons } from '@/components/icons/icons';

import AuthSideBlock from '@/components/Auth/authSideBlock';


const AuthForm = ({ navigate, form, onSubmit, content }) => {
// const AuthForm: React.FC<AuthFormParameters> = ({ form, onSubmit, content }) => {
// const AuthForm = ({form,onSubmit,content}) => {
    // const navigate = useNavigate();
    const [authOrigin, setAuthOrigin] = useLocalStorage({
        key: 'auth_origin',
        defaultValue: '',
    });

    const handleGoogleLogin = async () => {
        // window.location.href = `${GOOGLE_AUTH_URL}`;
        setAuthOrigin('login');
    };

    return (
        <div className='min-h-dvh'>
            <div className='w-full bg-background'>
                <div className='flex m-auto md:grid lg:grid-cols-2' >
                    <div className='flex flex-col items-center justify-center w-full min-h-screen py-32'>
                        {/* <div className='py-8 bg-transparent sm:w-[560px] w-full px-12 sm:px-0'  > */}
                        <div className='mx-auto px-10 sm:px-4 py-8 max-w-[660px] w-full'  >
                                
                            <div className='flex flex-col items-center gap-2 font-["Nunito_Sans"]' >
                                <h1 className='text-3xl font-semibold text-white tracking-light text-center'>
                                    {content.header.title}
                                </h1>

                                <p className='text-sm text-center mb-5 text-white/60'>
                                    {content.header.subtitle}
                                </p>
                            </div>

                            <div className='flex flex-col m-auto sm:w-[80%] pt-5' >
                                <div>
                                    <a className="px-2 flex h-10 py-1 border !border-[#424345] hover:bg-zinc-900/5 text-zinc-950/70 rounded-lg justify-center items-center gap-2.5" href="/#" onClick={e => { e.preventDefault(); handleGoogleLogin();}}>
                                        <div className="w-4 h-4">
                                            <GoogleIcon />
                                        </div>
                                        <div className="text-center font-semibold text-sm text-zinc-100">Continue with Google</div>
                                    </a>

                                    <div className='py-[30px]'>
                                        <Divider text='or' theme='dark' />
                                    </div>
                                </div>
                                
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                                        <div className='flex flex-col gap-3'>
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem >
                                                        <FormLabel className='text-zinc-100'>Email address</FormLabel>
                                                        <Input
                                                            startIcon={Icons('IconMail',18,18,'#929292')}
                                                            autoComplete="off"
                                                            placeholder="Enter your email"
                                                            className='rounded-lg placeholder:text-muted-foreground bg-transparent border border-[#424345] text-zinc-100'
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
                                                        <FormLabel className='text-zinc-100'>Password</FormLabel>
                                                        <Input
                                                            startIcon={Icons('IconLock',18,18,'#929292')}
                                                            placeholder="Enter your password"
                                                            autoComplete="off"
                                                            type='password'
                                                            className='rounded-lg placeholder:text-muted-foreground bg-transparent border border-[#424345] text-zinc-100'
                                                            {...field} 
                                                        />
                                                        <FormMessage className='py-0 text-red-700 text-[13px]'/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className='font-["Nunito_Sans"] flex flex-col-reverse sm:flex-row justify-between mt-6 gap-4' >
                                            <div className='flex items-center'>
                                                <p className='text-sm text-white/60'>{content.footer.text}</p>
                                                <a className='pl-2 text-sm text-white/100 hover:text-blue-400 bg-transparent' onClick={(e) => {e.preventDefault(); navigate(content.footer.linkPath)}} href="/#">
                                                {content.footer.link}
                                                </a>
                                            </div>
                                            <Button type="submit" className='h-5 sm:w-16 bg-zinc-100 text-zinc-800 hover:bg-white/80 transition-all duration-300 font-semibold rounded-lg'>Continue</Button>
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

export default AuthForm;