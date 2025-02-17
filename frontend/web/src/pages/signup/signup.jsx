import React from 'react';

// import { GOOGLE_AUTH_URL } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import AuthForm from '@/components/Auth/authForm';
// import SignupContentv2 from '@/components/Auth/SignUp/signupContentv2';

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

const SignUp = () => {
    const navigate = useNavigate();
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

    const content = {
        header: {title: 'Welcome to Cocollabs', subtitle: 'Sign up for free. No credit card required.'},
        footer: {text: 'Already have an account?', link: 'Log In', linkPath: '/login'}
    }

    return (
        <AuthForm navigate={navigate} form={form} onSubmit={onSubmit} content={content} />
    );
};

export default SignUp;