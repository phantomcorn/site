"use client"
import Button from "@/components/Button/Button"
import PortfolioPage from "@/components/PortfolioProject/PortfolioProject";
import { useState, useRef, useEffect } from "react";
import styles from "./page.module.scss"
import gsap from "gsap"

import projects from "@/components/PortfolioProject/Projects"
import { useTransitionContext } from "@/components/TransitionWrapper/TransitionWrapper";

export default function Portfolio() {

    const {routeBack} = useTransitionContext()

    const [pageActive, setPageActive] = useState(null)
    const portPageRef = useRef()
    const gridRef = useRef()
    
    const showProject = (e, title) => {
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
        routeBack()
    }

    const preload = (title) => { /* Preload images on button hover */

        if (!projects[title].preloaded) {
            projects[title].media?.map((imgSrc) => {
                const img = new Image()
                img.src = imgSrc
            })
        }
    }

    return (
        <div className={styles.page}>
            
            <div ref={gridRef} className={`${styles.grid} unselect`} >
                <Button back onClick={onBackClick}/>
                <Button variant="color1" onClick={(e) => showProject(e, "imaudible")} onMouseEnter={() => preload("imaudible")}> ImAudible Gallery </Button>
                <Button variant="color4" onClick={(e) => showProject(e, "oasis-residence")} onMouseEnter={() => preload("oasis-residence")}> Oasis Residence </Button>
                {[...Array(11)].map((_, index) => (
                    <Button key={index}/> 
                ))}
                <Button variant="color3" onClick={(e) => showProject(e, "tonamn-portfolio")} onMouseEnter={() => preload("tonamn-portfolio")}> Tonamn Porfolio </Button>

                {[...Array(11)].map((_, index) => (
                    <Button key={index}/> 
                ))}
                <Button variant="color3" onClick={(e) => showProject(e, "askdoc")} onMouseEnter={() => preload("askdoc")}> AskDoc </Button>
                {[...Array(4)].map((_, index) => (
                    <Button key={index}/> 
                ))}
                <Button variant="color2" onClick={(e) => showProject(e, "broked")}> Broked </Button>
                {[...Array(16)].map((_, index) => (
                    <Button key={index}/>
                ))}
            </div>
            {pageActive && <PortfolioPage ref={portPageRef} pageActive={pageActive} setPageActive={setPageActive}></PortfolioPage>}
        </div>
    )
}