"use client"
import styles from "./Timeline.module.scss"
import { useEffect, useRef, useState } from "react"
export default function Timeline({
    children, 
    setActiveView, 
    scrollPos, 
    setScrollPos, 
    markerContainerRef, 
    setMarkerPos}) {

    const [markerIdx, setMarkerIdx] = useState({curr: -1, next: 0}) 
    const [markerPositions, setMarkerPositions] = useState([]) //Compute and store marker position based on markerRefs
    const [markerParentWidth, setMarkerParentWidth] = useState() //Compute parent width 

    const timelineProgressRef = useRef() 
    const markerRefs = useRef([])
    
    const onClick = (e, curr) => {
        e.preventDefault()
        if (markerIdx.curr !== curr){
            setScrollPos(markerPositions[curr].left * markerParentWidth)
        }
    }
    
    useEffect(() => { /* Compute any value required for timeline interaction */
        const maxWidth = markerContainerRef.current?.getBoundingClientRect().width //Width of `timeline-items` (in px)
        setMarkerParentWidth(maxWidth) //cannot use (below) markerParentWidth yet

        const markerPositions = markerRefs.current.map((ref) => {
            if (ref) {
                const parentWidth = maxWidth 
                const childWidth = ref.getBoundingClientRect().width
                const childOffsetLeft = ref.offsetLeft //How far left is the child relative to the parent (in px)
                const offsetLeftFraction = Math.min(1,((childOffsetLeft + childWidth) / parentWidth))
                return {left: offsetLeftFraction};
            }
            return null;
        }).filter(Boolean);
        setMarkerPositions(markerPositions)
        setMarkerPos(markerPositions) /* Required for mobile swipe */

    }, [])

    useEffect(() => {        
        if (!markerParentWidth) return
        const scrollFraction = (scrollPos / markerParentWidth) //[0,1]

        if (markerPositions.length === 0) return /* DOM element not rendering */

        
        /* Adjust current marker position based on scrollFraction */
        let newCurr = -1;
        for (let i = 0; i < markerPositions.length; i++) {
            if (scrollFraction >= markerPositions[i].left) {
                newCurr = i;
            } else {
                break;
            }
        }
        
        if (newCurr !== markerIdx.curr) {
            setMarkerIdx({ curr: newCurr, next: newCurr + 1 });
        }

        timelineProgressRef.current.style.setProperty("--timeline-progress", `${scrollFraction * 100}%`)  
        
    }, [scrollPos])

    useEffect(() => {
        if (markerIdx.curr !== -1) {
            setActiveView(children[markerIdx.curr])
        } else {
            setActiveView(null)
        }
    }, [markerIdx])

    const markerPathOn = "M 0 0 C -2 0 -2 7 -6 9 H 6 C 2 7 2 0 0 0 Z"
    const markerPathOff = "M 0 9 C 0 9 -6 9 -6 9 H 6 C 6 9 0 9 0 9 Z";

    return (
        <div className={styles.timeline}>
            <div ref={markerContainerRef} className={styles.timelineMarkers}>
                {children && children.map((_,i) => 
                    <div key={`timeline-marker${i + 1}`} 
                         ref={(el) => markerRefs.current[i] = el} // Assign ref dynamically
                         className={`${styles.timelineMarker} ${markerIdx.curr === i ? styles.timelineMarkerOn : styles.timelineMarkerOff}`}
                    >   
                        <div 
                            className={styles.timelineMarkerPoint} 
                            onClick={(e) => onClick(e, i)}
                        />
                        <svg width="16" height="12" viewBox="-6 0 12 9">
                            <path
                                d={markerIdx.curr === i ? markerPathOn : markerPathOff}
                                stroke="transparent"
                                strokeWidth="0"
                            />
                        </svg>
                    </div>
                )}
            </div>
            <div className={styles.timelineBar}>
                <div ref={timelineProgressRef} className={styles.timelineBarProgress}></div>
            </div>
            
        </div>
    )
}