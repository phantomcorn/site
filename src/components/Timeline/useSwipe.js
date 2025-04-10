import { useRef } from "react";
export default function useSwipe({setScrollPos}) {

    const touchStart = useRef({y: null})
    const maxWidth = useRef(null)
    const markerPos = useRef(null)
    const currIndex = useRef(-1)

    const setMaxWidth = (value) => {
        maxWidth.current = value
    }

    const setMarkerPos = (value) => {
        markerPos.current = value
    }   

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        touchStart.current.y = touch.clientY;
    };
    
    const handleTouchEnd = (e) => {
        if (!touchStart.current) return
        const touch = e.changedTouches[0];
        const dir = touch.clientY - touchStart.current.y

        if (!maxWidth.current && !markerPos.current) return
        if (dir < 0) {
            /* Swipe up (Forward) */
            if (currIndex.current === -1) currIndex.current = 0 /* Swipe start */
            else currIndex.current = Math.min(markerPos.current.length - 1, currIndex.current + 1)
        } else {
            /* Swipe down (Backward) */
            if (currIndex.current === -1) return /* Swipe start (do nothing) */
            currIndex.current = Math.max(0, currIndex.current - 1)
        }
    
        setScrollPos(markerPos.current[currIndex.current].left * maxWidth.current)
    };

    return {handleTouchStart, handleTouchEnd, setMaxWidth, setMarkerPos}
}