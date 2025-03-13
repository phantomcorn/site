import styles from "./Button.module.css";

export default function Button({ variant = "color1", children, ...props}) {

    return (
        <div {...props} className={`${styles.button} ${styles[variant]}`}>
            {children}
        </div>
    )
}