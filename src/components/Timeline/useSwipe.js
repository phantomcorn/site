import { useRef } from "react";
export default function useSwipe({setScrollPos}) {

    const touchStart = useRef({y: null})
    const maxWidth = useRef(null)

    const setThreshold = (value) => {
        maxWidth.current = value
    }

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        touchStart.current.y = touch.clientY;
    };
    
    const handleTouchEnd = (e) => {
        if (!touchStart.current) return
        const touch = e.changedTouches[0];
        const dir = touch.clientY - touchStart.current.y
        if (!maxWidth.current) return

        setScrollPos((prev) => {
            const newScrollPos = prev - (dir * 0.4)
            return (Math.max(0,Math.min(maxWidth.current, newScrollPos))) 
        })
    };

    return {handleTouchStart, handleTouchEnd, setThreshold}
}