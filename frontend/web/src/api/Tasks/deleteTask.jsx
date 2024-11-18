function deleteTaskInfo (currentRowIndex, taskData,setTaskData ) {
    let task = taskData[currentRowIndex];
    const taskInfo = {
        id: task.id
    };
    
    fetch("/api/tasks/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskInfo),
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        if (response.status === 204) {
            // No content in response (successful deletion)
            const updatedTaskData = taskData.filter((_, index) => index !== currentRowIndex);
            setTaskData(updatedTaskData);
            console.log("Deleted item from task array!");
        }
    })
    .catch((error) => {
        console.error(error); 
    });
}

export {deleteTaskInfo}