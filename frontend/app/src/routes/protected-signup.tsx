import { useUser, useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export function ProtectedSignup({ children }: { children: React.ReactNode }) {
    const { isSignedIn, isLoaded: authLoaded } = useAuth();
    const { user, isLoaded: userLoaded } = useUser();

    console.log(!authLoaded || (isSignedIn && !userLoaded))
    // Wait for both Clerk auth and user metadata to load
    if (!authLoaded || (isSignedIn && !userLoaded)) {
        return null; // or a loading spinner
    }

    // If user is signed in but not invited, redirect them elsewhere
    if (isSignedIn && user?.publicMetadata?.waitlistStatus !== "invited") {
        return <Navigate to="/not-invited" />; // customize this path
    }

    // If not signed in, allow login screen
    if (!isSignedIn) {
        return <>{children}</>;
    }

    // If signed in AND invited, redirect them to dashboard or similar
    return <Navigate to="/home" />;
}
