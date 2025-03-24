import styles from "./Button.module.css";
import ArrowSVG from "@/../public/arrow.svg"
import Image from "next/image";
export default function Button({ variant = "color1", children, back = false, ...props}) {


    return (
        <div {...props} className={`${styles.button} ${styles[variant]} ${(children || back) ? styles.select : styles.none}`}>

            {children}
            {back && <Image src={ArrowSVG} alt="back-arrow"/>}
        </div>
    )
}