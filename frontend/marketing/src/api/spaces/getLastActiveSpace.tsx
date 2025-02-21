interface SpaceResponse {
    name: string;
    [key: string]: any;
}

async function getLastActiveSpaceInfo(): Promise<SpaceResponse> {
    const response = await fetch(`/api/spaces/getLastActive`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const data: SpaceResponse = await response.json();
    return data;
}

export { getLastActiveSpaceInfo };