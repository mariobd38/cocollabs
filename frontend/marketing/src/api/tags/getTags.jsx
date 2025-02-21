async function getTagInfo(currTaskId) {
    try {
        const response = await fetch("/api/tags/get?taskId=" + currTaskId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching all tags info:', error);
        throw error;
    }
}

export {getTagInfo}