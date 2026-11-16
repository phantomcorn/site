"use client"
import { useRef, useEffect, useState } from "react"
import styles from "./ExperienceSection.module.scss"

/* Newest first. Shown top to bottom in this order. */
const experiences = [
    {
        role: "AI Engineer",
        place: "Royal Thai Army Cyber Department",
        start: "May 2026",
        end: "Nov 2026",
        desc: [
            "Built harnesses using LangChain Deep Agents to prevent repetitive tool calling and unauthorized subagent spawning",
            "Developed a containerized application with secure remote access via VPN and SSH, enabling model development",
            "Integrated CVE data into a RAG pipeline to generate realistic security events for simulation",
            "Cut inference time by 50% through request batching and trimming context overhead"
        ]
    },
    {
        role: "AI/Frontend Developer",
        place: "NVFACT (Startup)",
        start: "Sep 2025",
        end: "Jan 2026",
        desc: [
            "Thai-Korean joint venture attempt to localize smart factory solutions in Thailand",
            "PoC-ed AI chatbot using RAG and prompt engineering",
            "Collaborated in frontend development",
            "Design guidelines and Figma hi-fi prototypes"
        ]
    },
    {
        role: "Intern Developer",
        place: "Pugpig",
        start: "April 2023",
        end: "Sep 2023",
        desc: [
            "Contributed to developing features and bug fixes on native iOS and Android apps",
            "Styling and fixes for Spectator AUS, Spectator UK, Rolling Loud etc. via WordPress CMS",
            "Replicate error and conduct test before product shipping, document test results with images/videos across devices/browsers",
            "Hosts meetings for pair programming sessions and SED",
            "Managed work through Jira’s ticketing system"
        ]
    },
    {
        role: "Lead Web Developer",
        place: "Samaggi Samagom",
        start: "Sep 2022",
        end: "April 2023",
        desc: [
            "Coordinated team members and assigned tasks for specific web components to ensure efficient development and integration",
            "Developed Samaggi Samagom’s Academic Conference & Careers Fair from high-fidelity prototype",
            "Serve API calls from backend server to frontend for Careers Fair login system"
        ]
    }
]

/* The timeline is filled down to this fraction of the screen height as the section scrolls past */
const FILL_LINE = 0.6

/* A role's bullet points: every role shows the same few lines until "See more" is pressed */
function Description({lines}) {

    const [expanded, setExpanded] = useState(false)
    const [overflows, setOverflows] = useState(true) // does the text need a "See more" at all
    const listRef = useRef(null)

    useEffect(() => {
        const measure = () => {
            const list = listRef.current
            if (!list || expanded) return // only the collapsed list can tell us whether text is cut off
            setOverflows(list.scrollHeight > list.clientHeight + 1)
        }

        measure()
        window.addEventListener("resize", measure)
        return () => window.removeEventListener("resize", measure)
    }, [expanded])

    return (
        <>
            <ul ref={listRef} className={`${styles.desc} ${expanded ? styles.descOpen : ""}`}>
                {lines.map((line) => <li key={line}>{line}</li>)}
            </ul>
            {(overflows || expanded) &&
                <button type="button" className={styles.more} onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
                    {expanded ? "See less" : "See more"}
                </button>
            }
        </>
    )
}

export default function ExperienceSection() {

    const listRef = useRef(null)

    /* Fill the timeline as the page scrolls past each role (plain page scrolling, nothing is taken over) */
    useEffect(() => {
        const list = listRef.current
        if (!list) return

        const update = () => {
            const top = list.getBoundingClientRect().top
            let line = window.innerHeight * FILL_LINE

            /* Inside the pinned About/Experience row the list scrolls within a window (SplitRow.js):
               measure against that window, sliding the line to its bottom edge by the end of the list */
            const box = list.closest("[data-timeline-viewport]")
            if (box && box.clientHeight < list.offsetHeight) {
                const window_ = box.getBoundingClientRect()
                const scrolled = Math.max(0, Math.min(1, (window_.top - top) / (list.offsetHeight - window_.height)))
                line = window_.top + window_.height * (FILL_LINE + (1 - FILL_LINE) * scrolled)
            }

            const fill = Math.max(0, Math.min(list.offsetHeight, line - top))
            list.style.setProperty("--timeline-fill", `${fill}px`)

            /* A role's dot lights up once the fill reaches it */
            list.querySelectorAll("[data-role]").forEach((role, i) => {
                role.toggleAttribute("data-reached", i === 0 || role.offsetTop + 16 <= fill)
            })
        }

        update()
        window.addEventListener("scroll", update, {passive: true})
        window.addEventListener("resize", update)
        const resized = new ResizeObserver(update) // "See more" changes the height of the list
        resized.observe(list)
        return () => {
            window.removeEventListener("scroll", update)
            window.removeEventListener("resize", update)
            resized.disconnect()
        }
    }, [])

    return (
        <ol ref={listRef} className={styles.list}>
            <li className={styles.spine} aria-hidden="true"/>
            {experiences.map((exp) => (
                <li key={`${exp.place}-${exp.start}`} className={styles.role} data-role>
                    <span className={styles.dot} aria-hidden="true"/>
                    <div className={styles.head}>
                        <h3 className={styles.title}>{exp.role}</h3>
                        <div className={styles.when}>{exp.start} - {exp.end}</div>
                    </div>
                    <div className={styles.place}>{exp.place}</div>
                    <Description lines={exp.desc}/>
                </li>
            ))}
        </ol>
    )
}
