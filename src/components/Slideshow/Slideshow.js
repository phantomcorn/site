"use client"
import { useState } from "react"
import styles from "./Slideshow.module.scss"
import { ChevronLeft, ChevronRight } from "lucide-react"

/*
    Shows one image at a time, whole and unstretched whatever its orientation, cross-fading between them.
    Arrows, thumbnails and the left/right keys move between images.
    Give it a `key` per project so it starts again from the first image.
*/
export default function Slideshow({media = [], alt}) {

    const [index, setIndex] = useState(0)
    const count = media.length

    if (count === 0) return null

    const step = (by) => setIndex((prev) => (prev + by + count) % count)

    const onKeyDown = (e) => {
        if (e.key === "ArrowLeft") step(-1)
        if (e.key === "ArrowRight") step(1)
    }

    return (
        <div className={styles.slideshow} onKeyDown={onKeyDown}>
            <div className={styles.stage}>
                {/* Every image stays mounted and loaded; changing slide only cross-fades opacity, so nothing blinks */}
                {media.map((src, i) => (
                    <img
                        key={src}
                        className={`${styles.media} ${i === index ? styles.mediaOn : ""}`}
                        src={src}
                        alt={`${alt} ${i + 1} of ${count}`}
                        aria-hidden={i !== index}
                        draggable="false"/>
                ))}

                {count > 1 && <>
                    <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={() => step(-1)} aria-label="Previous image">
                        <ChevronLeft size={22}/>
                    </button>
                    <button type="button" className={`${styles.nav} ${styles.next}`} onClick={() => step(1)} aria-label="Next image">
                        <ChevronRight size={22}/>
                    </button>
                    <div className={styles.counter}>{index + 1} / {count}</div>
                </>}
            </div>

            {count > 1 &&
                <div className={styles.thumbs}>
                    {media.map((src, i) => (
                        <button type="button" key={src}
                            className={`${styles.thumb} ${i === index ? styles.thumbOn : ""}`}
                            onClick={() => setIndex(i)}
                            aria-label={`Show image ${i + 1}`}
                            aria-current={i === index}>
                            <img src={src} alt="" draggable="false"/>
                        </button>
                    ))}
                </div>
            }
        </div>
    )
}
