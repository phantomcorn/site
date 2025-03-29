"use client"; // ✅ Ensures we can use hooks like usePathname()
import { AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {motion} from "framer-motion"
import Curve from "../Curve/Curve";
import { createContext, useContext } from 'react';

const TransitionContext = createContext({})


export function useTransitionContext() {
    return useContext(TransitionContext)
}

const transitionColor = {
    "/" : "var(--primary-two)",
    "/about": "var(--secondary-one)",
    "/experience": "var(--secondary-two)",
    "/portfolio": "var(--secondary-three)",
    "/etc": "var(--secondary-four)"
}

export function TransitionWrapper({ children }) {

    const router = useRouter()
    const curveRef = useRef()
    const [key, setKey] = useState("home")

    function routePush(path) {
        setKey(path)
        setTimeout(() => router.push(path), 500)
    }

    function routeBack() {
        setKey("/")
        setTimeout(() => router.back(), 500)
    }

    return (
        <TransitionContext.Provider value={{key, setKey, routePush, routeBack, transitionColor}}>
            <AnimatePresence mode="wait">
                <Curve key={key} ref={curveRef}>
                    {children}   
                </Curve>
            </AnimatePresence>
        </TransitionContext.Provider> 
    );
}