async function handleProfileCreation(profileData,form) {
    try {
        const response = await fetch(`/api/user/createProfile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profileData),
        });

        if (!response.ok) {
            const error = await response.json();
            form.setError(error.field, { message: error.message });
            throw new Error(error.message);
        }
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

export {handleProfileCreation}