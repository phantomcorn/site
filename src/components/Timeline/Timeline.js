"use client"
import styles from "./Timeline.module.css"
import { useEffect, useRef, useState } from "react"
export default function Timeline({children, setActiveView}) {

    const [scrollPos , setScrollPos] = useState(0)
    const [markerIdx, setMarkerIdx] = useState({curr: -1, next: 0}) 
    const [markerPositions, setMarkerPositions] = useState([]) //Compute and store marker position based on markerRefs
    const [markerParentWidth, setMarkerParentWidth] = useState() //Compute parent width 

    const timelineProgressRef = useRef() 
    const markerRefs = useRef([])
    const markerParentRef = useRef() //markerRef's parent
    
    const onClick = (e, curr) => {
        e.preventDefault()
        setScrollPos(markerPositions[curr].left * markerParentWidth)
        setMarkerIdx((_) => ({curr: curr, next: curr + 1}))
    }
    
    useEffect(() => {
        const maxWidth = markerParentRef.current?.getBoundingClientRect().width //Width of `timeline-items` (in px)
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

        const handleWheel = (e) => {
            setScrollPos((prev) => {
                if (Math.abs(e.deltaY) > 0) {
                    const newScrollPos = prev + (e.deltaY * 0.6)
                    return (Math.max(0,Math.min(maxWidth, newScrollPos))) 
                } else {
                    return prev
                }
            })
        }

        window.addEventListener("wheel", handleWheel)
        return () => {
            window.removeEventListener("wheel", handleWheel)
        }
    }, [])

    useEffect(() => {        
        if (!markerParentWidth) return
        const scrollFraction = (scrollPos / markerParentWidth) //[0,1]
        // console.log(scrollFraction)
        // Update marker base on progress
        if (markerPositions.length > 0) {
            if (markerIdx.next !== markerPositions.length && scrollFraction >= markerPositions[markerIdx.next].left) {
                setMarkerIdx((prev) => {
                    const newMarkerIdx = Math.min(markerPositions.length, prev.curr + 1)
                    return {curr: newMarkerIdx, next: newMarkerIdx + 1}
                })
            } else if (markerIdx.curr !== -1 && scrollFraction < markerPositions[markerIdx.curr].left) {
                setMarkerIdx((prev) => {
                    const newMarkerIdx = prev.curr - 1
                    return {curr: newMarkerIdx, next: newMarkerIdx + 1}
                })
            } 
            timelineProgressRef.current.style.setProperty("--timeline-progress", `${scrollFraction * 100}%`)  
        }
    }, [scrollPos])

    useEffect(() => {
        if (markerIdx.curr !== -1) {
            setActiveView(children[markerIdx.curr])
        } else {
            setActiveView(null)
        }
    }, [markerIdx])

    return (
        <div className={styles.timeline}>
            <div ref={markerParentRef} className={styles["timeline-markers"]}>
                {children && children.map((_,i) => 
                    <div key={`timeline-marker${i + 1}`} 
                         ref={(el) => markerRefs.current[i] = el} // Assign ref dynamically
                         className={`${styles["timeline-marker"]} ${(markerIdx.curr !== -1 && markerIdx.curr === i) ? styles["timeline-marker-active"] : styles["timeline-marker-off"]}`}
                    >   
                        <div 
                            className={styles["timeline-marker-point"]} 
                            onClick={(e) => onClick(e, i)}
                        />
                        {/* <svg width="8" height="10" viewBox="-4 0 8 10">
                            <path
                                stroke="transparent"
                                strokeWidth="0"
                            />
                        </svg>           */}
                        <svg width="16" height="12" viewBox="-6 0 12 9">
                            <path
                                stroke="transparent"
                                strokeWidth="0"
                            />
                        </svg>
                    </div>
                )}
            </div>
            <div className={styles["timeline-bar"]}>
                <div ref={timelineProgressRef} className={styles["timeline-bar-progress"]}></div>
            </div>
            
        </div>
    )
}