async function getTaskInfoById(taskId) {
    try {
        const response = await fetch(`/api/tasks/getById?taskId=${taskId}`, {
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
        console.error("Error fetching tasks:", error);
        throw error;
    }
}

export { getTaskInfoById };