import { useState, useEffect} from "react"
import styles from "./Slideshow.module.css"
import Image from "next/image"
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

    return (
        <div className={styles.slideshow}>
            {src && src.media?.map((img, i) => 
                <Image 
                    className={`${styles.media} ${imgIndex == i ? styles.show : styles.hide}`} 
                    key={src.alt + (i + 1)}
                    src={img} alt={src.alt} 
                    width={src.width} 
                    height={src.height}
                />
            )}
        </div>
    )
}