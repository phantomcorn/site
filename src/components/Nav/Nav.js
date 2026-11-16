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

    /* Track which section sits in the middle band of the screen */
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActive(entry.target.id)
            })
        }, {rootMargin: "-45% 0px -50% 0px"})

        const hero = document.getElementById("top")
        const targets = sections.map(({id}) => document.getElementById(id)).filter(Boolean)
        if (hero) targets.push(hero)
        targets.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [sections])

    const jump = (e, id) => {
        e.preventDefault()
        document.getElementById(id)?.scrollIntoView({behavior: "smooth", block: "start"})
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
