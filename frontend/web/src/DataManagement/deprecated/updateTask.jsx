const STATUSES = ['To Do', 'In Progress', 'Completed'];

function handleSpecialCaseUpdates(event, task, selectedDate, dayjs, setCurrentTaskDueDate, setCurrentTaskDueDateTime, taskDescription) {
  switch (event) {
        case "clear date time":
            task.dueDateTime = null;
            setCurrentTaskDueDateTime(null);
            break;
        case "clear date":
            task.dueDate = null;
            task.dueDateTime = null;
            setCurrentTaskDueDate(null);
            setCurrentTaskDueDateTime(null);
            break;
        case "due date":
            task.dueDate = (task.dueDateTime) ? dayjs(selectedDate) : dayjs(selectedDate).endOf('day');
            setCurrentTaskDueDate(dayjs(task.dueDate));
            break;
        case "due time":
            task.dueDate = dayjs(selectedDate);
            task.dueDateTime = dayjs(selectedDate);
            setCurrentTaskDueDate(dayjs(task.dueDate));
            setCurrentTaskDueDateTime(dayjs(task.dueDateTime));
            break;
        case "description":
            task.descriptionHtml = taskDescription;
            break;
        default:
            return false;
    }
    return true;
}


function handleClassListUpdates(targetClassList, task, event, setCurrentTaskDueDate, setCurrentTaskDueDateTime, setTaskType, completedTasks) {
    if (targetClassList.includes('user-home-task-details-modal-name')) {
      task.name = event.currentTarget.textContent;
    }
    else if (targetClassList.includes('user-home-task-details-modal-due-date-remove')) {
      task.dueDate = null;
      task.dueDateTime = null;
      setCurrentTaskDueDate(null);
      setCurrentTaskDueDateTime(null);
    }
    else if (targetClassList.includes('user-home-task-details-modal-description-textarea')) {
      task.description = event.target.value;
    }
    else if (targetClassList.includes('model-dropdown-item-status-menu-button')) {
      task.status = event.currentTarget.textContent;
      if (task.status === 'Completed') {
        setTaskType([...completedTasks]);
      }
    }
    else if (targetClassList.includes('user-home-task-details-modal-next-status-btn')) {
      let currentIndex = STATUSES.indexOf(task.status);
      task.status = STATUSES[(currentIndex + 1) % STATUSES.length];
    }
    else if (targetClassList.includes('model-dropdown-item-menu-button-clear')) {
      task.priority = null;
    }
    else if (targetClassList.includes('model-dropdown-item-priority-menu-button')) {
      task.priority = event.currentTarget.textContent;
    }
    else if (targetClassList.includes('user-home-task-set-complete')) {
      task.status = 'Completed';
    }
  }
  
  async function saveTaskInfo(taskInfo, taskType, currentRowIndex, setTaskType) {
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
        let updatedTaskType = [...taskType];
        updatedTaskType[currentRowIndex] = newData;
        setTaskType(updatedTaskType);
        } catch (error) {
            console.error(error);
            throw error;
        }
  }
  

function UpdateTaskInfo(
    currentRowIndex,
    event,
    taskType,
    setTaskType,
    selectedDate,
    dayjs,
    setCurrentTaskDueDate,
    setCurrentTaskDueDateTime,
    completedTasks,
    taskDescription
  ) {
    let task = { ...taskType[currentRowIndex] };
    let targetClassList = null;
  
    targetClassList = (event.currentTarget === undefined) ? undefined : (event.currentTarget?.classList.length > 1) 
                        ? event.currentTarget.getAttribute("class").split(' ') 
                        : event.currentTarget.getAttribute("class");
  
    let specialCaseUpdate = handleSpecialCaseUpdates(event, task, selectedDate, dayjs, setCurrentTaskDueDate, setCurrentTaskDueDateTime, taskDescription);
    if (!specialCaseUpdate && targetClassList) {
        handleClassListUpdates(targetClassList, task, event, setCurrentTaskDueDate, setCurrentTaskDueDateTime, setTaskType, completedTasks);
    }
  
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
  
    return saveTaskInfo(taskInfo, taskType, currentRowIndex, setTaskType);
}
  
export { UpdateTaskInfo };