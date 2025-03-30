"use client"
import {motion} from "framer-motion"
import { useState } from "react"
import { disperse } from "./animation"

import style from "./DisperseText.module.css"

export default function TextDisperse({children, setBackground, variant = "variant1", onClick}) {

    const [isAnimated, setIsAnimated] = useState(false)

    const getChars = (text) => {
        let chars = []
        text.split("").forEach((char, i) => {
            chars.push(<motion.span 
                            className="unselect"
                            custom={i} 
                            variants={disperse} 
                            animate={isAnimated? "open" : "closed"} 
                            key={char + i}>
                                {char}
                    </motion.span>)
        })
        return chars
    }

    const onMouseEnter = (e) => {
        setIsAnimated(true)
        setBackground(true)
    }

    const onMouseLeave = (e) => {
        setIsAnimated(false)
        setBackground(false)
    }

    return (
        <div className={`${style[variant]} ${style.media}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
            {getChars(children)}
        </div>
    )
}