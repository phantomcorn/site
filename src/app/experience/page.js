"use client"
import { useState, useRef, useEffect } from "react"
import Timeline from "@/components/Timeline/Timeline" 
import TimelineItem from "@/components/TimelineItem/TimelineItem"
import styles from "./page.module.scss"
import BackArrow from "@/components/BackArrow/BackArrow"
import { useTransitionContext } from "@/components/TransitionWrapper/TransitionWrapper"
import useSwipe from "@/components/Timeline/useSwipe"

export default function Experience() {

    const [scrollPos , setScrollPos] = useState(0)
    const [activeView, setActiveView] = useState(<></>)
    const {routeBack} = useTransitionContext()
    const markerContainerRef = useRef() //markerRef's parent
    const {handleTouchStart, handleTouchEnd, setMaxWidth, setMarkerPos} = useSwipe({setScrollPos})

    const onBackClick = (e) => {
        e.preventDefault()
        routeBack()
    }

    const experiences = [
        {
            role: "Shop Assistant",
            place: "Oseyo Asian Supermarket",
            start: "Jan 2022",
            end: "March 2022",
            desc: [
                "Worked in a fast-paced environment",
                "Managed replenishing goods to shelves and cashier",
                "Rapid decision making to maintain the flow of store"
            ]
        },
        {
            role: "Lead Web Developer",
            place: "Samaggi Samagom",
            start: "Sep 2022",
            end: "April 2023",
            desc: [
                "Developed Samaggi Samagom’s Academic Conference & Careers Fair from high-fidelity prototype",
                "Serve API calls from backend server to frontend for Careers Fair login system"
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
            role: "Intern",
            place: "DCM (Digital Corporate Management)",
            start: "June 2025",
            end: "September 2025",
            desc: [
                "Lead design and development of SME Mate web application including user flow, Figma Hi-Fi and frontend development"
            ]
        },
        {
            role: "CTO",
            place: "NVFACT Co. Ltd.",
            start: "September 2025",
            end: "December 2025",
            desc: [
                "Joint venture partnering with Korean company focusing on smart factory solution",
                "Collaborated in development including frontend and backend",
                "Lead development in AI chatbot using RAG and prompt engineering",
                "Created design guideline and web hi-fi prototype"
            ]
        }
    ]

    const startView = <div className={`${styles.viewIntro} unselect`}/>

    useEffect(() => {
        const maxWidth = markerContainerRef.current?.getBoundingClientRect().width 
        const handleWheel = (e) => {
            setScrollPos((prev) => {
                if (Math.abs(e.deltaY) > 0) {
                    const newScrollPos = prev + (e.deltaY * 0.6)
                    return (Math.max(0,Math.min(maxWidth, newScrollPos))) 
                } else {
                    return prev
                }
            })
        }
        setMaxWidth(maxWidth) /* set maxWidth here (for mobile swipe)*/
        window.addEventListener("wheel", handleWheel)
        return () => {
            window.removeEventListener("wheel", handleWheel)
        }
    }, [])

    return (
        <div className={styles.page}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}>
            <div className={styles.backarrowContainer} onClick={onBackClick}>
                <BackArrow/>
            </div>
            <div className={styles.view}>{activeView ? activeView : startView}</div>
            <Timeline 
                setActiveView={setActiveView} 
                scrollPos={scrollPos} 
                setScrollPos={setScrollPos} 
                markerContainerRef={markerContainerRef} 
                setMarkerPos={setMarkerPos}>
                {experiences.map((exp, i) => 
                    <TimelineItem key={`timeline-item${i + 1}`} data={exp}/>
                )}
                
            </Timeline>
        </div>
    )
}