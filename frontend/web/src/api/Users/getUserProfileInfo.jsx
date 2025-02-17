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
        console.log('PRINTING PROFILE DATA');
        console.log("user profile data",data);
        return data;
    } catch (error) {
        return '';
    }
}

export { getUserProfileInfo };