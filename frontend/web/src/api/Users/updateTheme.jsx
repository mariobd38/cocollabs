const updateThemeInfo = async (theme) => {
    try {
        const response = await fetch("/api/user/updateTheme", {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(theme),
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

export {updateThemeInfo}