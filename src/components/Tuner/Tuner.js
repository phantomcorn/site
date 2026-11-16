"use client"
import styles from "./Tuner.module.scss"
import Dial from "../Dial/Dial"

/* Where station i sits along the scale (%), leaving room at both ends */
const EDGE = 4
const stationX = (position, count) => EDGE + position * (100 - 2 * EDGE) / (count - 1)

/*
    A radio tuner: the dial slides a needle along a scale of stations.

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
