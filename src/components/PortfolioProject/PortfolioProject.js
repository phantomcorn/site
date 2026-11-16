import styles from "./PortfolioProject.module.scss"
import Slideshow from "../Slideshow/Slideshow"
import Button from "../Button/Button"
import Image from "next/image"
import MorphText from "../MorphText/MorphText"

const typeLabels = {
    web: "Web",
    fyp: "Final year project",
    design_guideline: "Design guideline",
    demo: "Demo"
}

/*
    The open project: title, type, summary, media and actions.
    projectKey: key in Projects.js (restarts the slideshow when the project changes)
    titleFrom / titleTo / titleFraction / titleColor: the title morphs between two project names while the tuner is between them
    tuning: the needle has not settled yet, so the content below still belongs to the previous project
*/
export default function PortfolioProject({project, projectKey, titleFrom, titleTo, titleFraction, titleColor, tuning}) {

    const link = project.site || project.src

    const open = (e, url) => {
        e.preventDefault()
        e.stopPropagation()
        window.open(url, "_blank", "noopener")
    }

    const getCopy = () => {
        if (!project.copy) return null
        if (!project.copy.type) {
            return project.copy
        } else if (project.copy.type === "media") {
            return  <Image  className={styles.copyMedia}
                            src={project.copy.src}
                            alt={project.alt + " copy"}
                            width={project.copy.width}
                            height={project.copy.height}/>
        }
    }

    return (
        <div className={styles.project}>
            <MorphText className={styles.title} from={titleFrom} to={titleTo} fraction={titleFraction} color={titleColor}/>
            <div className={`${styles.body} ${tuning ? styles.tuning : ""}`}>
                {typeLabels[project.type] && <div className={styles.type}>{typeLabels[project.type]}</div>}
                <div className={styles.summary}>{getCopy()}</div>

                {project.type === "demo"
                    ? <iframe className={styles.video} src={project.media?.[0]} title={project.alt} allowFullScreen/>
                    : <Slideshow key={projectKey} media={project.media} alt={project.alt}/>
                }

                <div className={styles.actions}>
                    <div className={styles.links}>
                        {link && <Button variant="color4" onClick={(e) => open(e, link)}> {project.site ? "Visit site" : "Source"} </Button>}
                        {project.type === "fyp" && <Button variant="color1" onClick={(e) => open(e, "./report.pdf")}> Report </Button>}
                    </div>
                </div>
            </div>
        </div>
    )
}
