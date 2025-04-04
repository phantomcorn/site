'use client';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation';
import { text, curve, translate } from './anim';
import styles from "./Curve.module.css"
import { useTransitionContext } from '../TransitionWrapper/TransitionWrapper';

const anim = (variants) => {

    return {
        variants,
        initial: "initial",
        animate: "enter",
        exit: "exit"
    }

}

const routes = {
    "/": "Home",
    "/about": "About",
    "/experience": "Experience",
    "/portfolio": "Portfolio"
}

export default function Curve({children}) {

    const {key, transitionColor, fromExternal} = useTransitionContext()
    const [dimensions, setDimensions] = useState({
        width: null,
        height: null
    })

    useEffect( () => {
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

    return (
        <div>
            <div style={{opacity: dimensions.width == null ? 1 : 0}} className={styles.background}/>
            <motion.p className={styles.route} {...anim(text)}>
                    {fromExternal ? "Welcome" : routes[key]}
            </motion.p>
            {dimensions.width != null && <SVG {...dimensions} fillColor={transitionColor[key]}/>}
            {children}
        </div>
    )
}

const SVG = ({height, width, fillColor}) => {

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

    const handleOnAnimationComplete = () => {
        if (fromExternal) setFromExternal(false)
    }
    return (
        <motion.svg {...anim(translate(fromExternal))} className={styles.svg}>
            <motion.path {...anim(curve(initialPath, targetPath))} fill={fillColor} onAnimationComplete={handleOnAnimationComplete}/> 
        </motion.svg>
    )

}