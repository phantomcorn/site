"use client"
import Card from "@/components/Card/Card"
import TextDisperse from "@/components/DisperseText/DisperseText"
import styles from "./page.module.css"
import gsap from "gsap"
import { useRef } from "react"

export default function About() {

    const backgroundRef = useRef(null)
    const setBackground = (isActive) => {
        gsap.to(backgroundRef.current, {opacity: isActive? 0.8 : 0})
    }
    return (
        <div className={styles.page}>
            <Card/>
            <div className={styles["media-container"]}>
                <TextDisperse variant="variant1" setBackground={setBackground}>Github</TextDisperse>
                <TextDisperse variant="variant2" setBackground={setBackground}>LinkedIn</TextDisperse>
                <TextDisperse variant="variant3" setBackground={setBackground}>Instagram</TextDisperse>
                <TextDisperse variant="variant4" setBackground={setBackground}>Email</TextDisperse>
                <div ref={backgroundRef} className={styles.background}></div>
            </div>
        </div>
    )
}