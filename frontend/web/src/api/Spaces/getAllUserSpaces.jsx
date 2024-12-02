async function getAllUserSpacesInfo() {
    try {
        const response = await fetch(`/api/spaces/getAll`, {
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

export { getAllUserSpacesInfo };