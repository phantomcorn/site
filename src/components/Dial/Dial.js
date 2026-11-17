"use client"
import { useEffect, useRef} from "react";
import styles from "./Dial.module.scss";

/*
    A knob you turn: grab it anywhere and drag around its centre, clockwise to increase.
    The same gesture works with a mouse and with a finger.

    deg: current angle [0, 360]
    setDeg(id, deg): called while the dial is being turned
    onRelease (optional): called when the user lets go of the dial
    className (optional): extra class for the dial, to size/position it
*/
export default function Dial({ id, deg, setDeg, activeDial, variant = "color1", onRelease, className = ""}) {

    /* Window listeners are attached when a turn starts, so read the latest props through refs */
    const onReleaseRef = useRef(onRelease)
    onReleaseRef.current = onRelease
    const setDegRef = useRef(setDeg)
    setDegRef.current = setDeg
    const degRef = useRef(deg)
    degRef.current = deg

    const dial = useRef(null)
    const lastAngle = useRef(null) // where the pointer was around the dial at the last move
    const turned = useRef(0)       // the dial's angle during the current turn

    /* Angle of a point around the dial's centre: 0 at the top, growing clockwise */
    const angleAt = (clientX, clientY) => {
        const rect = dial.current.getBoundingClientRect();
        const dx = clientX - (rect.left + rect.width / 2);
        const dy = clientY - (rect.top + rect.height / 2);
        return (Math.atan2(dy, dx) * (180 / Math.PI) + 90 + 360) % 360
    }

    const startTurn = (clientX, clientY) => {
        lastAngle.current = angleAt(clientX, clientY)
        turned.current = degRef.current
    }

    const turnTo = (clientX, clientY) => {
        if (lastAngle.current === null) return

        const angle = angleAt(clientX, clientY)
        let delta = angle - lastAngle.current
        /* Crossing the top (359 -> 0) is a small step, not a full turn backwards */
        if (delta > 180) delta -= 360
        if (delta < -180) delta += 360
        lastAngle.current = angle

        turned.current = Math.max(0, Math.min(360, turned.current + delta)) // the dial stops at both ends
        setDegRef.current(id, turned.current)
    }

    const endTurn = () => {
        if (lastAngle.current === null) return
        lastAngle.current = null
        onReleaseRef.current?.()
    }

    /* -------------------------------------- Mouse ------------------------------------------------- */

    const handleMouseDown = (e) => {
        e.preventDefault()
        startTurn(e.clientX, e.clientY)
        //otherwise mouseUp is only triggered when cursor within element
        window.addEventListener("mouseup", handleMouseUp)
        window.addEventListener("mousemove", handleMouseMove)
    }

    const handleMouseMove = (e) => {
        turnTo(e.clientX, e.clientY)
    }

    const handleMouseUp = () => {
        window.removeEventListener("mouseup", handleMouseUp)
        window.removeEventListener("mousemove", handleMouseMove)
        endTurn()
    }

    /* -------------------------------------- Touch ------------------------------------------------- */

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        startTurn(touch.clientX, touch.clientY)
    };

    const handleTouchMove = (e) => {
        const touch = e.touches[0];
        turnTo(touch.clientX, touch.clientY)
    };

    /* --------------------------------------------------------------------------------------------- */

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
            className={`${styles.dial} ${className}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={endTurn}
            onTouchCancel={endTurn}
            >
            <div className={styles.dialOuter}/>
            <div className={styles.dialOuterActive}/>
            <div className={styles.dialInner}/>
            <div className={`${styles.handle} ${styles[variant]} ${activeStyle}`}/>
        </div>
    )
}
