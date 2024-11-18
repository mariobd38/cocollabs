async function getPersonalSpaceInfo() {
    try {
        const response = await fetch(`/api/spaces/getPersonal`, {
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
        console.error("Error fetching personal space info:", error);
        throw error;
    }
}

export { getPersonalSpaceInfo };