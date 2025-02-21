async function handleSpaceCreation(data) {
    // const formData = new FormData();
    
    try {
        const response = await fetch(`/api/spaces/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            //form.setError(error.field, { message: error.message });
            throw new Error(error.message);
        }
        return response;
    } catch (error) {
        console.log(error);
    }
}

export {handleSpaceCreation}