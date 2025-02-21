interface OrganizationResponse {
    name: string;
    [key: string]: any;
}

async function getLastActiveOrganizationInfo(): Promise<OrganizationResponse> {
    const response = await fetch(`/api/organizations/getLastActive`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const data: OrganizationResponse = await response.json();
    return data;
}

export { getLastActiveOrganizationInfo };