async function activateOrganizationInfo(name:string) {
    try {
        const response = await fetch(`/api/organizations/activate?organizationName=${name}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response;
    } catch (error) {
        console.error('Failed to fetch user info:', error);
        return null;
    }
}

export default activateOrganizationInfo;