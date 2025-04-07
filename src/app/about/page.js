"use client"
import Card from "@/components/Card/Card"
import TextDisperse from "@/components/DisperseText/DisperseText"
import styles from "./page.module.scss"
import gsap from "gsap"
import { useRef } from "react"
import BackArrow from "@/components/BackArrow/BackArrow"
import ReachMeArrow from "@/../public/ReachMeArrow.svg"
import { useTransitionContext } from "@/components/TransitionWrapper/TransitionWrapper"
import Image from "next/image"

import { Fragment } from 'react'

export default function About() {
    
    const backgroundRef = useRef(null)
    const {routeBack} = useTransitionContext()

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
        routeBack()
    }
    
    return (
        <div className={styles.page}>
            <div className={styles.backarrowContainer} onClick={onBackClick}>
                <BackArrow/>
            </div>
            <Card/>
            <div className={styles.mediaContainer}>
                <div className={`${styles.brick} ${styles.reach} unselect`}> Reach </div>
                <div className={`${styles.brick} ${styles.me} unselect`}> Me </div>
                <div className={`${styles.brick} ${styles.reachMeArrow} unselect`}> 
                    <Image draggable="false" src={ReachMeArrow} width={0} height={0} alt="Reach me arrow"/> 
                </div>
                <div className={styles.childBreak}/>
                {media.map((item, i) => (
                    <Fragment key={`media${i+1}`}>
                        <TextDisperse variant={`variant${i + 1}`} onClick={(e) => onClick(e, item.link)} setBackground={setBackground}>{item.alt}</TextDisperse>
                        {i === 1 && <div className={styles.childBreak}/>}
                    </Fragment>
                ))}
                
            </div>
            <div ref={backgroundRef} className={styles.background}></div>
        </div>
    )
}