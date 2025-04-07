import styles from "./BackArrow.module.css"
export default function BackArrow() {

    return (
        <svg className={styles.backarrowSvg} width="22" height="16" viewBox="0 0 22 16">
            <path className={styles.backarrowPath}/>
        </svg>
    )
}