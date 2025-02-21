
export const dropdownProps = {
    enter: {
        y: 0,
        opacity: 1,
        duration: 0.1,
        transition: {
            opacity: {
            duration: 0.15,
            },
        },
    },
    exit: {
        y: "10%",
        opacity: 0,
        duration: 0,
        transition: {
            opacity: {
            duration: 0.1,
            },
        },
    },
};