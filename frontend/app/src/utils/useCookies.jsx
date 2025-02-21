import { useEffect, useState } from "react"
import Cookies from 'js-cookie';

function useCookies (defaultValue, key) {
    const[value, setValue] = useState(() => {
        const cookieValue = Cookies.get(key);
        return cookieValue !== undefined ? JSON.parse(cookieValue) : defaultValue;
    });
    useEffect(() => {
        Cookies.set(key, JSON.stringify(value), { expires: 365 });
    }, [key, value]);

    return [value, setValue];
}

export {useCookies}