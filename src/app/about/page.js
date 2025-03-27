"use client"
import Card from "@/components/Card/Card"
import TextDisperse from "@/components/DisperseText/DisperseText"
import styles from "./page.module.css"
import gsap from "gsap"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import Button from "@/components/Button/Button"

export default function About() {
    
    const router = useRouter()
    const backgroundRef = useRef(null)

    const setBackground = (isActive) => {
        gsap.to(backgroundRef.current, {opacity: isActive? 0.8 : 0})
    }

    const media = [
        { 
            alt: "Github",
            link: "https://github.com/phantomcorn/"
        },
        { 
            alt: "LinkedIn",
            link: "https://www.linkedin.com/in/phantakorn-prarusudamkerng-6bb73b207/"
        },
        { 
            alt: "Instagram",
            link: "https://www.instagram.com/jaywithnoay/"
        },
        { 
            alt: "Email",
            link: "mailto:jj.phantakorn@outlook.com"
        }
    ]

    const onClick = (e, link) => {
        e.preventDefault()
        window.open(link, "_blank");
    }

    const onBackClick = (e) => {
        e.preventDefault()
        router.back()
    }

    return (
        <div className={styles.page}>
            <div className={styles["section-one"]}>
                <Card/>
                <Button back onClick={onBackClick}/>
            </div>
            <div className={styles["media-container"]}>
                {media.map((item, i) => 
                    <TextDisperse variant={`variant${i + 1}`} key={`media${i+1}`} onClick={(e) => onClick(e, item.link)} setBackground={setBackground}>{item.alt}</TextDisperse>)
                }
                <div ref={backgroundRef} className={styles.background}></div>
            </div>
        </div>
    )
}