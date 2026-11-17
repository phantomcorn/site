"use client"
import { useEffect, useRef } from "react"
import styles from "./Tuner.module.scss"
import Dial from "../Dial/Dial"
import { ChevronLeft, ChevronRight } from "lucide-react"

const HOLD_SPEED = 100 /* Dial degrees per second while an arrow is held (about two projects a second) */
const TAP = 250        /* A press shorter than this (ms) is a tap: step exactly one project */

/* Where station i sits along the scale (%), leaving room at both ends */
const EDGE = 4
const stationX = (position, count) => EDGE + position * (100 - 2 * EDGE) / (count - 1)

/*
    A radio tuner: the dial slides a needle along a scale of stations.
    On iPad-sized screens and smaller (see Tuner.module.scss) the dial is replaced by a left and a right arrow:
    hold one to slide the needle that way, let go and it settles on the nearest station; a quick tap steps one station.

    stations: [{key, title, color}] in scale order
    deg: dial angle [0, 360]; a full sweep covers the whole scale
    color: needle colour
    onTurn(deg): the user is dragging the dial
    onRelease(): the user let go of the dial
    onPick(index): the user chose a station directly (click on the scale, or arrow keys)
    onHover(index) (optional)
*/
export default function Tuner({stations, deg, color, onTurn, onRelease, onPick, onHover}) {

    const count = stations.length
    const position = deg / 360 * (count - 1) // 0 = first station, count - 1 = last
    const nearest = Math.round(position)

    /* Arrows: a held arrow moves the needle every frame, so read the latest values through refs */
    const degRef = useRef(deg)
    degRef.current = deg
    const callbacks = useRef({})
    callbacks.current = {onTurn, onRelease, onPick}
    const hold = useRef(null) // {frame, startedAt, from} while an arrow is held

    const stopHold = () => {
        if (!hold.current) return null
        cancelAnimationFrame(hold.current.frame)
        const held = hold.current
        hold.current = null
        return held
    }

    const startHold = (e, direction) => {
        if (hold.current) return
        if (e.pointerType === "mouse" && e.button !== 0) return
        e.preventDefault()
        try { e.currentTarget.setPointerCapture(e.pointerId) } catch {} // keep the release even if the finger slides off

        const held = {startedAt: performance.now(), from: Math.round(degRef.current / 360 * (count - 1)), direction}
        hold.current = held

        let last = held.startedAt
        const step = (now) => {
            const moved = direction * HOLD_SPEED * (now - last) / 1000
            last = now
            callbacks.current.onTurn(Math.max(0, Math.min(360, degRef.current + moved)))
            held.frame = requestAnimationFrame(step)
        }
        held.frame = requestAnimationFrame(step)
    }

    const endHold = () => {
        const held = stopHold()
        if (!held) return

        if (performance.now() - held.startedAt < TAP) {
            callbacks.current.onPick(Math.max(0, Math.min(count - 1, held.from + held.direction))) // tap: one station
        } else {
            callbacks.current.onRelease() // hold: settle on the nearest station
        }
    }

    /* Keyboard (Enter / Space on a focused arrow) arrives as a click with no pointer: step one station */
    const onArrowClick = (e, direction) => {
        if (e.detail !== 0) return // pointer presses are handled by startHold / endHold
        onPick(Math.max(0, Math.min(count - 1, nearest + direction)))
    }

    useEffect(() => () => { stopHold() }, [])

    const arrow = (direction, label, Icon) => (
        <button type="button"
            className={`${styles.arrow} ${direction < 0 ? styles.arrowLeft : styles.arrowRight} ${(direction < 0 ? deg <= 0 : deg >= 360) ? styles.arrowEnd : ""}`}
            aria-label={label}
            /* Not the `disabled` attribute: a held arrow that reaches the end must still receive its release */
            aria-disabled={direction < 0 ? deg <= 0 : deg >= 360}
            onPointerDown={(e) => startHold(e, direction)}
            onPointerUp={endHold}
            onPointerCancel={endHold}
            onClick={(e) => onArrowClick(e, direction)}
            onContextMenu={(e) => e.preventDefault()}>
            <Icon size={26}/>
        </button>
    )

    const onKeyDown = (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            e.preventDefault()
            onPick(Math.min(count - 1, nearest + 1))
        }
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
            e.preventDefault()
            onPick(Math.max(0, nearest - 1))
        }
    }

    return (
        <div className={`${styles.housing} unselect`}>
            <div className={styles.scale}>
                <div className={styles.band}/>

                {stations.map((station, i) => (
                    <div key={station.key}>
                        <div className={styles.tick} style={{left: `${stationX(i, count)}%`}}/>
                        {i < count - 1 && <div className={`${styles.tick} ${styles.tickMinor}`} style={{left: `${stationX(i + 0.5, count)}%`}}/>}
                        <button type="button"
                            className={`${styles.station} ${i % 2 ? styles.below : styles.above} ${i === nearest ? styles.stationOn : ""}`}
                            style={{left: `${stationX(i, count)}%`, color: station.color}}
                            onClick={() => onPick(i)}
                            onMouseEnter={() => onHover?.(i)}
                            aria-current={i === nearest}>
                            {station.title}
                        </button>
                    </div>
                ))}

                <div className={styles.needle} style={{left: `${stationX(position, count)}%`, background: color}}/>
            </div>

            {arrow(-1, "Previous project", ChevronLeft)}
            {arrow(1, "Next project", ChevronRight)}

            <div className={styles.knobWrap}
                tabIndex={0}
                role="slider"
                aria-label="Project tuner"
                aria-valuemin={1}
                aria-valuemax={count}
                aria-valuenow={nearest + 1}
                aria-valuetext={stations[nearest].title}
                onKeyDown={onKeyDown}>
                <Dial id="tuner" deg={deg} setDeg={(_, value) => onTurn(value)} onRelease={onRelease} activeDial="tuner" variant="color4" className={styles.knob}/>
            </div>
        </div>
    )
}
