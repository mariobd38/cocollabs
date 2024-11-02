function createTaskInfo(
    taskName, 
    taskDescription,
    taskStatus,
    taskPriority,
    taskDueDate,
    taskDueDateTime,
    spaceId
    ) {
    const taskInfo = {
        name: taskName,
        descriptionHtml: taskDescription,
        status: taskStatus || "To Do",
        priority: taskPriority,
        dueDate: taskDueDate,
        dueDateTime: taskDueDateTime
    };

    return fetch(`/api/tasks/create?spaceId=` + spaceId, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskInfo),
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        const createdTask = {
            id: data.id, 
            name: data.name,
            description: data.description,
            status: data.status,
            priority: data.priority,
            dueDate: data.dueDate,
            dateCreated: data.createdOn,
            dateUpdated: data.lastUpdatedOn,
            taskIdNumber: data.taskIdNumber,
        };
        return createdTask;
    })
    .catch((error) => {
        console.error(error); 
    }); 
}

export { createTaskInfo };