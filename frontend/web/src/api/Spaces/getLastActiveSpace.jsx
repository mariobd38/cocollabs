async function getLastActiveSpaceInfo() {
    try {
        const response = await fetch(`/api/userSpacesActivity/getLastActive`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching space info:", error);
        throw error;
    }
}

export { getLastActiveSpaceInfo };