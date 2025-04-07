import styles from "./Button.module.scss";
import BackArrow from "../BackArrow/BackArrow";
export default function Button({ variant = "color1", children, back = false, ...props}) {


    return (
        <div {...props} className={`${styles.button} ${styles[variant]} ${(children || back) ? styles.select : styles.none}`}>

            {children}
            {back && <BackArrow/>}
        </div>
    )
}