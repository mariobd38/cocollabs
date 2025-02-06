function createSpaceInfo  (space) {
    try {
        const response = fetch('/api/spaces/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(space),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = response.json();
        return data;
    } catch (error) {
        console.error('Failed to create space:', error);
        return null;
    }
}

export { createSpaceInfo };
