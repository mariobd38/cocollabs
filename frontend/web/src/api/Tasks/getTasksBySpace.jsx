async function getTaskInfoBySpace (spaceName) {
    try {
        const response = await fetch(`/api/tasks/getBySpace?spaceName=${spaceName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return [...data].reverse();
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
}

export { getTaskInfoBySpace };