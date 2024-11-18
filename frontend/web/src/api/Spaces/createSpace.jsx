
function createSpaceInfo(name, description, icon, visibility) {
    const spaceInfo = {
        name: name,
        description: description,
        icon: icon,
        visibility: visibility.toUpperCase(),
    };


    return fetch("/api/spaces/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(spaceInfo),
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        // const createdTask = {
        //     id: data.id, 
        //     name: data.name,
        //     description: data.description,
        //     status: data.status,
        //     priority: data.priority,
        //     dueDate: data.dueDate,
        //     dateCreated: data.createdOn,
        //     dateUpdated: data.lastUpdatedOn,
        //     taskIdNumber: data.taskIdNumber,
        // };
        // return createdTask;
    })
    .catch((error) => {
        console.error(error); 
    }); 
}
export {createSpaceInfo}