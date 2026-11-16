"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useLayoutEffect, useRef } from "react";
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
    const pathname = usePathname()
    const [fromExternal, setFromExternal] = useState(false);
    const [target, setTarget] = useState(pathname) // route the curtain is labelled/coloured for
    const [covering, setCovering] = useState(false) // true while the curtain is coming up / waiting for the route
    const [curveKey, setCurveKey] = useState(0) // bump to replay the reveal from a fully covered screen

    const coveringRef = useRef(false)
    const pendingNavigation = useRef(null) // runs once the curtain fully covers the page
    const prevPathname = useRef(pathname)
    const hasInternalHistory = useRef(false) // true once we have pushed a route ourselves

    function cover(path, navigate) {
        if (coveringRef.current) return // a transition is already running
        coveringRef.current = true
        pendingNavigation.current = navigate
        setTarget(path)
        setCovering(true)
    }

    function routePush(path) {
        if (path === pathname) return
        router.prefetch(path)
        cover(path, () => {
            hasInternalHistory.current = true
            router.push(path)
        })
    }

    function routeBack() {
        if (pathname === "/") return
        cover("/", () => {
            // Landed here directly (deep link / refresh): there is no home entry to go back to
            if (hasInternalHistory.current) router.back()
            else router.replace("/")
        })
    }

    function onCovered() {
        const navigate = pendingNavigation.current
        pendingNavigation.current = null
        navigate?.()
    }

    /* The route actually changed: this is the only thing that lifts the curtain */
    useLayoutEffect(() => {
        if (prevPathname.current === pathname) return
        prevPathname.current = pathname
        pendingNavigation.current = null
        setTarget(pathname)

        if (coveringRef.current) {
            coveringRef.current = false
            setCovering(false)
        } else {
            // Browser back/forward: the page swapped without a cover, so replay the reveal over it
            setCurveKey((k) => k + 1)
        }
    }, [pathname])

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
        key: target,
        routePush,
        routeBack,
        transitionColor,
        fromExternal,
        setFromExternal
    }

    return (
        <TransitionContext.Provider value={value}>
            {/* The curtain is a sibling of the page, so pages are never remounted by a transition */}
            <Curve key={curveKey} path={target} covering={covering} onCovered={onCovered}/>
            {children}
        </TransitionContext.Provider>
    );
}
