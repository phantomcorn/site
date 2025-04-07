import { useState, useEffect} from "react"
import styles from "./Slideshow.module.css"
import {motion, AnimatePresence} from "framer-motion"

export default function Slideshow({src}) {

    const [imgIndex, setImgIndex] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setImgIndex((prev) => ((prev + 1) % (src.media.length)))
        }, 5000)

        return () => {
            clearInterval(intervalId)
        }
    },[])

    return (
            <div className={styles.slideshow}>
                <AnimatePresence mode="wait">
                    <motion.img
                        className={`${styles.media}`} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: {duration: 1.5, ease: "easeIn"} }}
                        exit={{opacity: 0, transition: {duration: 1.5, ease: "easeOut"}}}
                        key={src.alt + imgIndex}
                        src={src.media[imgIndex]} alt={src.alt} 
                        width={src.width} 
                        height={src.height}/>
                </AnimatePresence>
            </div>
    )
}