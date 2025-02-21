async function activateSpaceInfo(name) {
    try {
        const response = await fetch(`/api/userSpacesActivity/activate?spaceName=${name}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response;
    } catch (error) {
        console.error('Failed to fetch user info:', error);
        return null;
    }
}

export default activateSpaceInfo;