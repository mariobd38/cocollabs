async function isOAuthUser(email) {
    const response = await fetch(`/api/users/isOAuth?email=${email}`, {
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

export {isOAuthUser}