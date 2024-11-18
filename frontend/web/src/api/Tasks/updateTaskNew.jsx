function updateTaskAttribute(task,value, attribute) {
    switch (attribute) {
        case "name":
            task.name = value;
            break;
        case "description":
            task.descriptionHtml = value;
            break;
        case "priority":
            if (value === 'None')
                task.priority = null;
            else
                task.priority = value;
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
            console.log(task.dueDateTime);
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
    const taskInfo = {
        id: task.id,
        name: task.name,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        dueDateTime: task.dueDateTime,
        descriptionHtml: task.descriptionHtml
    };
    
    const updatedTask = await saveTaskInfo(taskInfo);
    if (updatedTask) {
        let updatedTaskType = [...taskType];
        updatedTaskType[index] = updatedTask;
        setTaskType(updatedTaskType);
    }
}
  
export { UpdateTaskInfoNew };