async function signupInfo(reqBody) {
    // const { setIsAuthenticated, setIsOnboarded } = UseAuth();

    try {
        const response = await fetch("/api/auth/signup", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(reqBody),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
        

        // if (response.status === 200) {
        //     return 
        //     setIsAuthenticated(true);
        //     setIsOnboarded(false);
        //     navigate('/onboarding');
        // } else {
        //     console.error("Unexpected error with user registration");
        // }
    } catch (error) {
        console.error(error);
        console.error("Error with API call to register user");
    }
}

export { signupInfo };