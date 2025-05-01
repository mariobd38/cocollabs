export async function join(email:string) {
    try {
        const response = await fetch(`/api/waitlist/join?email=${email}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}