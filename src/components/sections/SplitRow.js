"use client"
import { useEffect, useRef } from "react"
import styles from "./SplitRow.module.scss"
import sectionStyles from "./Section.module.scss"
import AboutSection from "./AboutSection"
import ExperienceSection from "./ExperienceSection"

const PINNED = "(min-width: 1024px)" /* $bp-lg: below this the two columns stack and nothing is pinned */
const CARD_WIDTH_REM = 34 /* Card.module.scss */

/*
    About and Experience side by side, both exactly one screen tall.

    The row pins to the screen while the page keeps scrolling; that scrolling moves the
    experience list up inside its column instead. Once the last role is in view the row
    lets go and the page carries on to the next section.

    It is ordinary page scrolling throughout (wheel, touch, keyboard and scrollbar all work):
    the wrapper is simply made taller by however much the experience list overflows its column,
    so adding more roles makes the pinned stretch longer and needs no change here.
*/
export default function SplitRow() {

    const wrapRef = useRef(null)     // tall wrapper: its extra height is the pinned scrolling distance
    const rowRef = useRef(null)      // the pinned row
    const aboutRef = useRef(null)
    const experienceRef = useRef(null)
    const viewportRef = useRef(null) // the experience column's window onto the list
    const contentRef = useRef(null)  // the experience list, moved up as the page scrolls

    useEffect(() => {
        const wrap = wrapRef.current
        const row = rowRef.current
        const viewport = viewportRef.current
        const content = contentRef.current
        const experience = experienceRef.current
        const cardFit = aboutRef.current.querySelector("[data-card-fit]")
        const media = window.matchMedia(PINNED)

        let extra = 0 // px of experience list that does not fit in its column

        /* Move the list according to how far the page has scrolled through the pinned stretch */
        const place = () => {
            const stickyTop = parseFloat(getComputedStyle(row).top) || 0
            const progress = Math.max(0, Math.min(extra, stickyTop - wrap.getBoundingClientRect().top))
            content.style.transform = extra ? `translateY(${-progress}px)` : ""

            /* Nav: while the row has only just pinned, it still counts as "About" */
            experience.toggleAttribute("data-nav-inactive", extra > 0 && progress < extra * 0.15)
        }

        const measure = () => {
            const pinned = media.matches
            wrap.toggleAttribute("data-pinned", pinned)

            extra = pinned ? Math.max(0, content.scrollHeight - viewport.clientHeight) : 0
            wrap.style.setProperty("--extra", `${extra}px`)

            /* The ID card has a fixed size: shrink it to its column (phones rotate it instead, see Card.module.scss) */
            if (cardFit?.firstElementChild) {
                const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
                const fit = cardFit.clientWidth / (CARD_WIDTH_REM * rem)
                cardFit.firstElementChild.style.zoom = window.innerWidth > 480 && fit < 1 ? fit : ""
            }

            place()
        }

        measure()

        /* capture: run before the timeline's own scroll listener, so it reads the list's new position */
        window.addEventListener("scroll", place, {passive: true, capture: true})
        window.addEventListener("resize", measure)
        media.addEventListener("change", measure)
        const resized = new ResizeObserver(measure) // "See more", fonts loading, column resizing
        resized.observe(content)
        resized.observe(viewport)
        if (cardFit) resized.observe(cardFit)

        return () => {
            window.removeEventListener("scroll", place, {capture: true})
            window.removeEventListener("resize", measure)
            media.removeEventListener("change", measure)
            resized.disconnect()
        }
    }, [])

    return (
        <div ref={wrapRef} id="about" className={styles.wrap}>
            <div ref={rowRef} className={styles.row}>

                <section ref={aboutRef} className={styles.column} aria-label="About">
                    <h2 className={`${sectionStyles.label} unselect`}>About</h2>
                    <AboutSection/>
                </section>

                <section ref={experienceRef} id="experience" className={styles.column} aria-label="Experience">
                    <h2 className={`${sectionStyles.label} unselect`}>Experience</h2>
                    <div ref={viewportRef} className={styles.viewport} data-timeline-viewport>
                        <div ref={contentRef} className={styles.content}>
                            <ExperienceSection/>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}
