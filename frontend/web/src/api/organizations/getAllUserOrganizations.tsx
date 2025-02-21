interface Organization {
    name: string;
    description: string;
    slug: string;
    type: string;
}

interface UserOrganizationResponse {
    name: string;
    organizations: Organization[];
}

async function getAllUserOrganizationsInfo() {
    const response = await fetch(`/api/organizations/getAll`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const data: UserOrganizationResponse = await response.json();
    return data;
}

export { getAllUserOrganizationsInfo };