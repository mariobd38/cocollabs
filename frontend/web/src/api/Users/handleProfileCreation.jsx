async function handleProfileCreation(profileData,form,croppedFile) {
    console.log(croppedFile);
    const formData = new FormData();
    formData.append('file', croppedFile);

    const jsonBlob = new Blob([JSON.stringify(profileData)], { type: 'application/json' });
    formData.append('onboardingProfileDto', jsonBlob);
    
    try {
        const response = await fetch(`/api/user/createProfile`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
            },
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            form.setError(error.field, { message: error.message });
            throw new Error(error.message);
        }
        return response;
    } catch (error) {
        console.log(error);
    }
}

export {handleProfileCreation}