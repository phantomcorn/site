import styles from "./BackArrow.module.scss"
export default function BackArrow() {

    return (
        <svg className={styles.backarrowSvg} width="22" height="16" viewBox="0 0 22 16">
            <path 
                className={styles.backarrowPath}
                d={`M21 9C21.5523 9 22 8.55228 22 8C22 7.44772 21.5523 7 21 
                    7V9ZM0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 
                    0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 
                    8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 
                    13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 
                    8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 
                    0.928932L0.292893 7.29289ZM21 7L1 7V9L21 9V7Z`}/>
        </svg>
    )
}