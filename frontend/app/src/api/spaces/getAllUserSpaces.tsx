interface Space {
    name: string;
    slug: string;
    description: string;
    visibility: string;
    icon: any;
}

interface UserSpacesResponse {
    name: string;
    spaces: Space[];
}

async function getAllUserSpacesInfo() {
    const response = await fetch(`/api/spaces/getAll`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const data: UserSpacesResponse = await response.json();
    return data;
}

export { getAllUserSpacesInfo };