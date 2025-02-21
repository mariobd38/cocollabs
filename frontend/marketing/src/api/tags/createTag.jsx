async function createTagInfo(taskId, tagName) {
    const tagInfo = {
        name: tagName,
        color: null
    };

    try {
        const response = await fetch(`/api/tags/create?taskId=${taskId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tagInfo),
        });

        if (!response.ok) {

            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const createdTag = {
            id: data.id,
            name: data.name,
            dateCreated: data.createdOn,
            color: data.color,
        };

        return createdTag;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export {createTagInfo}