import styles from "./MorphText.module.scss"

/* Same blur/opacity curve as the home page title */
const BLUR = 5
const OPACITY = 0.4

const morphStyle = (amount) => ({ /* amount: 1 = fully shown, 0 = gone */
    opacity: Math.pow(amount, OPACITY),
    filter: `blur(${Math.min(BLUR / Math.max(amount, 0.001) - BLUR, 100)}px)`
})

/*
    Morphs one piece of text into another.
    fraction: 0 shows `from`, 1 shows `to`, anything between is a blend of the two
*/
export default function MorphText({from, to, fraction, color, className = ""}) {
    return (
        <h3 className={`${styles.morph} ${className}`} style={{color}} aria-label={fraction < 0.5 ? from : to}>
            <span aria-hidden="true" style={morphStyle(1 - fraction)}>{from}</span>
            <span aria-hidden="true" style={morphStyle(fraction)}>{to}</span>
        </h3>
    )
}
