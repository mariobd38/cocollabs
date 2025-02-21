async function authStatusInfo() {
    try {
        const response = await fetch("/api/auth/status", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "get",
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // console.error(error);
        // console.error("Error with API call to register user");
        return { isAuthenticated: false, isOnboarded: false };
    }
}

export { authStatusInfo };