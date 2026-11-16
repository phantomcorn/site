import styles from "./Section.module.scss"

/*
    One section of the single-page site. `id` is what the nav links (and /#id addresses) jump to.
    label: name used by the nav and screen readers
    showLabel: false hides the heading, for a section whose content already names it
*/
export default function Section({id, label, showLabel = true, children}) {
    return (
        <section id={id} className={styles.section} aria-label={label}>
            {showLabel && <h2 className={`${styles.label} unselect`}>{label}</h2>}
            {children}
        </section>
    )
}
