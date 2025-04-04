"use client";
import { AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useState, useLayoutEffect } from "react";
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
    const [fromExternal, setFromExternal] = useState(false);
    const [key, setKey] = useState("home")

    function routePush(path) {
        setKey(path)
        setTimeout(() => router.push(path), 500)
    }

    function routeBack() {
        setKey("/")
        setTimeout(() => router.back(), 500)
    }
  

    useLayoutEffect(() => {
        let isExternal = false
        let isRefresh = false
        if (!document.referrer || !document.referrer.includes(window.location.origin)) {
            isExternal = true
        }

        const entries = performance.getEntriesByType("navigation");
        if (entries.length > 0 && entries[0].type === "reload") {
            isRefresh = true
        }

        if (isExternal || isRefresh) {
            setFromExternal(true)
        }
    }, []);

    const value = {
        key, 
        setKey, 
        routePush, 
        routeBack, 
        transitionColor, 
        fromExternal, 
        setFromExternal
    }

    return (
        <TransitionContext.Provider value={value}>
            <AnimatePresence mode="wait">
                <Curve key={key}>
                    {children}   
                </Curve>
            </AnimatePresence>
        </TransitionContext.Provider> 
    );
}