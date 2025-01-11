interface SpaceResponse {
    name: string;
    [key: string]: any;
}

async function getLastActiveSpaceInfo(): Promise<SpaceResponse> {
    try {
        const response = await fetch(`/api/spaces/getLastActive`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data: SpaceResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching space info:", error);
        throw error;
    }
}

export { getLastActiveSpaceInfo };