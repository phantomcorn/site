"use client"
import { useRef, useEffect } from "react"
import styles from "./page.module.scss"
import Button from "@/components/Button/Button"
import { useTransitionContext } from "@/components/TransitionWrapper/TransitionWrapper"

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

/* The timeline is filled down to a line across the screen: 60% of the way down at the top of the page,
   sliding to the bottom edge by the end of the page so the last role is always reached */
const FILL_LINE = 0.6

export default function Experience() {

    const {routeBack} = useTransitionContext()
    const listRef = useRef(null)

    const onBackClick = (e) => {
        e.preventDefault()
        routeBack()
    }

    /* Fill the timeline as the page scrolls past each role (plain page scrolling, nothing is taken over) */
    useEffect(() => {
        const list = listRef.current
        if (!list) return

        const update = () => {
            const top = list.getBoundingClientRect().top
            const scrollable = document.documentElement.scrollHeight - window.innerHeight
            const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 1
            const line = window.innerHeight * (FILL_LINE + (1 - FILL_LINE) * progress)
            const fill = Math.max(0, Math.min(list.offsetHeight, line - top))
            list.style.setProperty("--timeline-fill", `${fill}px`)

            /* A role's dot lights up once the fill reaches it */
            list.querySelectorAll("[data-role]").forEach((role, i) => {
                role.toggleAttribute("data-reached", i === 0 || role.offsetTop + 28 <= fill)
            })
        }

        update()
        window.addEventListener("scroll", update, {passive: true})
        window.addEventListener("resize", update)
        return () => {
            window.removeEventListener("scroll", update)
            window.removeEventListener("resize", update)
        }
    }, [])

    return (
        <div className={styles.page}>
            <div className={styles.layout}>
                <div className={`${styles.back} unselect`}>
                    <Button small back onClick={onBackClick} aria-label="Back"/>
                </div>

                <ol ref={listRef} className={styles.list}>
                    <li className={styles.spine} aria-hidden="true"/>
                    {experiences.map((exp) => (
                        <li key={`${exp.place}-${exp.start}`} className={styles.role} data-role>
                            <span className={styles.dot} aria-hidden="true"/>
                            <div className={styles.head}>
                                <h2 className={styles.title}>{exp.role}</h2>
                                <div className={styles.when}>{exp.start} - {exp.end}</div>
                            </div>
                            <div className={styles.place}>{exp.place}</div>
                            <ul className={styles.desc}>
                                {exp.desc.map((line) => <li key={line}>{line}</li>)}
                            </ul>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}
