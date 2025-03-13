import styles from "./Card.module.css"
export default function Card() {
    return (
        <div className={styles["card"]}>
            <div className={styles["card-inner"]}>
                <div className={styles["card-back"]}>
                    World!
                </div>
                <div className={styles["card-front"]}>
                    Hello
                </div>
            </div>
        </div>
    )
}