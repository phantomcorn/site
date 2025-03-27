"use client"
import { useState, useEffect } from "react"
import Timeline from "@/components/Timeline/Timeline" 
import TimelineItem from "@/components/TimelineItem/TimelineItem"
import styles from "./page.module.css"
import { useRouter } from "next/navigation"
import BackArrow from "@/components/BackArrow/BackArrow"

export default function Experience() {

    const [activeView, setActiveView] = useState(<></>)

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
        }
    ]

    const startView = <div className={styles["view-intro"]}> Start scrolling... </div>

    return (
        <div className={styles.page}>
            <div className={styles["backarrow-container"]} onClick={onClickBack}>
                <BackArrow/>
            </div>
            <div className={styles.view}>{activeView ? activeView : startView}</div>
            <Timeline setActiveView={setActiveView}>
                {experiences.map((exp, i) => 
                    <TimelineItem key={`timeline-item${i + 1}`} data={exp}/>
                )}
                
            </Timeline>
        </div>
    )
}