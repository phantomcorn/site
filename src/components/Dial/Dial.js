"use client"
import { useEffect, useRef} from "react";
import styles from "./Dial.module.css";

export default function Dial({ id, deg, setDeg, activeDial, variant = "color1"}) {

    const dial = useRef(null)
    const oldY = useRef(null)
    const dragging = useRef(false)

    const onMouseDown = (e) => {
        e.preventDefault()
        dragging.current = true
        // console.log("dragging starts")
        oldY.current = e.clientY
        //otherwise mouseUp is only triggered when cursor within element
        window.addEventListener("mouseup", onMouseUp)
        window.addEventListener("mousemove", onMouseMove)
    }

    const onMouseUp = (e) => {
        // console.log("dragging ends")
       dragging.current = false

        window.removeEventListener("mouseup", onMouseUp)
        window.removeEventListener("mousemove", onMouseMove)
    }

    const onMouseMove = (e) => {

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

    useEffect(() => {
        if (dial.current) {
            // Need setting otherwise cant get
            dial.current.style.setProperty("--deg", `${deg}deg`)
        }
    },[deg])

    //Add additional class depending on whether dial is active
    const activeStyle = id === activeDial ? styles["handle-on"] : styles["handle-off"]

    return (
        <div className={styles.dial} onMouseDown={onMouseDown} ref={dial}>
            <div className={styles["dial-outer"]}/>
            <div className={styles["dial-outer-active"]}/>
            <div className={styles["dial-inner"]}/>
            <div className={`${styles.handle} ${styles[variant]} ${activeStyle}`}/>
        </div>
    )
}