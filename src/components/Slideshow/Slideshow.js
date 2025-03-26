import { useState, useEffect} from "react"
import styles from "./Slideshow.module.css"
import Image from "next/image"

import {motion, AnimatePresence} from "framer-motion"

export default function Slideshow({src}) {

    const [imgIndex, setImgIndex] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setImgIndex((prev) => ((prev + 1) % (src.media.length)))
        }, 3000)

        return () => {
            clearInterval(intervalId)
        }
    },[])

    useEffect(() => {

    },[imgIndex])

    return (
        <div className={styles.slideshow}>
            <AnimatePresence>
                {src && src.media?.map((img, i) => 
                    <motion.img 
                        className={`${styles.media}`} 
                        initial={{opacity: 0}}
                        animate={{ opacity: i == imgIndex ? 1 : 0 }}
                        exit={{ opacity: 0 }}
                        key={src.alt + (i + 1)}
                        src={img} alt={src.alt} 
                        width={src.width} 
                        height={src.height}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}