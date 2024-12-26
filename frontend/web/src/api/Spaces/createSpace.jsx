// function createSpaceInfo  (name, description, icon, visibility) {
//     const spaceInfo = {
//         name: name,
//         description: description,
//         icon: icon,
//         visibility: visibility.toUpperCase(),
//     };

//     fetch("/api/spaces/create", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(spaceInfo),
//     }).then((response) => {
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//         return response.json();
//     })
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {

//         console.error(error); 
//     });
// }

// export {createSpaceInfo}

function createSpaceInfo  (name, description, icon, visibility) {
    const spaceInfo = {
        name: name,
        description: description,
        icon: icon,
        visibility: visibility.toUpperCase(),
    };

    try {
        const response = fetch('/api/spaces/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(spaceInfo),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch user info:', error);
        return null;
    }
}

export { createSpaceInfo };