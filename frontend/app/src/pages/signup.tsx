import { AuthForm } from "@/components/auth-form";
import { authText } from "@/utils/auth-text";

import React from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useSearchParams, Navigate } from "react-router-dom";
import { Loader } from "@/components/ui/loader";

export default function Signup() {
    const { signUp, setActive, isLoaded } = useSignUp();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = React.useState<"loading" | "valid" | "invalid">("loading");

    React.useEffect(() => {
        const ticket = searchParams.get("__clerk_ticket");

        const timeoutId = setTimeout(() => {
            if (status === "loading") {
                setStatus("invalid");
            }
        }, 8000); // 8 second timeout

        const verifyTicket = async () => {
            if (!isLoaded || !ticket || !signUp) {
                return; // Wait for Clerk to load
            }

            try {
                await signUp.create({ strategy: "ticket", ticket });
                await setActive({ session: signUp.createdSessionId });
                clearTimeout(timeoutId); // Clear timeout if successful
                setStatus("valid");
            } catch (err) {
                console.error("Invalid or expired Clerk ticket", err);
                clearTimeout(timeoutId);
                setStatus("invalid");
            }
        };

        verifyTicket();

        return () => clearTimeout(timeoutId); // Cleanup on unmount
    }, [signUp, setActive, searchParams, isLoaded, status]);

    if (status === "loading") return <Loader />;
    if (status === "invalid") return <Navigate to="/notFound" />;


    return (
        <div className="w-[90%] max-w-[460px] m-auto py-40">
            <AuthForm header={'Get Started with Cocollabs'} alt={authText.signup} />

             {/* CAPTCHA Widget */}
        <div id="clerk-captcha"></div>
        </div>
    );
}