function userLogout(navigate) {

    fetch("/api/auth/logout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        if (response.status === 204) {
            navigate('/', { replace: true });
        }
    })
      .catch((error) => {
        console.error(error); 
      }); 
}
export {userLogout}