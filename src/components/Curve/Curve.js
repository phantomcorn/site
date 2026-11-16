'use client';
import React, { useLayoutEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { text, curve, translate } from './anim';
import styles from "./Curve.module.scss"
import { useTransitionContext } from '../TransitionWrapper/TransitionWrapper';

const anim = (variants, covering) => {

    return {
        variants,
        initial: "initial",
        animate: covering ? "cover" : "reveal"
    }

}

const routes = {
    "/": "Home",
    "/about": "About",
    "/experience": "Experience",
    "/portfolio": "Portfolio"
}

/*
    path: route the curtain is labelled/coloured for
    covering: true => curtain comes up and stays, false => curtain reveals the page
    onCovered: called once the curtain fully covers the page
*/
export default function Curve({path, covering, onCovered}) {

    const {transitionColor, fromExternal} = useTransitionContext()
    const [dimensions, setDimensions] = useState({
        width: null,
        height: null
    })

    /* Layout effect: measure before the first paint so the page is never shown uncovered */
    useLayoutEffect( () => {
        function resize(){
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        resize();
        window.addEventListener("resize", resize)
        return () => {
            window.removeEventListener("resize", resize);
        }
    }, [])

    const measured = dimensions.width != null

    const handleOnAnimationComplete = (definition) => {
        if (definition === "cover") onCovered()
    }

    return (
        <>
            <div style={{opacity: measured ? 0 : 1, backgroundColor: transitionColor[path]}} className={styles.background}/>
            <motion.p className={styles.route} {...anim(text, covering)} onAnimationComplete={handleOnAnimationComplete}>
                    {measured && (fromExternal ? "Welcome" : routes[path])}
            </motion.p>
            {measured && <SVG {...dimensions} fillColor={transitionColor[path]} covering={covering}/>}
        </>
    )
}

const SVG = ({height, width, fillColor, covering}) => {

    const {fromExternal, setFromExternal} = useTransitionContext()

    const initialPath = `
        M0 300
        Q${width/2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width/2} ${height + 600} 0 ${height + 300}
        L0 0
    `

    const targetPath = `
        M0 300
        Q${width/2} 0 ${width} 300
        L${width} ${height}
        Q${width/2} ${height} 0 ${height}
        L0 0
    `

    const handleOnAnimationComplete = (definition) => {
        if (definition === "reveal" && fromExternal) setFromExternal(false)
    }
    return (
        <motion.svg {...anim(translate(fromExternal), covering)} className={styles.svg} onAnimationComplete={handleOnAnimationComplete}>
            <motion.path {...anim(curve(initialPath, targetPath), covering)} fill={fillColor}/>
        </motion.svg>
    )

}
