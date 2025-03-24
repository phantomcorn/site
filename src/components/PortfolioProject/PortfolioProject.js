import styles from "./PortfolioProject.module.css"
import Slideshow from "../Slideshow/Slideshow"
import Button from "../Button/Button"


export default function PortfolioPage({pageActive, setPageActive, ref}) {

    const onClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setPageActive(null)
    }

    const onClickSource = (e) => {
        e.preventDefault()
        e.stopPropagation()
        window.open(pageActive.source, "_blank");
    }



    return (
        <div ref={ref} className={`${styles["portfolio-page"]}`} 
        >
            {pageActive.type === "web" && <Slideshow src={pageActive}></Slideshow>}
            <div className={styles["textbox"]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                <div>
                    <Button onClick={onClick} back/>
                    {pageActive.type !== "app" && <Button onClick={onClickSource}> Source </Button>}
                </div>
            </div>
        </div>
    )
}