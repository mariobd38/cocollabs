async function userExists(email) {
    const response = await fetch(`/api/user/exists?email=${email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
}

export {userExists}