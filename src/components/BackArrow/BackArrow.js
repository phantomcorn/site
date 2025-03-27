import styles from "./BackArrow.module.css"
export default function BackArrow() {

    return (
        <svg className={styles["backarrow-svg"]} width="22" height="16" viewBox="0 0 22 16">
            <path className={styles["backarrow-path"]}/>
        </svg>
    )
}