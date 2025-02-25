import React from 'react';

// import { GOOGLE_AUTH_URL } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod"

import AuthForm from '@/components/Auth/authForm';
import { signupSchema } from '@/utils/schemas/signupSchema';


const SignUp = () => {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(signupSchema),
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

            if (!response.ok) {
                if (response.status === 409) {
                    const error = await response.json();
                    form.setError(error.field, { message: error.message });
                    throw new Error(error.message);
                } else {
                    console.error("Unexpected error with user registration");
                }
            }

            navigate('/onboarding');
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