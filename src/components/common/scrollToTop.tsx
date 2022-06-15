import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// When called it scrolls to top at current page
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
    window.scrollTo(0, 0);
}, [pathname]);

return null;
} 
