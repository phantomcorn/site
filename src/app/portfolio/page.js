"use client"
import Button from "@/components/Button/Button"
import Menu from "@/components/Menu/Menu";
import { useState } from "react";
import styles from "./page.module.css"

export default function Portfolio() {

    const [menuActive, setMenuActive] = useState(false)
    const showMenu = (e) => {
        e.preventDefault()
        setMenuActive(true)
    }

    return (
        <div className={styles.page}>
            
            <div className={`${styles.grid} ${menuActive ? styles.blur : styles.active} unselect`} >
                {[...Array(2)].map((_, index) => (
                    <Button key={index}/>
                ))}
                <Button variant="color4" onClick={showMenu}> Button </Button>
                {[...Array(11)].map((_, index) => (
                    <Button key={index}/> 
                ))}
                <Button variant="color3" onClick={showMenu}> Button </Button>

                {[...Array(16)].map((_, index) => (
                    <Button key={index}/> 
                ))}
                <Button variant="color2" onClick={showMenu}> Button </Button>
                {[...Array(16)].map((_, index) => (
                    <Button key={index}/>
                ))}
            </div>
            <Menu menuActive={menuActive} setMenuActive={setMenuActive}/>
        </div>
    )
}