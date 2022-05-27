import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
    window.scrollTo(0, 0);
}, [pathname]);

return null;
} 



/* Skall denna ligga i någon annan mapp kanske då det är en vanlig funktion?  */