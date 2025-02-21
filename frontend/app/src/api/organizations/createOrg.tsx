interface Organization {
    name: string;
    description: string;
    slug: string;
    type: string;
}

// interface UserSpacesResponse {
//     name: string;
//     spaces: Space[];
// }

async function handleOrgCreation(data:Organization) {
    const response = await fetch(`/api/organizations/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    // const data: UserSpacesResponse = await response.json();
    return response;
}

export { handleOrgCreation };