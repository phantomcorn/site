"use client"
import TextDisperse from "@/components/DisperseText/DisperseText"
import styles from "./ReachSection.module.scss"
import gsap from "gsap"
import { useRef } from "react"

export default function ReachSection() {
    
    const backgroundRef = useRef(null)

    const setBackground = (isActive) => {
        gsap.to(backgroundRef.current, {opacity: isActive? 0.8 : 0})
    }

    const media = [
        { 
            alt: "Github",
            className: "github",
            link: "https://github.com/phantomcorn/"
        },
        { 
            alt: "LinkedIn",
            className: "linkedin",
            link: "https://www.linkedin.com/in/phantakorn-prarusudamkerng-6bb73b207/"
        },
        { 
            alt: "Instagram",
            className: "instagram",
            link: "https://www.instagram.com/jaywithnoay/"
        },
        { 
            alt: "Email",
            className: "email",
            link: "mailto:jj.phantakorn@outlook.com"
        }
    ]

    const onClick = (e, link) => {
        e.preventDefault()
        window.open(link, "_blank");
    }

    return (
        <>
            {/* One row of equal bricks, like a dashed line: Reach, Me, then a brick per link */}
            <div className={styles.mediaContainer}>
                <div className={`${styles.brick} unselect`}>Reach</div>
                <div className={`${styles.brick} unselect`}>Me</div>
                {media.map((item) => (
                    <TextDisperse key={item.alt} variant={item.className} onClick={(e) => onClick(e, item.link)} setBackground={setBackground}>{item.alt}</TextDisperse>
                ))}
            </div>
            <div ref={backgroundRef} className={styles.background}></div>
        </>
    )
}