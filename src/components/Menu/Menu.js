"use client"
import styles from "./Menu.module.css"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Menu({menuActive, setMenuActive}) {
    
    const router = useRouter()

    const hideMenu = (e) => {
        e.preventDefault()
        setMenuActive(false)
    }
    
    const onClick = (e, path) => {
        e.preventDefault()
        e.stopPropagation()
        router.push(path)
    }

    return (
        <div className={`${menuActive ? styles.active : styles.hide} ${styles.menu}`} onClick={hideMenu}>
            <div className={`${styles["menu-btn-1"]} unselect`} onClick={(e) => onClick(e,"/about")}> About </div>
            <div className={`${styles["menu-btn-2"]} unselect`} onClick={(e) => onClick(e, "/experience")}> Experience </div>
            <div className={`${styles["menu-btn-3"]} unselect`} onClick={(e) => onClick(e, "/portfolio")}> Portfolio </div>
        </div>
    )
}