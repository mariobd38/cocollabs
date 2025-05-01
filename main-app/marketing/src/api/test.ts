export async function testBackend() {
    try {
        const response = await fetch(`/api/test/hello`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "get",
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}