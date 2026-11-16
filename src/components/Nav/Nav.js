"use client"
import { useEffect, useState } from "react"
import styles from "./Nav.module.scss"

/*
    Fixed navigation for the single-page site.
    sections: [{id, label}] in page order. Clicking a label scrolls to that section;
    the label of the section currently on screen is underlined.
*/
export default function Nav({sections}) {

    const [active, setActive] = useState(null)

    /* The current section is the last one whose top has passed the middle of the screen */
    useEffect(() => {
        const update = () => {
            const line = window.innerHeight * 0.45
            let current = null
            sections.forEach(({id}) => {
                const el = document.getElementById(id)
                if (!el || el.hasAttribute("data-nav-inactive")) return // SplitRow.js: not yet the section in focus
                if (el.getBoundingClientRect().top <= line) current = id
            })
            setActive(current)
        }

        update()
        window.addEventListener("scroll", update, {passive: true})
        window.addEventListener("resize", update)
        return () => {
            window.removeEventListener("scroll", update)
            window.removeEventListener("resize", update)
        }
    }, [sections])

    const jump = (e, id) => {
        e.preventDefault()
        const el = document.getElementById(id)
        /* A section inside the pinned row cannot be scrolled to on its own: go to the start of the row */
        const target = el?.closest("[data-pinned]") ?? el
        target?.scrollIntoView({behavior: "smooth", block: "start"})
        window.history.replaceState(null, "", id === "top" ? window.location.pathname : `#${id}`)
    }

    return (
        <nav className={`${styles.nav} unselect`} aria-label="Sections">
            <a className={styles.name} href="#top" onClick={(e) => jump(e, "top")}>jaywithnoay</a>
            <div className={styles.links}>
                {sections.map(({id, label}) => (
                    <a key={id} href={`#${id}`}
                        className={`${styles.link} ${active === id ? styles.linkOn : ""}`}
                        aria-current={active === id ? "true" : undefined}
                        onClick={(e) => jump(e, id)}>
                        {label}
                    </a>
                ))}
            </div>
        </nav>
    )
}
