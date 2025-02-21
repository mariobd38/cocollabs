import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import { UseAuth } from '@/hooks/authProvider';
import { authStatusInfo } from '@/api/Auth/status';
// import { getLastActiveSpaceInfo } from '@/api/spaces/getLastActiveSpace';
import { getLastActiveOrganizationInfo } from '@/api/organizations/getLastActive';

import AuthForm from '@/components/Auth/authForm';

// import { SlackButton } from './slackButton';

const formSchema = z.object({
    email: z.string()
        .min(1, { message: "Email is required." }),
    password: z.string()
        .min(1, { message: "Password is required." })
});

const Login = () => {
    const navigate = useNavigate();
    const { updateAuthStatus } = UseAuth();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        const reqBody = {
            email: form.getValues('email'),
            password: form.getValues('password'),
        };
        try {
            const response = await fetch("/api/auth/login", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(reqBody),
            });

            if (response.status === 200) {
                const loginData = await response.json();
                await updateAuthStatus();

                const { isAuthenticated, isOnboarded } = await authStatusInfo();
                if (isAuthenticated && isOnboarded) {
                    try {
                        const activeUserOrg = await getLastActiveOrganizationInfo();
                        navigate(`/${activeUserOrg.slug}`, { state: { loginData } });
                    } catch(error) {
                        console.error("Could not redirect to user space:", error);
                    }
                    // navigate('/home', { state: { loginData } });
                } else if (!isOnboarded) {
                    navigate('/onboarding', { state: { loginData } });
                }
    
            } else if (response.status === 401) {
                form.setError('password', { message: 'Incorrect email or password.' });
            } else {
                form.setError('password', { message: 'Unexpected error. Please try again later.' });
            }
        } catch (error) {
            console.error(error);
            console.error("Error with API call to register user");
        }
    }

    const content = {
        header: {title: 'Sign in to Cocollabs', subtitle: 'Welcome back! Let’s build something amazing together.'},
        footer: {text: "Don't have an account?", link: 'Sign up', linkPath: '/signup'}
    }

    return (
        <AuthForm navigate={navigate} form={form} onSubmit={onSubmit} content={content} />
    );
};

export default Login;