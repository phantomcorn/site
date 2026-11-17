"use client"
import { useEffect, useRef} from "react";
import styles from "./Dial.module.scss";

const DEAD_ZONE = 0.3 /* Fraction of the dial's radius around its centre where movement is ignored */

/*
    A knob you turn: grab it and drag around its centre, clockwise to increase.
    One gesture for mouse, finger and pen (pointer events). Once grabbed, the pointer can
    leave the dial and keep turning it; a wider circle gives finer control.

    deg: current angle [0, 360]
    setDeg(id, deg): called while the dial is being turned (at most once per frame)
    onRelease (optional): called when the user lets go of the dial
    className (optional): extra class for the dial, to size/position it
*/
export default function Dial({ id, deg, setDeg, activeDial, variant = "color1", onRelease, className = ""}) {

    /* Read the latest props through refs: a turn outlives the render it started in */
    const onReleaseRef = useRef(onRelease)
    onReleaseRef.current = onRelease
    const setDegRef = useRef(setDeg)
    setDegRef.current = setDeg
    const degRef = useRef(deg)
    degRef.current = deg

    const dial = useRef(null)
    const pointer = useRef(null)   // id of the pointer turning the dial (a second finger is ignored)
    const lastAngle = useRef(null) // where the pointer was around the dial at the last move (null: not anchored yet)
    const turned = useRef(0)       // the dial's angle during the current turn
    const frame = useRef(null)     // pending animation frame that will report `turned`

    /* Angle of a point around the dial's centre (0 at the top, growing clockwise),
       or null when the point is too close to the centre for an angle to mean anything */
    const angleAt = (clientX, clientY) => {
        const rect = dial.current.getBoundingClientRect();
        const dx = clientX - (rect.left + rect.width / 2);
        const dy = clientY - (rect.top + rect.height / 2);
        if (Math.hypot(dx, dy) < (rect.width / 2) * DEAD_ZONE) return null
        return (Math.atan2(dy, dx) * (180 / Math.PI) + 90 + 360) % 360
    }

    /* Pointers can report many moves per frame: only the latest position per frame is worth rendering */
    const report = () => {
        frame.current = null
        setDegRef.current(id, turned.current)
    }

    const handlePointerDown = (e) => {
        if (pointer.current !== null) return
        if (e.pointerType === "mouse" && e.button !== 0) return

        e.preventDefault() // no text selection / image drag while turning
        pointer.current = e.pointerId
        lastAngle.current = angleAt(e.clientX, e.clientY)
        turned.current = degRef.current

        try {
            dial.current.setPointerCapture(e.pointerId) // keep receiving moves outside the dial
        } catch {
            /* Capture is a nicety: without it the turn still works while the pointer stays on the dial */
        }
    }

    const handlePointerMove = (e) => {
        if (e.pointerId !== pointer.current) return

        const angle = angleAt(e.clientX, e.clientY)
        if (angle === null) {
            /* Passing over the centre: the angle would swing wildly. Wait, then re-anchor without a jump. */
            lastAngle.current = null
            return
        }
        if (lastAngle.current === null) {
            lastAngle.current = angle
            return
        }

        let delta = angle - lastAngle.current
        /* Crossing the top (359 -> 0) is a small step, not a full turn backwards */
        if (delta > 180) delta -= 360
        if (delta < -180) delta += 360
        lastAngle.current = angle

        turned.current = Math.max(0, Math.min(360, turned.current + delta)) // the dial stops at both ends
        if (frame.current === null) frame.current = requestAnimationFrame(report)
    }

    const handlePointerEnd = (e) => {
        if (e.pointerId !== pointer.current) return
        pointer.current = null
        lastAngle.current = null

        /* Report the final position before announcing the release */
        if (frame.current !== null) {
            cancelAnimationFrame(frame.current)
            report()
        }
        onReleaseRef.current?.()
    }

    useEffect(() => () => cancelAnimationFrame(frame.current), [])

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
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            >
            <div className={styles.dialOuter}/>
            <div className={styles.dialOuterActive}/>
            <div className={styles.dialInner}/>
            <div className={`${styles.handle} ${styles[variant]} ${activeStyle}`}/>
        </div>
    )
}
