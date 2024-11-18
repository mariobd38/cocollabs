function getTaskInfoBySpace (setTaskData, spaceName) {
    fetch(`/api/tasks/getBySpace?spaceName=${spaceName}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        const dataStack = [];
        for (let i = data.length-1; i >= 0; i--) {
            dataStack.push(data[i]);
        }
        setTaskData(dataStack);
    })
    .catch((error) => {

        console.error(error); 
    });
}

export {getTaskInfoBySpace}