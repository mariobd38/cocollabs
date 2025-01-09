// function createSpaceInfo  (name, description, icon, visibility) {
//     const spaceInfo = {
//         name: name,
//         description: description,
//         icon: icon,
//         visibility: visibility.toUpperCase(),
//     };

//     fetch("/api/spaces/create", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(spaceInfo),
//     }).then((response) => {
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//         return response.json();
//     })
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {

//         console.error(error); 
//     });
// }

// export {createSpaceInfo}

function createSpaceInfo  (space) {
    console.log(space);
    console.log(JSON.stringify(space));
    

    try {
        const response = fetch('/api/spaces/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(space),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = response.json();
        return data;
    } catch (error) {
        console.error('Failed to create space:', error);
        return null;
    }
}

export { createSpaceInfo };

// {"background":"#848484","color":null,"radius":"calc(0.25rem * 1)","children":{"type":"svg","props":{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"#fafafa","className":"icon icon-tabler icons-tabler-filled icon-tabler-triangle","children":[" ",{"type":"path","key":null,"props":{"stroke":"none","d":"M0 0h24v24H0z","fill":"none"},"_owner":null,"_store":{}}," ",{"type":"path","key":null,"props":{"d":"M12 1.67a2.914 2.914 0 0 0 -2.492 1.403l-8.11 13.537a2.914 2.914 0 0 0 2.484 4.385h16.225a2.914 2.914 0 0 0 2.503 -4.371l-8.116 -13.546a2.917 2.917 0 0 0 -2.494 -1.408z"},"_owner":null,"_store":{}}," "],"key":null}}}// {"background":"#848484","color":null,"radius":"calc(0.25rem * 1)","children":{"type":"svg","props":{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"#fafafa","className":"icon icon-tabler icons-tabler-filled icon-tabler-user","children":[" ",{"type":"path","key":null,"props":{"stroke":"none","d":"M0 0h24v24H0z","fill":"none"},"_owner":null,"_store":{}}," ",{"type":"path","key":null,"props":{"d":"M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z"},"_owner":null,"_store":{}}," ",{"type":"path","key":null,"props":{"d":"M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z"},"_owner":null,"_store":{}}," "],"key":null}}}
// {"background":"#848484","color":null,"radius":"calc(0.25rem * 1)","children":{"type":"svg","props":{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"#fafafa","className":"icon icon-tabler icons-tabler-filled icon-tabler-user","color":"#fafafa"}}}

// {"background":"#848484","color":null,"radius":"calc(0.25rem * 1)","children":{"type":"svg","props":{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"#fafafa","className":"icon icon-tabler icons-tabler-filled icon-tabler-user","paths":[{"stroke":"none","d":"M0 0h24v24H0z","fill":"none"},{"d":"M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z"},{"d":"M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z"}]}}}