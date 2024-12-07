function updateTaskAttribute(task,value, attribute) {
    switch (attribute) {
        case "name":
            task.name = value;
            break;
        case "description":
            task.descriptionHtml = value;
            break;
        case "priority":
            task.priority = (value === 'None') ? null : value;
            break;
        case "status":
            task.status = value;
            break;
        case "clear due date":
            task.dueDate = value;
            task.dueDateTime = value;
            break;
        case "due date":
            task.dueDate = value;
            break;
        case "due date time":
            task.dueDateTime = value;
            break;
        default:
            break;
    }
}

const saveTaskInfo = async (taskInfo) => {
    try {
        const response = await fetch("/api/tasks/put", {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(taskInfo),
        });
  
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
  
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function UpdateTaskInfoNew(
    task,
    value,
    attribute,
    taskType,
    setTaskType,
    index,
  ) {
    updateTaskAttribute(task,value,attribute);
    
    const updatedTask = await saveTaskInfo({
        id: task.id,
        name: task.name,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        dueDateTime: task.dueDateTime,
        descriptionHtml: task.descriptionHtml
    });
    
    if (updatedTask) {
        const updatedTaskType = [...taskType];
        updatedTaskType[index] = updatedTask;
        setTaskType(updatedTaskType);
    }
}
  
export { UpdateTaskInfoNew };