"use client"
import { useEffect, useRef} from "react";
import styles from "./Dial.module.scss";

export default function Dial({ id, deg, setDeg, activeDial, variant = "color1"}) {

    const dial = useRef(null)
    const oldY = useRef(null)
    const dragging = useRef(false)

    const handleMouseDown = (e) => {
        e.preventDefault()
        dragging.current = true
        // console.log("dragging starts")
        oldY.current = e.clientY
        //otherwise mouseUp is only triggered when cursor within element
        window.addEventListener("mouseup", handleMouseUp)
        window.addEventListener("mousemove", handleMouseMove)
    }

    const handleMouseUp = (e) => {
        // console.log("dragging ends")
       dragging.current = false

        window.removeEventListener("mouseup", handleMouseUp)
        window.removeEventListener("mousemove", handleMouseMove)
    }

    const handleMouseMove = (e) => {

        if (!dragging.current) return 
        const offset = e.clientY - oldY.current

        //Get current degree
        const degStr = dial.current?.style.getPropertyValue("--deg") // "180deg"
        const currDeg = parseInt(degStr.split("deg")[0])

        //Unexpected behaviour when using deg
        const newDeg = currDeg + 2 * -offset 
        const newDegNorm = Math.max(0, Math.min(360, newDeg)) //Cap newDeg between [0,360]

        setDeg(id, newDegNorm)
        oldY.current = e.clientY //Position to last move
    }


    const getTouchAngle = (touch) => {
        const rect = dial.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = touch.clientX - centerX;
        const dy = touch.clientY - centerY;

        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const normalisedAngle = ((angle + 360 + 90) % 360) /* Adjust to our axis */
        return normalisedAngle;
    };

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        const angle = getTouchAngle(touch);
        setDeg(id, angle);
    };
    
    const handleTouchMove = (e) => {
        if (deg === null) return;
        const touch = e.touches[0];
        const currentAngle = getTouchAngle(touch);
        const delta = currentAngle - deg;

        const degStr = dial.current?.style.getPropertyValue("--deg") // "180deg"
        const currDeg = parseInt(degStr.split("deg")[0])
        if (Math.abs(delta) > 100) { /* Prevent moving into dead zone (360 -> 0 and 360 <- 0) */
            return
        }
  
        setDeg(id, Math.min(360, currDeg + delta));
    };

    useEffect(() => {
        if (dial.current) {
            // Need setting otherwise cant get
            dial.current.style.setProperty("--deg", `${deg}deg`)
        }
    },[deg])

    //Add additional class depending on whether dial is active
    const activeStyle = id === activeDial ? styles.handleOn : styles.handleOff

    return (
        <div ref={dial}
            className={styles.dial} 
            onMouseDown={handleMouseDown} 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            >
            <div className={styles.dialOuter}/>
            <div className={styles.dialOuterActive}/>
            <div className={styles.dialInner}/>
            <div className={`${styles.handle} ${styles[variant]} ${activeStyle}`}/>
        </div>
    )
}