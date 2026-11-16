"use client"
import Button from "@/components/Button/Button"
import PortfolioProject from "@/components/PortfolioProject/PortfolioProject";
import Tuner from "@/components/Tuner/Tuner";
import { useState, useRef, useEffect } from "react";
import styles from "./page.module.scss"

import projects from "@/components/PortfolioProject/Projects"
import { useTransitionContext } from "@/components/TransitionWrapper/TransitionWrapper";

/* Projects are listed in the order they are declared in Projects.js */
const projectKeys = Object.keys(projects)

const variantColor = {
    color1: "var(--secondary-one)",
    color2: "var(--secondary-two)",
    color3: "var(--secondary-three)",
    color4: "var(--secondary-four)"
}

const stations = projectKeys.map((key) => ({
    key,
    title: projects[key].title,
    color: variantColor[projects[key].variant]
}))

const STEP = 360 / (stations.length - 1) /* Dial degrees between two neighbouring projects */

export default function Portfolio() {

    const {routeBack} = useTransitionContext()

    const [deg, setDegState] = useState(0) // dial angle: where the needle is
    const [landed, setLanded] = useState(0) // index of the project that is open (the needle settled on it)

    const degRef = useRef(0) // latest angle, readable from animation frames
    const frame = useRef(null)

    const setDeg = (value) => {
        degRef.current = value
        setDegState(value)
    }

    /* Ease the needle onto a project, then open it */
    const tuneTo = (index) => {
        cancelAnimationFrame(frame.current)

        const from = degRef.current
        const to = index * STEP
        const duration = Math.min(600, 180 + Math.abs(to - from) * 2)
        const start = performance.now()

        const step = (now) => {
            const t = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - t, 3)
            setDeg(from + (to - from) * eased)

            if (t < 1) {
                frame.current = requestAnimationFrame(step)
            } else {
                setLanded(index)
            }
        }
        frame.current = requestAnimationFrame(step)
    }

    const onTurn = (value) => { /* User is dragging the dial */
        cancelAnimationFrame(frame.current)
        setDeg(value)
    }

    const onRelease = () => { /* Snap to the nearest project */
        tuneTo(Math.round(degRef.current / STEP))
    }

    useEffect(() => () => cancelAnimationFrame(frame.current), [])

    const onBackClick = (e) => {
        e.preventDefault()
        routeBack()
    }

    const preload = (index) => { /* Preload images when hovering a station */
        projects[projectKeys[index]].media?.forEach((imgSrc) => {
            const img = new Image()
            img.src = imgSrc
        })
    }

    /* Needle sits between project `a` and `a + 1`, `fraction` of the way across */
    const position = deg / STEP
    const a = Math.min(stations.length - 2, Math.floor(position))
    const fraction = position - a
    const color = `color-mix(in srgb, ${stations[a].color}, ${stations[a + 1].color} ${Math.round(fraction * 100)}%)`
    const tuning = Math.abs(position - landed) > 0.02

    return (
        <div className={styles.page}>
            <div className={styles.layout}>
                <div className={`${styles.back} unselect`}>
                    <Button small back onClick={onBackClick} aria-label="Back"/>
                </div>

                <Tuner stations={stations} deg={deg} color={color}
                    onTurn={onTurn} onRelease={onRelease} onPick={tuneTo} onHover={preload}/>

                <PortfolioProject
                    project={projects[projectKeys[landed]]}
                    projectKey={projectKeys[landed]}
                    titleFrom={stations[a].title}
                    titleTo={stations[a + 1].title}
                    titleFraction={fraction}
                    titleColor={color}
                    tuning={tuning}/>
            </div>
        </div>
    )
}
