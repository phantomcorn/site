"use client"
import Button from "@/components/Button/Button"
import Menu from "@/components/Menu/Menu";
import PortfolioPage from "@/components/PortfolioProject/PortfolioProject";
import { useState, useRef, useEffect } from "react";
import styles from "./page.module.css"
import gsap from "gsap"
import { useRouter } from "next/navigation";

import projects from "@/components/PortfolioProject/Projects"

export default function Portfolio() {

    const router = useRouter()

    const [pageActive, setPageActive] = useState(null)
    const portPageRef = useRef()
    const gridRef = useRef()
    const showMenu = (e, title) => {
        e.preventDefault()
        setPageActive(projects[title])
    }

    useEffect(() => {
        gsap.to(gridRef.current, {
            filter: pageActive ? "blur(7px)" : "none",
            ease: "power1.inOut",
            scale: pageActive ? 0.3 : 1,
            duration: 0.2
        })

        if (portPageRef.current) {
            gsap.to(portPageRef.current, {
                autoAlpha: pageActive ? 1 : 0,
                ease: "power1.inOut",
                duration: 0.2
            })
        }
    }, [pageActive])

    const onBackClick = (e) => {
        e.preventDefault()
        router.back()
    }

    return (
        <div className={styles.page}>
            
            <div ref={gridRef} className={`${styles.grid} unselect`} >
                <Button back onClick={onBackClick}/>
                <Button variant="color1" onClick={(e) => showMenu(e, "imaudible")}> ImAudible Gallery </Button>
                <Button variant="color4" onClick={(e) => showMenu(e, "oasis-residence")}> Oasis Residence </Button>
                {[...Array(11)].map((_, index) => (
                    <Button key={index}/> 
                ))}
                <Button variant="color3" onClick={(e) => showMenu(e, "tonamn-portfolio")}> Tonamn Porfolio </Button>

                {[...Array(16)].map((_, index) => (
                    <Button key={index}/> 
                ))}
                <Button variant="color2" onClick={(e) => showMenu(e, "broked")}> Broked </Button>
                {[...Array(16)].map((_, index) => (
                    <Button key={index}/>
                ))}
            </div>
            {pageActive && <PortfolioPage ref={portPageRef} pageActive={pageActive} setPageActive={setPageActive}></PortfolioPage>}
        </div>
    )
}