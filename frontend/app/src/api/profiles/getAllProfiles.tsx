import apiClient from "@/utils/apiClient";

interface Profile {
    firstName: string;
    lastName: string;
    fullName: string;
    type: string;
    svg: string;
    preSignedUrl: string;
}

async function getAllProfilesInfo() {
    // const response = await fetch(`/api/profiles/getAll`, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // });
    const response = await apiClient.get('/api/profiles/getAll');

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const data: Profile[] = await response.json();
    return data;
}

export { getAllProfilesInfo };