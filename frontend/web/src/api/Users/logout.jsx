
function userLogout() {

    fetch("/api/user/logout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        if (response.status === 204) {
            window.location.href = '/';
        }
    })
      .catch((error) => {
        console.error(error); 
      }); 
}
export {userLogout}