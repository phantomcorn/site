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

    /*
        The curtain keeps the same curved top and bottom edge for the whole transition;
        only the bottom edge slides, so it never flattens into a straight cut.
        (Edges are in svg px; the svg itself moves between top: -27vh and -100vh)
    */
    const bulge = 150 // how far the middle of an edge leads/trails its sides

    // Top edge: sides sit just above the top of the screen when the svg rests at -27vh, on any viewport height
    const topSide = 0.27 * height - 2
    const topBulge = Math.min(bulge, topSide) // keep the peak inside the svg box
    const topEdge = `M0 ${topSide} Q${width/2} ${topSide - 2 * topBulge} ${width} ${topSide}`

    // Bottom edge: sides at `y`, middle hanging `bulge` px lower
    const bottomEdge = (y) => `L${width} ${y} Q${width/2} ${y + 2 * bulge} 0 ${y} L0 ${topSide}`

    // Covering: bottom edge well below the screen
    const initialPath = `${topEdge} ${bottomEdge(height + 300)}`

    // Revealed (svg at -100vh): lowest point of the bottom edge is exactly at the top of the screen
    const targetPath = `${topEdge} ${bottomEdge(height - bulge)}`

    const handleOnAnimationComplete = (definition) => {
        if (definition === "reveal" && fromExternal) setFromExternal(false)
    }
    return (
        <motion.svg {...anim(translate(fromExternal), covering)} className={styles.svg} onAnimationComplete={handleOnAnimationComplete}>
            <motion.path {...anim(curve(initialPath, targetPath), covering)} fill={fillColor}/>
        </motion.svg>
    )

}
