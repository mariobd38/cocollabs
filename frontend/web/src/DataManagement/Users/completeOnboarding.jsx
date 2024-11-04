async function completeOnboarding(profileData, spaceData, setUserInfo, setSpaceInfo) {
    const onboardingData = {
        profileData: profileData,
        spaceData: spaceData
    };

    try {
        const response = await fetch(`/api/onboarding/complete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(onboardingData),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        return await response.json();

    } catch (error) {
        console.error("Error during onboarding:", error);
    }
}

export { completeOnboarding };
