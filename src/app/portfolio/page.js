"use client"
import Button from "@/components/Button/Button"
import PortfolioPage from "@/components/PortfolioProject/PortfolioProject";
import { useState, useRef, useEffect } from "react";
import styles from "./page.module.scss"
import gsap from "gsap"

import projects from "@/components/PortfolioProject/Projects"
import { useTransitionContext } from "@/components/TransitionWrapper/TransitionWrapper";

const GRID_CELLS = 7 * 7 /* columns x rows of .grid in page.module.scss */
const projectKeys = Object.keys(projects)

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
                zIndex: pageActive ? 1 : -1,
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
                {/* Projects sit one after another, in the order they are declared in Projects.js */}
                {projectKeys.map((key) => (
                    <Button key={key} variant={projects[key].variant} onClick={(e) => showProject(e, key)} onMouseEnter={() => preload(key)}>
                        {projects[key].title}
                    </Button>
                ))}
                {/* Empty pills fill the rest of the grid */}
                {[...Array(Math.max(0, GRID_CELLS - 1 - projectKeys.length))].map((_, index) => (
                    <div key={`fake${index}`} className={styles.fake}>
                        <Button/>
                    </div>
                ))}
            </div>
            {/* Allow scrolling inside container without affecting parent*/}
            <div className={styles.outerShell} ref={portPageRef}>
                <div className={styles.innerShell}>
                    {pageActive && <PortfolioPage pageActive={pageActive} setPageActive={setPageActive}></PortfolioPage>}
                </div>
            </div>
        </div>
            
        
    )
}