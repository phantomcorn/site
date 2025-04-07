import styles from "./PortfolioProject.module.scss"
import Slideshow from "../Slideshow/Slideshow"
import Button from "../Button/Button"
import Image from "next/image"

export default function PortfolioPage({pageActive, setPageActive, ref}) {

    const onClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setPageActive(null)
    }

    const onClickSource = (e) => {
        e.preventDefault()
        e.stopPropagation()
        window.open(pageActive.site, "_blank");
    }

    const getCopy = () => {
        if (!pageActive.copy.type) {
            return pageActive.copy
        } else if (pageActive.copy.type === "media") {
            return  <Image  className={styles.copyMedia}
                            src={pageActive.copy.src} 
                            alt={pageActive.alt + " copy"}
                            width={pageActive.copy.width}
                            height={pageActive.copy.height}/>
        }
    }



    return (
        <div ref={ref} className={styles.portfolioPage} 
        >
            <div className={styles.textbox}>
                {getCopy()}
                <div>
                    <Button onClick={onClick} back/>
                    {pageActive.type !== "demo" && <Button onClick={onClickSource}> {pageActive.src ? "Source" : "Visit site"} </Button>}
                </div>
            </div>
            {pageActive.type === "web" && <Slideshow src={pageActive}></Slideshow>}
            {pageActive.type === "demo" && 
                <div>
                    <iframe className={styles.ytShorts} src={pageActive.media} allowFullScreen> </iframe>
                </div>}
        </div>
    )
}