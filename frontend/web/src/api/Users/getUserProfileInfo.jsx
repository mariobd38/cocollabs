async function getUserProfileInfo() {
    try {
        const response = await fetch('/api/user/getInfo', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch user info:', error);
        return '';
    }
}

export { getUserProfileInfo };