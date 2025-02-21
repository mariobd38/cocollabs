
function deleteTagInfo(tagToDelete) {
    const tagId = tagToDelete.id;
    fetch(`/api/tags/delete?tagId=${tagId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        if (response.status === 204) {
            // No content in response (successful deletion)
            // const updatedTaskTagsData = currentTaskTags.filter((_, index) => index !== tagDeleteButtonClickedIndex);
            // setCurrentTaskTags(updatedTaskTagsData);    
        }
    })
    .catch((error) => {
        console.error(error); 
    });
}
export {deleteTagInfo}