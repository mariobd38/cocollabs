// function updateTagInfo  (event, allTagData,currentTaskTags,idx,
//     oldTagName,newTagName,newTagColor,actualTag) {
    
//     if(newTagColor === null) {

//         const existingTag = allTagData.find(tag => tag.name === newTagName.trim());
//         if ((newTagName.trim() === '') || (actualTag !== existingTag && existingTag !== undefined)) { //todo: if tag already exists, add an error snackbar
//             event.preventDefault();
//             return;
//         }

//         if (oldTagName !== newTagName.trim()) {
//             actualTag.name = newTagName;
//         }
//     } else {
//         actualTag.color = newTagColor;
//     }
   
//     const tagInfo = {
//         id: actualTag.id,
//         name: actualTag.name,
//         color: actualTag.color
//     }

//     fetch("/api/tags/update", {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(tagInfo),
//     }).then((response) => {
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//         return response.json();
//     })
//     .then((newData) => {
//         console.log(idx);
//         currentTaskTags[idx] = newData;
//     })
//     .catch((error) => {
//         console.error(error); 
//     });
// }


function updateTagInfo  (event, allTagData,oldTagName,newTagName,newTagColor,actualTag) {
    
    if(newTagColor === null) {

        const existingTag = allTagData.find(tag => tag.name === newTagName.trim());
        if ((newTagName.trim() === '') || (actualTag !== existingTag && existingTag !== undefined)) { //todo: if tag already exists, add an error snackbar
            event.preventDefault();
            return;
        }

        if (oldTagName !== newTagName.trim()) {
            actualTag.name = newTagName;
        }
    } else {
        actualTag.color = newTagColor;
    }
   
    const tagInfo = {
        id: actualTag.id,
        name: actualTag.name,
        color: actualTag.color
    }

    fetch("/api/tags/update", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tagInfo),
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    // .then((newData) => {
    //     console.log(idx);
    //     currentTaskTags[idx] = newData;
    // })
    .catch((error) => {
        console.error(error); 
    });
}

export {updateTagInfo}