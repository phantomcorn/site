"use client"
import Button from "@/components/Button/Button"
import PortfolioProject from "@/components/PortfolioProject/PortfolioProject";
import { useState, useRef, useEffect } from "react";
import styles from "./page.module.scss"

import projects from "@/components/PortfolioProject/Projects"
import { useTransitionContext } from "@/components/TransitionWrapper/TransitionWrapper";

/* Projects are listed in the order they are declared in Projects.js */
const projectKeys = Object.keys(projects)

export default function Portfolio() {

    const {routeBack} = useTransitionContext()

    const [activeKey, setActiveKey] = useState(projectKeys[0]) // a project is always open

    const railRef = useRef(null)

    /* Keep the open project's pill in view (the list scrolls sideways on mobile) */
    useEffect(() => {
        railRef.current?.querySelector('[aria-current="true"]')?.scrollIntoView({block: "nearest", inline: "center", behavior: "smooth"})
    }, [activeKey])

    const onBackClick = (e) => {
        e.preventDefault()
        routeBack()
    }

    const showNext = () => {
        const next = (projectKeys.indexOf(activeKey) + 1) % projectKeys.length
        setActiveKey(projectKeys[next])
    }

    const preload = (key) => { /* Preload images on button hover */
        projects[key].media?.forEach((imgSrc) => {
            const img = new Image()
            img.src = imgSrc
        })
    }

    return (
        <div className={styles.page}>
            <div className={styles.layout}>

                {/* Project list: a column beside the project on desktop, a scrolling row above it on mobile */}
                <nav ref={railRef} className={`${styles.rail} unselect`}>
                    <div className={styles.back}>
                        <Button small back onClick={onBackClick} aria-label="Back"/>
                    </div>
                    <div className={styles.projects}>
                        {projectKeys.map((key) => (
                            <Button small key={key}
                                variant={projects[key].variant}
                                selected={key === activeKey}
                                aria-current={key === activeKey}
                                onClick={() => setActiveKey(key)}
                                onMouseEnter={() => preload(key)}>
                                {projects[key].title}
                            </Button>
                        ))}
                    </div>
                </nav>

                <PortfolioProject project={projects[activeKey]} projectKey={activeKey} onNext={showNext}/>
            </div>
        </div>
    )
}
