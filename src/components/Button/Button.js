import styles from "./Button.module.scss";
import BackArrow from "../BackArrow/BackArrow";

/*
    selected: highlights the pill (e.g. the project currently open)
    small: compact pill, for lists of many buttons
*/
export default function Button({ variant = "color1", children, back = false, selected = false, small = false, onClick, ...props}) {

    const classes = [
        styles.button,
        styles[variant],
        (children || back) ? styles.select : styles.none,
        selected && styles.selected,
        small && styles.small
    ].filter(Boolean).join(" ")

    /* Clickable pills behave like real buttons for keyboard users */
    const interactive = onClick ? {
        role: "button",
        tabIndex: 0,
        onClick,
        onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onClick(e)
            }
        }
    } : {}

    return (
        <div {...props} {...interactive} className={classes}>

            {children}
            {back && <BackArrow/>}
        </div>
    )
}
